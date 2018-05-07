sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "personal/account/model/Model",
    "sap/m/MessageBox",
    "personal/account/util/Const",
    "personal/account/util/Utils"
], function (UIComponent, JSONModel, Model, MessageBox, Const, Utils) {
    "use strict";
    return UIComponent.extend("personal.account.Component", {
        metadata: {
            manifest: "json"
        },
        init: function () {
            var oMainModel = new JSONModel();
            this.setModel(oMainModel, "mainModel");
            var oTechModel = new JSONModel(Model.modelStructure);
            this.setModel(oTechModel, "techModel");
            var oListNpfModel = new JSONModel();
            this.setModel(oListNpfModel, "npfModel");

            this.setLanguages();

            UIComponent.prototype.init.apply(this, arguments);
            this.getRouter().initialize();

            var lastSnils = Utils.getLastSnils();
            if (lastSnils) {
                this.initModels(lastSnils);
            }
        },
        initModels: function (snils) {
            if (this.updateTimeoutId) {
                clearTimeout(this.updateTimeoutId);
                this.updateTimeoutId = null;
            }
            var sErrorText = this.getModel("i18n")
                    .getResourceBundle()
                    .getText("msg.box.error");

            var oMainModel = this.getModel("mainModel");
            var oTechModel = this.getModel("techModel");
            var oNpfModel = this.getModel("npfModel");

            var scheduleNextUpdate = this.scheduleNextModelsUpdate.bind(this);

            $.ajax({
                url: Utils.getPersonInfoUrl(snils),
                dataType: "json"
            }).done(function (personInfoResult) {
                $.ajax({
                    url: Utils.getNpfsUrl(),
                    dataType: "json"
                }).done(function (npfsResult) {
                    oNpfModel.setData(npfsResult);
                    oMainModel.setData(personInfoResult);
                    oTechModel.setProperty("/tech/changeTariffTab/selectedTariff", oMainModel.getData().tariff);

                    Utils.saveLastSnils(snils);

                    scheduleNextUpdate();
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    console.error("Cannot update model data: textStatus = ", textStatus, ", error = ", errorThrown);
                    MessageBox.error(sErrorText);
                });
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error("Cannot update model data: textStatus = ", textStatus, "error = ", errorThrown);
                MessageBox.error(sErrorText);
            });
        },
        updateModels: function () {
            var oMainModel = this.getModel("mainModel");

            var snils = oMainModel.getProperty("/metadata/snils");

            var onAlways = this.scheduleNextModelsUpdate.bind(this);
            $.ajax({
                url: Utils.getPersonInfoUrl(snils),
                dataType: "json"
            }).done(function (result) {
                oMainModel.setData(result);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error("Cannot update model data: textStatus = ", textStatus, "error = ", errorThrown);
            }).always(onAlways);
        },
        scheduleNextModelsUpdate: function () {
            if (this.updateTimeoutId) {
                clearTimeout(this.updateTimeoutId);
            }
            var timeout = Const.ASYNC_UPDATE_TIMEOUT || Const.ASYNC_UPDATE_TIMEOUT_DEFAULT;
            this.updateTimeoutId = setTimeout(this.updateModels.bind(this), timeout);
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