sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "personal/account/util/Utils"
], function (Controller, MessageBox, Utils) {
    "use strict";

    var $ = {
        ajax: function(opts) {
            var doneF = function() {};
            var failF = function() {};
            var alwaysF = function() {};
            var res = {
                done: function(f) {
                    doneF = f;
                    return res;
                },
                fail: function(f) {
                    failF = f;
                    return res;
                },
                always: function(f) {
                    alwaysF = f;
                    return res;
                }
            };

            setTimeout(
                function() {
                    var loginData = JSON.parse(opts.data);
                    var isValid = loginData.login === loginData.password;
                    if (isValid) {
                        doneF({
                            "firstName": "Иван",
                            "middleName": "Иванович",
                            "lastName": "Иванов",
                            "birthDate": 536544000000,
                            "email": "ivan@example.com",
                            "snils": "00000000101"
                        });
                    } else {
                        failF();
                    }
                    alwaysF();
                },
                1000
            );

            return res;
        }
    };

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
            }).done(function (result) {
                oComponent.initModels(result.snils);
                oLoginInput.setValue("");
                oPasswordInput.setValue("");
                Utils.navigateToMenuPageTab(oRouter);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                MessageBox.error(sErrorPassOrLog);
            }).always(function () {
                oLoginInput.setEnabled(true);
                oPasswordInput.setEnabled(true);
            });
        }
    });
});