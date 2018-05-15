sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "personal/account/formatter/formatter"
], function (Controller, formatter) {
    "use strict";
    return Controller.extend("personal.account.controller.TabBarControllers.MyPolicies", {
        formatter: formatter
    });
});