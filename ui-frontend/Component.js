sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "personal/account/model/Model",
    "sap/m/MessageBox",
    "personal/account/util/Const",
    "personal/account/util/Utils",
    "personal/account/util/API"
], function (UIComponent, JSONModel, Model, MessageBox, Const, Utils, API) {
    "use strict";

    var UPDATE_RETRIES = 3;

    return UIComponent.extend("personal.account.Component", {
        metadata: {
            manifest: "json"
        },

        updateError: {
            retriesLeft: UPDATE_RETRIES,
            isShown: false
        },

        showUpdateErrorMessage: function(onDone) {
            var thisUpdateError = this.updateError;
            if (thisUpdateError.isShown) {
                return;
            }
            var sErrorText = this.getModel("i18n")
                .getResourceBundle()
                .getText("msg.box.error");
            thisUpdateError.isShown = true;
            MessageBox.error(
                sErrorText,
                {
                    onClose: function() {
                        thisUpdateError.isShown = false;
                        onDone();
                    }
                }
            );
        },
        showNetworkErrorMessage: function() {
            var sErrorText = this.getModel("i18n")
                .getResourceBundle()
                .getText("msg.box.error");
            MessageBox.error(sErrorText);
        },
        init: function () {
            this.setModel(new JSONModel(), "personModel");
            this.setModel(new JSONModel(Model.modelStructure), "techModel");
            this.setModel(new JSONModel(), "icModel");
            this.setModel(new JSONModel(), "operationsModel");
            this.setModel(new JSONModel(), "policiesModel");

            this.setLanguages();

            UIComponent.prototype.init.apply(this, arguments);
            this.getRouter().initialize();

            var lastUserId = Utils.getLastUserId();
            if (lastUserId) {
                this.initModels(lastUserId);
            }
        },
        receiveOperations: function(dontShowError) {
            var oPersonModel = this.getModel("personModel");
            var oOperationsModel = this.getModel("operationsModel");
            var userId = oPersonModel.getProperty("/id");
            Utils.saveLastUserId(userId);
            var self = this;
            return API.getPersonOperations(userId)
                .then(function(operations) {
                    oOperationsModel.setData(operations);
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    console.error("Cannot get operations: textStatus = ", textStatus, ", error = ", errorThrown);
                    if (!dontShowError) {
                        self.showNetworkErrorMessage();
                    }
                });
        },
        initModels: function (userId) {
            if (this.updateTimeoutId) {
                clearTimeout(this.updateTimeoutId);
                this.updateTimeoutId = null;
            }
            var sErrorText = this.getModel("i18n")
                    .getResourceBundle()
                    .getText("msg.box.error");

            var oPersonModel = this.getModel("personModel");
            var oICModel = this.getModel("icModel");

            var scheduleNextUpdate = this.scheduleNextModelsUpdate.bind(this);

            var self = this;

            jQuery.when(
                API.getPerson(userId),
                API.getInsuranceCompanies()
            ).then(function(personInfo, insuranceCompanies) {
                oICModel.setData(insuranceCompanies);
                oPersonModel.setData(personInfo);
                self.receiveOperations()
                    .then(function() {
                        scheduleNextUpdate();
                    });
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error("Cannot update model data: textStatus = ", textStatus, ", error = ", errorThrown);
                self.showNetworkErrorMessage();
            });
        },
        updateModels: function () {
            var oPersonModel = this.getModel("personModel");
            var userId = oPersonModel.getProperty("/id");
            var self = this;
            var scheduleNextUpdate = this.scheduleNextModelsUpdate.bind(this);
            jQuery.when(
                API.getPerson(userId),
                this.receiveOperations.bind(this, true)()
            ).then(function(personInfo) {
                self.updateError.retriesLeft = UPDATE_RETRIES;
                oPersonModel.setData(personInfo);
                scheduleNextUpdate();
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error("Cannot update model data: textStatus = ", textStatus, ", error = ", errorThrown, ", retries left = ", self.updateError.retriesLeft);
                self.updateError.retriesLeft--;
                if (self.updateError.retriesLeft <= 0) {
                    self.showUpdateErrorMessage(function() {
                        self.updateError.retriesLeft = UPDATE_RETRIES;
                        self.updateModels();
                    });
                } else {
                    scheduleNextUpdate();
                }
            });
        },
        scheduleNextModelsUpdate: function () {
            this.updateTimeoutId = setTimeout(this.updateModels.bind(this), Const.ASYNC_UPDATE_TIMEOUT);
        },
        setLanguages: function () {
            var lang = Const.LANG;
            if(lang) {
                sap.ui.getCore().getConfiguration().setLanguage(lang);
            }
            var sText = this.getModel("i18n").getResourceBundle().getText("title");
            document.title = sText;
        }
    });
});