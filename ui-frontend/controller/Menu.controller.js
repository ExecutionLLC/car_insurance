sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
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
                this.oRouter.navTo("menuPage", {
                    query: {
                        tab: _aValidTabKeys[0]
                    }
                }, true /*no history*/);
            }
        },

        onSelectTab: function (oEvent) {
            this.oRouter.navTo("menuPage", {
                query: {
                    tab: oEvent.getParameter("selectedKey")
                }
            }, true);
        },

        onLogout: function () {
            this.oRouter.navTo("loginPage");
        },

        onHomePress: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("menuPage", {
                query: {
                    tab: "Profile"
                }
            }, true);
        }
    });
});