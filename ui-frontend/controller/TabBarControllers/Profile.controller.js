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

        onNavigateChangeTariff: function () {
            var router = sap.ui.core.UIComponent.getRouterFor(this);
            Utils.navigateToMenuPageTab(router, "MyPolicies"); // TODO sample code, make real one
        }
    });
});