sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "personal/account/formatter/formatter",
    "personal/account/util/Utils"
], function (Controller, formatter, Utils) {
    "use strict";
    return Controller.extend("personal.account.controller.TabBarControllers.ChangeTariff", {
        formatter: formatter,
        onInit: function () {
            this.oComponent = this.getOwnerComponent();
            this.oTechModel = this.oComponent.getModel("techModel");
            this.oMainModel = this.oComponent.getModel("mainModel");

            var mainModelBinding = new sap.ui.model.Binding(
                this.oMainModel, "/", this.oMainModel.getContext("/")
            );
            mainModelBinding.attachChange(this.onMainModelChanges.bind(this));
        },

        onMainModelChanges: function () {
            var snils = this.oMainModel.getProperty("/metadata/snils");
            if (!snils) {
                // user is logged off
                return;
            }

            var pendedTariffChanges = this.oMainModel.getProperty("/pendedTariffChanges");
            var tariffHistory = this.oMainModel.getProperty("/tariffHistory");
            var sRequestOnPending = this.oComponent
                    .getModel("i18n")
                    .getResourceBundle()
                    .getText("chgtar.requestOnPending");

            var pendedTariffTableData = pendedTariffChanges.map(function (value) {
                return {
                    tariff: value.tariff,
                    timestamp: value.timestamp,
                    transactionHash: value.transactionHash,
                    isFinished: false
                };
            });
            var historyTariffTableData = tariffHistory.map(function (value) {
                return {
                    tariff: value.newTariff,
                    timestamp: value.timestamp,
                    transactionHash: value.transactionHash,
                    isFinished: true
                }
            });
            var totalTariffTableData = pendedTariffTableData.concat(historyTariffTableData);
            this.oTechModel.setProperty("/tech/changeTariffTab/tariffTableData", totalTariffTableData);

            if (!pendedTariffChanges.length) {
                this.oTechModel.setProperty("/tech/changeTariffTab/isSliderChangeTariffEnabled", true);
                // fake event, which should restore right state of the button
                this.onChangeTariff();
                this.oTechModel.setProperty("/tech/changeTariffTab/changeTariffMessage", "");
            } else {
                this.oTechModel.setProperty("/tech/changeTariffTab/isButtonChangeTariffEnabled", false);
                this.oTechModel.setProperty("/tech/changeTariffTab/isSliderChangeTariffEnabled", false);
                this.oTechModel.setProperty("/tech/changeTariffTab/changeTariffMessage", sRequestOnPending);
            }
        },

        /**
         * @description Сбор информации о новом тарифе и отправка ее на сервер
         */
        onApplyChangeTariff: function () {
            var snils = this.oMainModel.getProperty("/metadata/snils");
            var selectedTariff = this.oTechModel.getProperty("/tech/changeTariffTab/selectedTariff");
            var pendedTariffChanges = this.oMainModel.getProperty("/pendedTariffChanges");

            $.ajax({
                url: Utils.getChangeTariffUrl(snils),
                dataType: "json",
                type: "PUT",
                data: JSON.stringify({ "tariff": selectedTariff }),
                jsonp: false
            });

            var now = +new Date();
            this.oMainModel.setProperty("/pendedTariffChanges", pendedTariffChanges.concat([{
                tariff: selectedTariff,
                timestamp: now,
                isFinished: false
            }]));
        },

        /**
         * @description Смена значения слайдера для выбора тарифа
         */
        onChangeTariff: function () {
            var selectedTariff = this.oTechModel.getProperty("/tech/changeTariffTab/selectedTariff");
            var currentTarrif = this.oMainModel.getProperty("/tariff");
            this.oTechModel.setProperty("/tech/changeTariffTab/isButtonChangeTariffEnabled", selectedTariff !== currentTarrif);
        },

        onLinkPress: function (oEvent) {
            var transactionHash = oEvent.getSource().getProperty("text");
            var langModel = this.getOwnerComponent().getModel("i18n");
            Utils.showMessageBoxTransactionInfo(transactionHash, langModel);
        }
    });
});