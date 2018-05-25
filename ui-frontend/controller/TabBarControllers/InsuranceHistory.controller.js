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
            this.oOperationsModel = this.oComponent.getModel("operationsModel");
            this.oTableBinding = null;
            this.oFilterSet = {
                dateFilter: null
            };

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
        },

        /**
         * @description Составление фильтра по датам
         */
        onDateRangeChange: function (oEvent) {
            var from = oEvent.getParameter("from");
            var to = oEvent.getParameter("to");

            if (from && to) {
                var dateFrom = new Date(from);
                var dateTo = Utils.getDatePlusDays(new Date(to), 1);
                var aFilters = [
                    new Filter({
                        path: "timestamp",
                        operator: sap.ui.model.FilterOperator.GE,
                        value1: dateFrom
                    }),
                    new Filter({
                        path: "timestamp",
                        operator: sap.ui.model.FilterOperator.LE,
                        value1: dateTo
                    })
                ];
                // Запишем фильтр в массив фильтров
                this.oFilterSet.dateFilter = new Filter({
                    filters: aFilters,
                    and: true
                });
            } else {
                this.oFilterSet.dateFilter = null;
            }

            this.oTableBinding.filter(this.oFilterSet.dateFilter);
        },

        onPrint: function () {
            print();
        }
    });
});