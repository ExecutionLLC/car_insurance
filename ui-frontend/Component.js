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

    var $ = {
        ajax: function(opts) {
            var isPerson = /\/person1\//.test(opts.url);
            console.log('Component ajax', opts, isPerson);

            if (!isPerson) {
                return jQuery.ajax(opts);
            }

            var doneF = function() {};
            var failF = function() {};
            var alwaysF = function() {};
            var res = {
                done: function(f) {
                    doneF = f;
                    return res;
                },
                fail: function(f) {
                    failF = f;
                    return res;
                },
                always: function(f) {
                    alwaysF = f;
                    return res;
                }
            };

            setTimeout(
                function() {
                    if (isPerson) {
                        doneF({
                            "tariff": 6,
                            "pensionForecast": "23270.25"
                        });
                    } else {
                        failF(null, 'textStatus', 'errorThrown');
                    }
                    alwaysF();
                },
                1000
            );

            return res;
        }
    };

    return UIComponent.extend("personal.account.Component", {
        metadata: {
            manifest: "json"
        },
        init: function () {
            this.setModel(new JSONModel(), "personModel");
            this.setModel(new JSONModel(), "mainModel");
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
        receiveOperations: function() {
            var oPersonModel = this.getModel("personModel");
            var oOperationsModel = this.getModel("operationsModel");
            var userId = oPersonModel.getProperty("/id");
            return API.getPersonOperations(userId)
                .then(function(operations) {
                    oOperationsModel.setData(operations);
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    console.error("Cannot get operations: textStatus = ", textStatus, ", error = ", errorThrown);
                    MessageBox.error(sErrorText);
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
            var oMainModel = this.getModel("mainModel");
            var oTechModel = this.getModel("techModel");
            var oICModel = this.getModel("icModel");

            var scheduleNextUpdate = this.scheduleNextModelsUpdate.bind(this);

            var self = this;

            jQuery.when(
                API.getPerson(userId),
                API.getInsuranceCompanies()
            ).then(function(personInfoResult, insuranceCompaniesResult) {
                oICModel.setData(insuranceCompaniesResult[0]);
                oPersonModel.setData(personInfoResult[0]);
                self.receiveOperations()
                    .then(function() {
                        scheduleNextUpdate();
                    });
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error("Cannot update model data: textStatus = ", textStatus, ", error = ", errorThrown);
                MessageBox.error(sErrorText);
            });

            $.ajax({
                url: Utils.getPerson1InfoUrl(userId),
                dataType: "json"
            }).done(function (person1InfoResult) {
                oMainModel.setData(person1InfoResult);
//                oTechModel.setProperty("/tech/changeTariffTab/selectedTariff", oMainModel.getData().tariff);
                Utils.saveLastUserId(userId);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error("Cannot update model data: textStatus = ", textStatus, "error = ", errorThrown);
                MessageBox.error(sErrorText);
            });
        },
        updateModels: function () {
            var oPersonModel = this.getModel("personModel");
            var userId = oPersonModel.getProperty("/id");
            jQuery.when(
                API.getPerson(userId),
                this.receiveOperations.bind(this)()
            ).then(function(personInfoResult) {
                oPersonModel.setData(personInfoResult[0]);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error("Cannot update model data: textStatus = ", textStatus, ", error = ", errorThrown);
                MessageBox.error(sErrorText);
            }).always(this.scheduleNextModelsUpdate.bind(this));
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