sap.ui.define([
    "personal/account/util/Const"
],function(Const){
    "use strict";

    var oModule = {
        login: function(email, password) {
            return $.ajax({
                url: Const.BASE_URL + "/login",
                dataType: "json",
                type: "POST",
                jsonp: false,
                data: JSON.stringify({email: email, password: password})
            });
        },
        getPerson: function(personId) {
            return $.ajax({
                url: Const.BASE_URL + "/person/" + personId,
                dataType: "json"
            });
        },
        getPersonOperations: function(personId) {
            return $.ajax({
                url: Const.BASE_URL + "/person/" + personId + "/operations",
                dataType: "json"
            });
        },
        getInsuranceCompanies: function() {
            return $.ajax({
                url: Const.BASE_URL + "/insurancecompanies",
                dataType: "json"
            });
        },
        addPersonCar: function(personId, carInfo) {
            var postDataString = JSON.stringify({
                vin: carInfo.vin,
                vehicleType: carInfo.vehicleType,
                model: carInfo.model,
                maxPower: carInfo.maxPower,
                year: carInfo.year,
                numberPlate: carInfo.numberPlate
            });
            return $.ajax({
                url: Const.BASE_URL + "/person/" + personId + "/cars",
                dataType: "json",
                type: "POST",
                jsonp: false,
                data: postDataString
            });
        },
        setPersonInsuranceCompany: function(personId, icId) {
            var putDataString = JSON.stringify({
                id: icId
            });
            return $.ajax({
                url: Const.BASE_URL + "/person/" + personId + "/insurancecompanyid",
                dataType: "json",
                type: "PUT",
                jsonp: false,
                data: putDataString
            });
        },
        addPersonInsurance: function(personId, vin, dateTo) {
            var postDataString = JSON.stringify({
                dateTo: dateTo
            });
            return $.ajax({
                url: Const.BASE_URL + "/person/" + personId + "/cars/" + vin + "/insurances",
                dataType: "json",
                type: "POST",
                jsonp: false,
                data: postDataString
            });
        }
    };

    return oModule;
},true);
