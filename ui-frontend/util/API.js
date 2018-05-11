sap.ui.define([
    "personal/account/util/Const"
],function(Const){
    "use strict";

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
        },
        getPerson: function(personId, callback) {
            $.ajax({
                url: Const.BASE_URL + "/person/" + personId,
                dataType: "json"
            }).done(function(personInfoResult) {
                callback(null, personInfoResult);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                callback(new Error(errorThrown));
            });
        },
        getPersonOperations: function(personId, callback) {
            $.ajax({
                url: Const.BASE_URL + "/person/" + personId + "/operations",
                dataType: "json"
            }).done(function(personOperationsResult) {
                callback(null, personOperationsResult);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                callback(new Error(errorThrown));
            });
        },
        getInsuranceCompanies: function(callback) {
            $.ajax({
                url: Const.BASE_URL + "/insurancecompanies",
                dataType: "json"
            }).done(function(insuranceCompaniesResult) {
                callback(null, insuranceCompaniesResult);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                callback(new Error(errorThrown));
            });
        },
        addPersonCar: function(personId, carInfo, callback) {
            var postDataString = JSON.stringify({
                vin: carInfo.vin,
                vehicleType: carInfo.vehicleType,
                model: carInfo.model,
                maxPower: carInfo.maxPower,
                year: carInfo.year,
                numberPlate: carInfo.numberPlate
            });
            $.ajax({
                url: Const.BASE_URL + "/person/" + personId + "/cars",
                dataType: "json",
                type: "POST",
                jsonp: false,
                data: postDataString
            }).done(function (result) {
                callback(null, result);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                callback(new Error(errorThrown));
            });
        },
        setPersonInsuranceCompany: function(personId, icId, callback) {
            var putDataString = JSON.stringify({
                id: icId
            });
            $.ajax({
                url: Const.BASE_URL + "/person/" + personId + "/insurancecompanyid",
                dataType: "json",
                type: "PUT",
                jsonp: false,
                data: putDataString
            }).done(function (result) {
                callback(null, result);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                callback(new Error(errorThrown));
            });
        },
        addPersonInsurance: function(personId, vin, dateTo, callback) {
            var postDataString = JSON.stringify({
                dateTo: dateTo
            });
            $.ajax({
                url: Const.BASE_URL + "/person/" + personId + "/cars/" + vin + "/insurances",
                dataType: "json",
                type: "POST",
                jsonp: false,
                data: postDataString
            }).done(function (result) {
                callback(null, result);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                callback(new Error(errorThrown));
            });
        }
    };

    return oModule;
},true);
