sap.ui.define([
    "sap/m/MessageBox",
    "personal/account/util/Const",
    "personal/account/util/API"
], function(MessageBox, Const, API) {
    "use strict";

    var STORAGE_KEY = {
        LAST_USERID: "LAST_USERID"
    };
    var HOURS_SHIFT = -3;

    var oModule = {
        _addLeadingZeroIfNeedIt: function (value) {
            if (value.length < 2) {
                return "0" + value;
            }

            return value;
        },
        getAlignedCurrentDate: function () {
            var result = new Date();
            result.setUTCHours(HOURS_SHIFT, 0, 0, 0);
            return result;
        },
        getDatePlusDays: function (date, days) {
            var result = new Date(date.valueOf());
            result.setDate(result.getDate() + days);
            return result;
        },
        dateObjToDateString: function(date) {
            var day = String(date.getDate());
            var month = String(date.getMonth() + 1);
            var year = date.getFullYear();

            return oModule._addLeadingZeroIfNeedIt(day) + "." + oModule._addLeadingZeroIfNeedIt(month) + "." + year;
        },
        dateObjToTimeString: function(date) {
            var hours = String(date.getHours());
            var minutes = String(date.getMinutes());

            return oModule._addLeadingZeroIfNeedIt(hours) + ":" + oModule._addLeadingZeroIfNeedIt(minutes);
        },
        dateObjToString: function(timestamp, addTime) {
            var result = oModule.dateObjToDateString(timestamp);
            if (addTime) {
                result = result + " " + oModule.dateObjToTimeString(timestamp);
            }

            return result;
        },
        dateStringToAlignedDateObject: function(dateString) {
            var dateData = dateString.split(".").map(function(item) {
                return parseInt(item);
            });

            var result = new Date();
            result.setUTCHours(HOURS_SHIFT, 0, 0, 0);
            result.setUTCFullYear(dateData[2], dateData[1] - 1, dateData[0]);

            return !isNaN(result) ? result : null;
        },
        getInsuranceObjectByAddress: function (address, model) {
            if (!address || !model) {
                return null;
            }
            var modelData = model.getData();
            if (!modelData || !modelData.find) {
                return null;
            }
            return modelData.find(function (item) {
                return item.id === address;
            });
        },
        getInsuranceCompanyById: function (oInsuranceCompaniesModel, id) {
            var companies = oInsuranceCompaniesModel.getProperty("/") || [];

            return companies.find(function (item) {
                return item.id === id;
            }) || null;
        },
        getCarByVin: function (oPersonModel, vin) {
            var cars = oPersonModel.getProperty("/cars") || [];
            var soldCars = oPersonModel.getProperty("/soldCars") || [];
            var allCars = cars.concat(soldCars);

            return allCars.find(function (item) {
                return item.vin === vin;
            }) || null;
        },
        conversionICRating: function (int) {
            switch (true) {
                case int <= 2:
                    return {
                        symbol    : "AA+",
                        description: "high",
                        imageSrc  : "./image/rating/AAplus.jpg",
                        color: "lightgreen"
                    };
                case int <= 4:
                    return {
                        symbol    : "AAA",
                        description: "higher",
                        imageSrc  : "./image/rating/AAA.jpg",
                        color: "green"
                    };
                case int > 4:
                    return {
                        symbol    : "AAA+",
                        description: "highest",
                        imageSrc  : "./image/rating/AAAplus.jpg",
                        color: "darkgreen"
                    };
                default:
                    return {
                        symbol: "?",
                        description: "unknown",
                        imageSrc  : "./image/rating/unknown.jpg",
                        color: "gray"
                    };
            }
        },
        getBonusMalusClassByCoefficient: function (k) {
            if (k >= 2.45) {
                return "M";
            }
            if (k >= 2.3) {
                return "0";
            }
            if (k >= 1.55) {
                return "1";
            }
            if (k >= 1.4) {
                return "2";
            }

            var result = 23 - Math.round(k/0.05);
            result = Math.min(result, 13);
            return result.toString();
        },
        showMessageBoxTransactionInfo: function (transactionHash, langModel) {
            API.getTransaction(transactionHash).done(function (transactionInfo) {
                delete transactionInfo.timestamp;
                var text = JSON.stringify(transactionInfo, null, 4);
                var formatedText = text.replace(/[" {},]/g, "").replace(/[:]/g, " = ");
                MessageBox.information(formatedText);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error("Cannot get transaction info: textStatus = ", textStatus, "error = ", errorThrown);
                var sErrorText = langModel.getResourceBundle().getText("msg.box.error");
                MessageBox.error(sErrorText);
            });
        },
        navigateToMenuPageTab: function (router, tabName) {
            var navToOptions =
                tabName ?
                    {
                        query: {
                            tab: tabName
                        }
                    } :
                    {};
            router.navTo("menuPage", navToOptions, true);
        },
        getLastUserId: function () {
            var storage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
            return storage.get(STORAGE_KEY.LAST_USERID);
        },
        saveLastUserId: function (userId) {
            var storage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
            storage.put(STORAGE_KEY.LAST_USERID, userId);
        },
        appendPendingOperations: function(operationsModel, operations) {
            var modelOperations = operationsModel.getData();
            var operationsArray = modelOperations.length ?
                modelOperations :
                [];
            var pendingOperations = operations.map(function(operation) {
                return Object.assign({}, operation, {pending: true});
            });
            var newOperations = operationsArray.concat(pendingOperations);
            operationsModel.setData(newOperations);
        },
        getInsurancePerYearPrice: function (oPersonModel, carVin) {
            var basePrice = oPersonModel.getProperty("/basePrice");
            var bonusMalus = oPersonModel.getProperty("/bonusMalus");

            if (!basePrice || !bonusMalus) {
                return null;
            }

            var cars = oPersonModel.getProperty("/cars") || [];
            var soldCars = oPersonModel.getProperty("/soldCars") || [];
            var allCars = cars.concat(soldCars);
            var car = allCars.find(function (item) {
                return item.vin === carVin;
            });

            if (!car) {
                return null;
            }

            var k;
            if (car.maxPower <= 50) {
                k = 0.6;
            } else if (car.maxPower <= 70) {
                k = 1.0;
            } else if (car.maxPower <= 100) {
                k = 1.1;
            } else if (car.maxPower <= 120) {
                k = 1.2;
            } else if (car.maxPower <= 150) {
                k = 1.4;
            } else {
                k = 1.6;
            }

            return bonusMalus*basePrice*k;
        },
        findLastActiveInsurance: function(insurances) {
            if (!insurances || !insurances.length) {
                return null;
            }
            return insurances.reduce(
                function(lastInsurance, insurance) {
                    if (insurance.isManuallyDeactivated) {
                        return lastInsurance;
                    }
                    if (!lastInsurance) {
                        return insurance;
                    }
                    return lastInsurance.dateTo > insurance.dateTo ?
                        lastInsurance :
                        insurance;
                },
                null
            );
        },
        findLastActiveInsuranceDateTo: function(insurances) {
            var lastInsurance = this.findLastActiveInsurance(insurances);
            if (!lastInsurance) {
                return null;
            }
            return lastInsurance.dateTo;
        },
        findLastActiveInsuranceNumber: function(insurances) {
            var lastInsurance = this.findLastActiveInsurance(insurances);
            if (!lastInsurance) {
                return null;
            }
            return lastInsurance.insuranceNumber;
        },

        findLastTimestampedObject: function(arr) {
            return arr.reduce(
                function(lastItem, item) {
                    if (!lastItem) {
                        return item;
                    }
                    return lastItem.timestamp > item.timestamp ?
                        lastItem :
                        item;
                },
                null
            );
        },
        findLastOperation: function(operations, type) {
            if (!operations || !operations.length) {
                return null;
            }
            var filteredOperations = operations.filter(function(operation) {
                return operation.operationType === type;
            });
            return this.findLastTimestampedObject(filteredOperations);
        },

        calcInsuranceExpirationType: function(insurances) {

            function daysDiff(d1, d2) {
                return (d2 - d1) / 1000 / 60 / 60 / 24;
            }

            function expirationType(daysToExpire) {
                if (!daysToExpire || daysToExpire <= 0) {
                    return Const.INSURANCE_EXPIRATION.EXPIRED;
                }
                if (daysToExpire <= 14) {
                    return Const.INSURANCE_EXPIRATION.SOON;
                }
                return Const.INSURANCE_EXPIRATION.OK;
            }

            var lastInsuranceDataTo = this.findLastActiveInsuranceDateTo(insurances);
            var daysToExpire = lastInsuranceDataTo ?
                daysDiff(new Date(), new Date(lastInsuranceDataTo)) :
                -1;
            return expirationType(daysToExpire);
        },

        i18nFormatStr: function (oBundle, templateId, params) {
            var templateStr = oBundle.getText(templateId);
            return $.sap.formatMessage(templateStr, params);
        }
    };

    return oModule;
}, true);