sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "personal/account/util/Utils"
], function (Controller, Utils) {
    "use strict";
    return Controller.extend("personal.account.controller.Menu", {
        onInit: function () {
            this.getRouter().getRoute("menuPage").attachMatched(this._onRouteMatched, this);
        },

        getRouter() {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },

        _onRouteMatched: function (oEvent) {
            var oNavCon = this.getView().byId("navCon");
            var oComponent = this.getOwnerComponent();
            var oArgs = oEvent.getParameter("arguments");
            var oQuery = oArgs["?query"];
            var tab;
            if (oQuery) {
                tab = oQuery.tab;
                oComponent.getModel("techModel").setProperty("/tech/selectedKey", tab);
                oNavCon.to(this.getView().byId(tab), "show");
            } else {
                Utils.navigateToMenuPageTab(this.getRouter(), "Profile");
            }
        },

        onSelectTab: function (oEvent) {
            Utils.navigateToMenuPageTab(this.getRouter(), oEvent.getParameter("selectedKey"));
        },

        onHomePress: function () {
            Utils.navigateToMenuPageTab(this.getRouter(), "Profile");
        }
    });
});