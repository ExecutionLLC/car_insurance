sap.ui.define([
    "personal/account/util/Const"
],function(Const){
    "use strict";

/*
Игорь, [10.05.18 17:51]
https://executiona4038b30e.hana.ondemand.com/CarInsurance/car_insurance.xsjs

Игорь, [10.05.18 17:51]
/login

Игорь, [10.05.18 17:52]
{email:"", password:""}

Игорь, [10.05.18 17:52]
test1@execution.su

Игорь, [10.05.18 17:52]
pasword везде 123

Игорь, [10.05.18 17:54]
/person/id

Игорь, [10.05.18 17:54]
/person/id/operations

Игорь, [10.05.18 17:54]
/insurancecompanies
 */

    var oModule = {
        login: function(email, password, callback) {
            $.ajax({
                url: Const.BASE_URL + "/login",
                dataType: "json",
                type: "POST",
                jsonp: false,
                data: JSON.stringify({email: email, password: password})
            }).done(function (result) {
                callback(null, result);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                callback(new Error(errorThrown));
            });
        }
    };

    return oModule;
},true);
