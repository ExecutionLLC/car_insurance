sap.ui.define([
    "sap/m/MessageBox",
    "personal/account/util/Const",
    "personal/account/util/API"
], function(MessageBox, Const, API) {
    "use strict";

    var STORAGE_KEY = {
        LAST_USERID: "LAST_USERID"
    };

    var oModule = {
        _addLeadingZeroIfNeedIt: function (value) {
            if (value.length < 2) {
                return "0" + value;
            }

            return value;
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
        dateStringToDateObject: function(dateString) {
            var dateData = dateString.split(".").map(function(item) {
                return parseInt(item);
            });

            return new Date(dateData[2], dateData[1] - 1, dateData[0]);
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

        conversionICRating: function (int) {
            var defaultRating = {
                symbol: "?",
                description: "Неизвестен"
            };
            var ratingForInt = {
                0: {
                    symbol    : "D",
                    description: "В состоянии дефолта"
                },
                1: {
                    symbol    : "C",
                    description: "Близки к дефолту"
                },
                2: {
                    symbol    : "CC",
                    description: "Близки к дефолту"
                },
                3: {
                    symbol    : "CCC-",
                    description: "Близки к дефолту"
                },
                4: {
                    symbol    : "CCC",
                    description: "Крайне высокий кредитный риск"
                },
                5: {
                    symbol    : "CCC+",
                    description: "Очень высокий кредитный риск"
                },
                6: {
                    symbol    : "B-",
                    description: "Рискованные обязательства в высокой степени спекулятивные"
                },
                7: {
                    symbol    : "B",
                    description: "Рискованные обязательства в высокой степени спекулятивные"
                },
                8: {
                    symbol    : "B+",
                    description: "Рискованные обязательства в высокой степени спекулятивные"
                },
                9: {
                    symbol    : "BB-",
                    description: "Рискованные обязательства с чертами спекулятивных"
                },
                10: {
                    symbol    : "BB",
                    description: "Рискованные обязательства с чертами спекулятивных"
                },
                11: {
                    symbol    : "BB+",
                    description: "Рискованные обязательства с чертами спекулятивных"
                },
                12: {
                    symbol    : "BBB-",
                    description: "Надежность ниже среднего"
                },
                13: {
                    symbol    : "BBB",
                    description: "Надежность ниже среднего"
                },
                14: {
                    symbol    : "BBB+",
                    description: "Надежность ниже среднего"
                },
                15: {
                    symbol    : "A-",
                    description: "Надежность выше среднего"
                },
                16: {
                    symbol    : "A",
                    description: "Надежность выше среднего"
                },
                17: {
                    symbol    : "A+",
                    description: "Надежность выше среднего"
                },
                18: {
                    symbol    : "AA-",
                    description: "Высокая надежность"
                },
                19: {
                    symbol    : "AA",
                    description: "Высокая надежность"
                },
                20: {
                    symbol    : "AA+",
                    description: "Высокая надежность",
                    imageSrc  : "./image/AAplus.jpg"
                },
                21: {
                    symbol    : "AAA",
                    description: "Наивысшая надежность",
                    imageSrc  : "./image/AAA.jpg"
                },
                22: {
                    symbol    : "AAA+",
                    description: "Наивысшая надежность",
                    imageSrc  : "./image/AAAplus.jpg"
                }
            };

            return ratingForInt[int] || defaultRating;
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
        }
    };

    return oModule;
}, true);