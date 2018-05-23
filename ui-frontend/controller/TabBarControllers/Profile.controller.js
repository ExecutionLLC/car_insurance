sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "personal/account/util/Utils",
    "personal/account/formatter/formatter"
], function (Controller, Utils, formatter) {
    "use strict";
    return Controller.extend("personal.account.controller.TabBarControllers.Profile", {
        formatter: formatter,

        onEditPress: function() {
            Utils.navigateToMenuPageTab(sap.ui.core.UIComponent.getRouterFor(this), "MyInsuranceCompany");
        }
    });
});