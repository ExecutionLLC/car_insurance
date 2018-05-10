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
        },

        onNavigateChangeTariff: function () {
            var router = sap.ui.core.UIComponent.getRouterFor(this);
            Utils.navigateToMenuPageTab(router, "MyPolicies"); // TODO sample code, make real one
        }
    });
});