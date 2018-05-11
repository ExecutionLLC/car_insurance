sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "personal/account/util/Utils",
    "personal/account/util/API"
], function (Controller, MessageBox, Utils, API) {
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

            oLoginInput.setEnabled(false);
            oPasswordInput.setEnabled(false);

            function onComplete() {
                oLoginInput.setEnabled(true);
                oPasswordInput.setEnabled(true);
            }

            function onDone(person) {
                oComponent.initModels(person.id);
                oLoginInput.setValue("");
                oPasswordInput.setValue("");
                Utils.navigateToMenuPageTab(oRouter);
            }

            function onFail() {
                MessageBox.error(sErrorPassOrLog);

            }

            API.login(
                oLoginInput.getValue(),
                oPasswordInput.getValue(),
                function(err, person) {
                    if (err) {
                        onFail();
                    } else {
                        onDone(person);
                    }
                    onComplete();
                }
            );
        }
    });
});