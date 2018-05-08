sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "personal/account/util/Utils"
], function (Controller, Utils) {
    "use strict";
    var _aValidTabKeys = ["Profile","InsuranceHistory","MyAutos","MyPolicies"];
    return Controller.extend("personal.account.controller.Menu", {
        onInit: function () {
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            this.oRouter.getRoute("menuPage").attachMatched(this._onRouteMatched,this);
        },

        _onRouteMatched: function (oEvent) {
            var oNavCon = this.getView().byId("navCon");
            var oComponent = this.getOwnerComponent();
            var oArgs = oEvent.getParameter("arguments");
            var oQuery = oArgs["?query"];
            if (oQuery && _aValidTabKeys.indexOf(oQuery.tab) > -1){
                oComponent.getModel("techModel").setProperty("/tech/selectedKey", oQuery.tab);
                oNavCon.to(this.getView().byId(oQuery.tab),"show");
            }else {
                Utils.navigateToMenuPageTab(this.oRouter, _aValidTabKeys[0]);
            }
        },

        onSelectTab: function (oEvent) {
            Utils.navigateToMenuPageTab(this.oRouter, oEvent.getParameter("selectedKey"));
        },

        onHomePress: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            Utils.navigateToMenuPageTab(oRouter, "Profile");
        }
    });
});