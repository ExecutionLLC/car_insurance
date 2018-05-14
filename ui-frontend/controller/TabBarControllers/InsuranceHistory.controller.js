sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "personal/account/formatter/formatter",
    "personal/account/util/Utils"
], function (Controller, Filter, formatter, Utils) {
    "use strict";
    return Controller.extend("personal.account.controller.TabBarControllers.Report", {
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

        onMainModelChanges: function() {
            var operationsHistory = this.oMainModel.getProperty("/operationsHistory");
            var pendedOperationsChanges = this.oMainModel.getProperty("/pendedOperations");

            var currentTariff = this.oMainModel.getProperty("/tariff");
            var currentNpf = this.oMainModel.getProperty("/npf");

            var operationsTableData = pendedOperationsChanges.map(function (value) {
                return {
                    npf: currentNpf,
                    tariff: currentTariff,
                    amount: value.amount,
                    contractor: value.contractor,
                    comment: value.comment,
                    timestamp: value.timestamp,
                    transactionHash: value.transactionHash,
                    isFinished: false
                };
            });
            operationsTableData = operationsTableData.concat(operationsHistory.map(function (value) {
                return {
                    npf: value.npf,
                    tariff: value.tariff,
                    amount: value.amount,
                    contractor: value.contractor,
                    comment: value.comment,
                    timestamp: value.timestamp,
                    transactionHash: value.transactionHash,
                    isFinished: true
                };
            }));

            this.oTechModel.setProperty("/tech/getReportTab/operationsTableData", operationsTableData);
        },



        /**
         * @description Составление фильтра по датам
         */
        onDateRangeChange: function (oEvent) {
            // Сохраним фильтры
            var _oFilterSet = {
                dateFilter: null
            };
            var from = oEvent.getParameter("from");
            var to = oEvent.getParameter("to");

            function sumOfAmount(array) {
                return array.reduce(function(sum, current) {
                    return sum + current.amount;
                }, 0);
            }

            if (from && to) {
                var timestampFrom = from.valueOf();
                var timestampTo = to.valueOf();
                this.oTechModel.setProperty("/tech/getReportTab/dateFrom", Utils.timestampToString(timestampFrom));
                this.oTechModel.setProperty("/tech/getReportTab/dateTo", Utils.timestampToString(timestampTo));

                var aFilters = [
                    new Filter({
                        path: "timestamp",
                        operator: sap.ui.model.FilterOperator.GE,
                        value1: timestampFrom
                    }),
                    new Filter({
                        path: "timestamp",
                        operator: sap.ui.model.FilterOperator.LE,
                        value1: timestampTo
                    })
                ];
                // Запишем фильтр в массив фильтров
                _oFilterSet.dateFilter = new Filter({
                    filters: aFilters,
                    and: true
                });

                var operationsTableData = this.oTechModel.getProperty("/tech/getReportTab/operationsTableData");
                var aAmountIncome = operationsTableData.filter(function(value) {
                    return value.timestamp < timestampFrom;
                });
                var aAmountOutgoing = operationsTableData.filter(function(value) {
                    return value.timestamp <= timestampTo;
                });

                var amountSumIncome = sumOfAmount(aAmountIncome);
                var amountSumOutgoing = sumOfAmount(aAmountOutgoing);
                var amountDifference = amountSumOutgoing - amountSumIncome;
                this.oTechModel.setProperty("/tech/getReportTab/AmountIncome",amountSumIncome);
                this.oTechModel.setProperty("/tech/getReportTab/AmountOutgoing",amountSumOutgoing);
                this.oTechModel.setProperty("/tech/getReportTab/AmountDifference",amountDifference);

                this.oTechModel.setProperty("/tech/getReportTab/isShowHideButtonEnabled", true);
            } else {
                _oFilterSet.dateFilter = null;

                this.oTechModel.setProperty("/tech/getReportTab/dateFrom", "?");
                this.oTechModel.setProperty("/tech/getReportTab/dateTo", "?");

                this.oTechModel.setProperty("/tech/getReportTab/AmountIncome", 0);
                this.oTechModel.setProperty("/tech/getReportTab/AmountOutgoing", 0);
                this.oTechModel.setProperty("/tech/getReportTab/AmountDifference", 0);

                this.oTechModel.setProperty("/tech/getReportTab/isShowHideButtonPressed", false);
                this.oTechModel.setProperty("/tech/getReportTab/isShowHideButtonEnabled", false);
            }

            var oTable = this.getView().byId("table--report");
            var oBinding = oTable.getBinding("items");
            oBinding.filter(_oFilterSet.dateFilter);
        },

        onPrint: function () {
            print();
        },

        /**
         * @description Переход по ссылке хэша
         * @param oEvent
         */
        onLinkPress: function (oEvent) {
            var transactionHash = oEvent.getSource().getProperty("text");
            var langModel = this.getOwnerComponent().getModel("i18n");
            Utils.showMessageBoxTransactionInfo(transactionHash, langModel);
        }
    });
});