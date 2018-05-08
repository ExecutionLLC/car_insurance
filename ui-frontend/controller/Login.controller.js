sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "personal/account/util/Utils"
], function (Controller, MessageBox, Utils) {
    "use strict";
    return Controller.extend("personal.account.controller.Login", {
        onInit: function () {
            var oLoginInput = this.byId("loginInput");
            oLoginInput.onkeypress = function (event) {
                if(event.key === "Enter") {
                    this.onEnter();
                }
            }.bind(this);
        },

        onEnter: function (oEvent) {
            var oComponent = this.getOwnerComponent();
            var sErrorPassOrLog = oComponent.getModel("i18n")
                    .getResourceBundle()
                    .getText("msg.box.wrongLoginPass");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var oLoginInput = this.getView().byId("loginInput");
            var oPasswordInput = this.getView().byId("passwordInput");

            var authData = {
                login: oLoginInput.getValue().replace(/[- ]/g, ""),
                password: oPasswordInput.getValue()
            };
            oLoginInput.setEnabled(false);
            oPasswordInput.setEnabled(false);

            $.ajax({
                url: Utils.getLoginUrl(),
                dataType: "json",
                type: "POST",
                jsonp: false,
                data: JSON.stringify(authData)
            // FIXME: temporary test changes, restore at merge >>>
            // }).done(function (result) {
            //     oComponent.initModels(result.snils);
            //     oLoginInput.setValue("");
            //     oPasswordInput.setValue("");
            //     Utils.navigateToMenuPageTab(oRouter);
            // }).fail(function (jqXHR, textStatus, errorThrown) {
            //     MessageBox.error(sErrorPassOrLog);
            // FIXME: <<<
            }).always(function () {
                // FIXME: temporary test changes, restore at merge >>>
                // oLoginInput.setEnabled(true);
                // oPasswordInput.setEnabled(true);
                // FIXME: <<<
              // FIXME: temporary test changes, remove at merge >>>
              oComponent.initModels('result.snils');
              oLoginInput.setValue("");
              oPasswordInput.setValue("");
              Utils.navigateToMenuPageTab(oRouter);
              // FIXME: <<<
            });
        }
    });
});