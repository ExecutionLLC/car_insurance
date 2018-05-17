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
            switch (true) {
                case int <= 2:
                    return {
                        symbol    : "AA+",
                        description: "Высокая надежность",
                        imageSrc  : "./image/rating/AAplus.jpg"
                    };
                case int <= 4:
                    return {
                        symbol    : "AAA",
                        description: "Наивысшая надежность",
                        imageSrc  : "./image/rating/AAA.jpg"
                    };
                case int > 4:
                    return {
                        symbol    : "AAA+",
                        description: "Наивысшая надежность",
                        imageSrc  : "./image/rating/AAAplus.jpg"
                    };
                default:
                    return {
                        symbol: "?",
                        description: "Неизвестен",
                        imageSrc  : "./image/rating/unknown.jpg"
                    };
            }
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
        }
    };

    return oModule;
}, true);