sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "personal/account/formatter/formatter",
    "personal/account/util/Utils",
    "personal/account/util/Const"
], function (Controller, formatter, Utils, Const) {
    "use strict";
    return Controller.extend("personal.account.controller.TabBarControllers.Profile", {
        formatter: formatter,

        onInit: function () {
            var oComponent = this.getOwnerComponent();
            this.oTechModel = oComponent.getModel("techModel");
            this.oMainModel = oComponent.getModel("mainModel");
            var mainModelBinding = new sap.ui.model.Binding(
                this.oMainModel, "/", this.oMainModel.getContext("/")
            );
            mainModelBinding.attachChange(this.onMainModelChanges.bind(this));

            var oPopOver = this.getView().byId("idPopOver");
            var oVizFrame = this.getView().byId("idVizFrame");
            oPopOver.connect(oVizFrame.getVizUid());
        },

        onMainModelChanges: function() {
            var operationsHistory = this.oMainModel.getProperty("/operationsHistory");
            var diagramData = [];
            operationsHistory.reduce(function (sum, current) {
                diagramData.push({
                    amount: sum + current.amount,
                    timestamp: current.timestamp
                });
                return sum + current.amount
            },0);
            this.oTechModel.setProperty("/tech/profileTab/diagramData", diagramData);
        },

        onNavigateToNPF: function () {
            var router = sap.ui.core.UIComponent.getRouterFor(this);
            Utils.onNavigateToTab(router, "MyAutos"); // TODO sample code, make real one
        },

        onNavigateChangeTariff: function () {
            var router = sap.ui.core.UIComponent.getRouterFor(this);
            Utils.onNavigateToTab(router, "MyPolicies"); // TODO sample code, make real one
        },

        onChangeSelect: function (oEvent) {
            var oSelect = oEvent.getSource();
            var oItem = oSelect.getSelectedItem();
            var sSelectedKey = oItem.getKey();

            var oBinding = this.getView().byId("idVizFrame").getDataset().getBinding("data");
            if(sSelectedKey === Const.SELECTED_LAST_YEAR) {
                var oneYearBeforeNow = new Date().setFullYear(new Date().getFullYear() - 1);
                var filter = new sap.ui.model.Filter("timestamp", sap.ui.model.FilterOperator.GE, oneYearBeforeNow);
                oBinding.filter([filter]);
            } else {
                oBinding.filter(null);
            }
        }
    });
});