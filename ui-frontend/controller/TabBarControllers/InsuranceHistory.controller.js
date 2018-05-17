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

            if (from && to) {
                var dateFrom = new Date(from.valueOf());
                var dateTo = new Date(to.valueOf());
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
                _oFilterSet.dateFilter = new Filter({
                    filters: aFilters,
                    and: true
                });
            } else {
                _oFilterSet.dateFilter = null;
            }

            var oTable = this.getView().byId("table-insurance-history");
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