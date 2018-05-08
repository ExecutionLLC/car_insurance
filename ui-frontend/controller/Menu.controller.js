sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "personal/account/util/Utils"
], function (Controller, Utils) {
    "use strict";
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
            var tab;
            if (oQuery){
                tab = oQuery.tab;
                oComponent.getModel("techModel").setProperty("/tech/selectedKey", tab);
                oNavCon.to(this.getView().byId(tab),"show");
            } else {
                Utils.navigateToMenuPageTab(this.oRouter, "Profile");
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