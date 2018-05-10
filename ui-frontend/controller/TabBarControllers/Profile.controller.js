sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "personal/account/formatter/formatter",
    "personal/account/util/Utils",
    "personal/account/util/Const"
], function (Controller, formatter, Utils, Const) {
    "use strict";
    return Controller.extend("personal.account.controller.TabBarControllers.Profile", {
        formatter: formatter
    });
});