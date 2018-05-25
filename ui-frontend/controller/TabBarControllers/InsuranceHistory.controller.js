sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "personal/account/formatter/formatter",
    "personal/account/util/Utils",
    "personal/account/util/Const"
], function (Controller, Filter, formatter, Utils, Const) {
    "use strict";
    return Controller.extend("personal.account.controller.TabBarControllers.Report", {
        formatter: formatter,

        onInit: function () {
            this.oComponent = this.getOwnerComponent();
            this.oTechModel = this.oComponent.getModel("techModel");
            this.oOperationsModel = this.oComponent.getModel("operationsModel");
            this.oTableBinding = null;

            this.defaultFilter = new Filter({
                path: "",
                test: function (operation) {
                    var operationType = operation.operationType;
                    if (operationType !== Const.OPERATION_TYPE.INSURANCE_DEACTIVATED) {
                        return true;
                    }
                    var operationData = operation.operationData;
                    return !(operationData.isManuallyDeactivated && operationData.isPartiallyDeactivated);
                }
            });
            this.currentFilter = this.defaultFilter;

            this.operationsModelBinding = new sap.ui.model.Binding(
                this.oOperationsModel, "/", this.oOperationsModel.getContext("/")
            );
            this.operationsModelBinding.attachChange(this.onModelChanges.bind(this));
        },

        onModelChanges: function() {
            if (this.oTableBinding) {
                return;
            }

            var self = this;
            var oTable = this.getView().byId("table-insurance-history");
            this.oTableBinding = oTable.getBinding("items");
            this.oTableBinding.attachChange(function(oEvent) {
                self.oTechModel.setProperty("/tech/insuranceHistoryTab/operationsFilteredCount", oEvent.getSource().iLength);
            });
            this.oTableBinding.filter(this.currentFilter);
        },

        onDateRangeChange: function (oEvent) {
            var from = oEvent.getParameter("from");
            var to = oEvent.getParameter("to");

            if (from && to) {
                var dateFrom = new Date(from);
                var dateTo = Utils.getDatePlusDays(new Date(to), 1);

                var filters = [
                    new Filter({
                        path: "timestamp",
                        operator: sap.ui.model.FilterOperator.GE,
                        value1: dateFrom
                    }),
                    new Filter({
                        path: "timestamp",
                        operator: sap.ui.model.FilterOperator.LE,
                        value1: dateTo
                    }),
                    this.defaultFilter
                ];

                this.currentFilter = new Filter({
                    filters: filters,
                    and: true
                });
            } else {
                this.currentFilter = this.defaultFilter;
            }

            this.oTableBinding.filter(this.currentFilter);
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