sap.ui.define([
    "sap/m/MessageBox",
    "personal/account/util/Const"
], function(MessageBox, Const) {
    "use strict";

    var STORAGE_KEY = {
        LAST_USERID: "LAST_USERID"
    };

    var $ = {
        ajax: function(opts) {
            console.log('Utils ajax', opts);

            var transactionMatch = opts.url.match(/(0x[^?$]+)/);
            var transactionHash = transactionMatch && transactionMatch[1];
            var transactionIsValid = transactionHash && /\d$/.test(transactionHash);

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
                    if (transactionIsValid) {
                        doneF({
                            "blockHash": "0xb1oc6a5600022dc1ee91e7a9896de10f254e1603ded4ac1319fbab004fd11001",
                            "blockNumber": 123456,
                            "from": "0xf7030082497dF87086Fef3DfC7c54B66Fa9b6705",
                            "gas": 1500000,
                            "gasPrice": "18000000000",
                            "hash": transactionHash,
                            "input": "0x46db9dca000000000000000000000000fc9e006d9488f15ea251dfbd8522ead5ad01adcd0000000000000000000000000000000000000000000000000000015fe9a788f3",
                            "nonce": 114,
                            "to": "0x20000000C356A7Fa6B2bd3d7A64B719Ce60fd0bA",
                            "transactionIndex": 0,
                            "value": "0",
                            "v": "0x42",
                            "r": "0x4bf3aa1bea24d5be9ac2c55e018093349f9c639ae55280dac87fe12447307f59",
                            "s": "0x2062ea75be3e3ded7f478cef0387ecc2b19b32c946ab1395a3eb646b4ebc2e58"
                        });
                    } else {
                        failF(null, 'textStatus', 'errorThrown');
                    }
                    alwaysF();
                },
                1000
            );

            return res;
        }
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
        timestampToString: function(timestamp, addTime) {
            var date = new Date(timestamp);

            var result = oModule.dateObjToDateString(date);
            if (addTime) {
                result = result + " " + oModule.dateObjToTimeString(date);
            }

            return result;
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
            $.ajax({
                url: oModule.getTransactionInfoUrl(transactionHash),
                dataType: "json"
            }).done(function (hashInfo) {
                if (hashInfo && hashInfo.input) {
                    delete hashInfo.input;
                }
                var transactionInfo = JSON.stringify(hashInfo, null, 4)
                    .replace(/[" {},]/g, "")
                    .replace(/[:]/g, " = ");

                MessageBox.information(transactionInfo);
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
        getPerson1InfoUrl: function (snils) {
            return Const.BASE_URL + "/person1/" + snils;
        },
        getTransactionInfoUrl: function(transactionHash) {
            return Const.BASE_URL + "/transaction/" + transactionHash;
        },
        getLastUserId: function () {
            var storage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
            return storage.get(STORAGE_KEY.LAST_USERID);
        },
        saveLastUserId: function (userId) {
            var storage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
            storage.put(STORAGE_KEY.LAST_USERID, userId);
        }
    };

    return oModule;
}, true);