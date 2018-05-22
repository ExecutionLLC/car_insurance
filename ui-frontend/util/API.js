sap.ui.define([
    "personal/account/util/Const"
],function(Const){
    "use strict";

    function makeArrayTimestampsAsDate(array) {
        return array.map(function(item) {
            return Object.assign(
                {},
                item,
                {
                    timestamp: new Date(item.timestamp)
                }
            );
        });
    }

    function makeArrayDatesFromToAsDate(array) {
        return array.map(function(item) {
            return Object.assign(
                {},
                item,
                {
                    dateFrom: new Date(item.dateFrom),
                    dateTo: new Date(item.dateTo)
                }
            );
        });
    }

    function makeCarInsurancesDatesFromToAsDate(car) {
        return Object.assign(
            {},
            car,
            {
                insurances: makeArrayDatesFromToAsDate(car.insurances)
            }
        );
    }

    function makeCarsInsurancesDatesFromToAsDate(cars) {
        return cars.map(makeCarInsurancesDatesFromToAsDate);
    }

    function makePersonCarsInsurancesDatesFromToAsDate(personInfo) {
        return Object.assign(
            {},
            personInfo,
            {
                cars: makeCarsInsurancesDatesFromToAsDate(personInfo.cars),
                soldCars: makeCarsInsurancesDatesFromToAsDate(personInfo.soldCars)
            }
        );
    }

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
        getTransaction: function(hash) {
            return $.ajax({
                url: Const.BASE_URL + "/transaction/" + hash,
                dataType: "json"
            });
        },
        getPerson: function(personId) {
            return $.ajax({
                url: Const.BASE_URL + "/person/" + personId,
                dataType: "json"
            })
                .then(function(personInfo) {
                    if (personInfo.cars) {
                        personInfo.cars.reverse();
                    }
                    return personInfo;
                })
                .then(makePersonCarsInsurancesDatesFromToAsDate);
        },
        getPersonOperations: function(personId) {
            return $.ajax({
                url: Const.BASE_URL + "/person/" + personId + "/operations",
                dataType: "json"
            }).then(makeArrayTimestampsAsDate);
        },
        getInsuranceCompanies: function() {
            return $.ajax({
                url: Const.BASE_URL + "/insurancecompanies",
                dataType: "json"
            }).then(function(insuranceCompanies) { // this returns ar result only without status, etc.
                return insuranceCompanies;
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
            }).then(makeArrayTimestampsAsDate);
        },
        salePersonCar: function(personId, carVin) {
            return $.ajax({
                url: Const.BASE_URL + "/person/" + personId + "/cars/" + carVin,
                dataType: "json",
                type: "DELETE",
                jsonp: false
            }).then(makeArrayTimestampsAsDate);
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
            }).then(makeArrayTimestampsAsDate);
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
            }).then(makeArrayTimestampsAsDate);
        }
    };

    return oModule;
},true);
