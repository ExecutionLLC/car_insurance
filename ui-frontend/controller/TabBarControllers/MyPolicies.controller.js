sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "personal/account/util/Utils",
    "personal/account/util/API",
    "personal/account/util/Const",
    "sap/m/MessageBox",
    "personal/account/formatter/formatter"
], function (Controller, Utils, API, Const, MessageBox, formatter) {
    "use strict";
    return Controller.extend("personal.account.controller.TabBarControllers.MyPolicies", {
        formatter: formatter,
        onInit: function () {
            this.oComponent = this.getOwnerComponent();

            this.oTechModel = this.oComponent.getModel("techModel");
            this.oPersonModel = this.oComponent.getModel("personModel");
            this.oOperationsModel = this.oComponent.getModel("operationsModel");
            this.oPoliciesModel = this.oComponent.getModel("policiesModel");
            this.oLangModel = this.oComponent.getModel("i18n");

            var myPoliciesTabContext = this.oTechModel.getContext("/tech/myPoliciesTab");

            var techModelBindingCarVin = this.oTechModel.bindProperty("nextPolicyCarVin", myPoliciesTabContext);
            techModelBindingCarVin.attachChange(this.onNextPolicyCarVinChanges.bind(this));

            var techModelBindingDateFrom = this.oTechModel.bindProperty("nextPolicyDateFrom", myPoliciesTabContext);
            techModelBindingDateFrom.attachChange(this.onNextPolicyDateFromChanges.bind(this));

            var techModelBindingDateTo = this.oTechModel.bindProperty("nextPolicyDateToString", myPoliciesTabContext);
            techModelBindingDateTo.attachChange(this.onNextPolicyDateToChanges.bind(this));

            var operationsContext = this.oOperationsModel.getContext("/");
            var operationsModelBinding = new sap.ui.model.Binding(
                this.oOperationsModel, "/", operationsContext
            );
            operationsModelBinding.attachChange(this.onOperationsChanges.bind(this));
        },
        updatePolicyPrice: function () {
            var vin = this.oTechModel.getProperty("/tech/myPoliciesTab/nextPolicyCarVin");
            if (!vin) {
                this.oTechModel.setProperty("/tech/myPoliciesTab/nextPolicyPriceString", "?");
                return;
            }
            var perYearPrice = Utils.getInsurancePerYearPrice(this.oPersonModel, vin);
            if (!perYearPrice) {
                this.oTechModel.setProperty("/tech/myPoliciesTab/nextPolicyPriceString", "?");
                return;
            }

            var dateFrom = this.oTechModel.getProperty("/tech/myPoliciesTab/nextPolicyDateFrom");
            var dateToString = this.oTechModel.getProperty("/tech/myPoliciesTab/nextPolicyDateToString");
            var dateTo = dateToString ? Utils.dateStringToDateObject(dateToString) : null;
            if (!dateFrom || !dateTo) {
                this.oTechModel.setProperty("/tech/myPoliciesTab/nextPolicyPriceString", "?");
                return;
            }

            var days = (dateTo - dateFrom)/(1000*60*60*24) + 1;
            var nextPolicyPriceString = (perYearPrice*days/365.0).toFixed(2);
            this.oTechModel.setProperty("/tech/myPoliciesTab/nextPolicyPriceString", nextPolicyPriceString);
        },
        onNextPolicyCarVinChanges: function () {
            this.updateNextPolicyDateFrom(true);
            this.updateNextPolicyGroupState();
            this.updatePolicyPrice();
        },
        onNextPolicyDateFromChanges: function () {
            this.updatePolicyPrice();
        },
        onNextPolicyDateToChanges: function () {
            this.updateNextPolicyGroupState();
            this.updatePolicyPrice();
        },
        onOperationsChanges: function () {
            var operations = this.oOperationsModel.getProperty("/");
            if (!operations) {
                return;
            }

            var policiesHash = Object.create(null);
            operations.forEach(function(item) {
                if (item.operationType !== Const.OPERATION_TYPE.INSURANCE_ADDED &&
                    item.operationType !== Const.OPERATION_TYPE.INSURANCE_DEACTIVATED)
                {
                    return;
                }

                var pending = item.pending;
                var policyNumber = item.insuranceNumber;

                if (policiesHash[policyNumber] && item.operationType === Const.OPERATION_TYPE.INSURANCE_DEACTIVATED) {
                    policiesHash[policyNumber].isManuallyDeactivated = 1;
                } else {
                    var policy = Object.assign({}, item.operationData);
                    policy.dateFrom = new Date(policy.dateFrom);
                    policy.dateTo = new Date(policy.dateTo);
                    policy.transactionHash = item.transactionHash;
                    policy.transactionFrom = item.transactionFrom;
                    policy.pending = pending;
                    policiesHash[policyNumber] = policy;
                }
            }, this);

            var cars = this.oPersonModel.getProperty("/cars");
            var soldCars = this.oPersonModel.getProperty("/soldCars");
            var allCars = cars.concat(soldCars);
            var modelsHash = Object.create(null);
            allCars.forEach(function (car) {
                modelsHash[car.vin] = car.model;
            });

            var activePolicies = [];
            var inactivePolicies = [];
            for (var k in policiesHash) {
                var policy = policiesHash[k];
                policy.carModel = modelsHash[policy.carVin] || "?";
                if (this.isNotActivePolicy(policy)) {
                    inactivePolicies.push(policy);
                } else {
                    activePolicies.push(policy);
                }
            }

            this.oPoliciesModel.setProperty("/activePolicies", activePolicies);
            this.oPoliciesModel.setProperty("/inactivePolicies", inactivePolicies);

            this.updateNextPolicyDateFrom(false);
            this.updateNextPolicyGroupState();
        },
        updateNextPolicyDateFrom: function (forceResetDateToString) {
            var vin = this.oTechModel.getProperty("/tech/myPoliciesTab/nextPolicyCarVin");
            if (!vin) {
                return;
            }

            var dateFrom = this.getMinValidPolicyDate(vin);
            var dateFromString = Utils.dateObjToDateString(dateFrom);

            var dateToString = this.oTechModel.getProperty("/tech/myPoliciesTab/nextPolicyDateToString");
            var dateTo = dateToString ? Utils.dateStringToDateObject(dateToString) : null;

            if (dateTo && dateTo < dateFrom) {
                this.oTechModel.setProperty("/tech/myPoliciesTab/nextPolicyDateToString", dateFromString);
                this.oTechModel.setProperty("/tech/myPoliciesTab/nextPolicyDateFrom", dateFrom);
            } else {
                this.oTechModel.setProperty("/tech/myPoliciesTab/nextPolicyDateFrom", dateFrom);
                if (forceResetDateToString) {
                    this.oTechModel.setProperty("/tech/myPoliciesTab/nextPolicyDateToString", dateFromString);
                }
            }
        },
        updateNextPolicyGroupState: function () {
            var activePolicies = this.oPoliciesModel.getProperty("/activePolicies");
            var hasPending = activePolicies && activePolicies.find(function (item) {
               return item.pending === true;
            });
            var vin = this.oTechModel.getProperty("/tech/myPoliciesTab/nextPolicyCarVin");
            var dateToString = this.oTechModel.getProperty("/tech/myPoliciesTab/nextPolicyDateToString");

            var langModelResources = this.oLangModel.getResourceBundle();
            var infoText = "";
            if (hasPending) {
                this.oTechModel.setProperty("/tech/myPoliciesTab/isNextPolicyGroupEnabled", false);
                this.oTechModel.setProperty("/tech/myPoliciesTab/isNextPolicyButtonEnabled", false);
                this.oTechModel.setProperty("/tech/myPoliciesTab/infoTextState", "Warning");
                infoText = langModelResources.getText("myPolicies.waitingText");
                this.oTechModel.setProperty("/tech/myPoliciesTab/infoText", infoText);
            } else if (!vin) {
                this.oTechModel.setProperty("/tech/myPoliciesTab/isNextPolicyGroupEnabled", true);
                this.oTechModel.setProperty("/tech/myPoliciesTab/isNextPolicyButtonEnabled", false);
                this.oTechModel.setProperty("/tech/myPoliciesTab/infoTextState", "Warning");
                infoText = langModelResources.getText("myPolicies.carVinIsEmptyText");
                this.oTechModel.setProperty("/tech/myPoliciesTab/infoText", infoText);
            } else if (!dateToString) {
                this.oTechModel.setProperty("/tech/myPoliciesTab/isNextPolicyGroupEnabled", true);
                this.oTechModel.setProperty("/tech/myPoliciesTab/isNextPolicyButtonEnabled", false);
                this.oTechModel.setProperty("/tech/myPoliciesTab/infoTextState", "Warning");
                infoText = langModelResources.getText("myPolicies.dateToIsEmptyText");
                this.oTechModel.setProperty("/tech/myPoliciesTab/infoText", infoText);
            } else {
                this.oTechModel.setProperty("/tech/myPoliciesTab/isNextPolicyGroupEnabled", true);
                this.oTechModel.setProperty("/tech/myPoliciesTab/isNextPolicyButtonEnabled", true);
                this.oTechModel.setProperty("/tech/myPoliciesTab/infoTextState", "Warning");
                this.oTechModel.setProperty("/tech/myPoliciesTab/infoText", infoText);
            }
        },
        getMinValidPolicyDate: function (carVin) {
            var result = new Date();

            var activePolicies = this.oPoliciesModel.getProperty("/activePolicies");
            if (activePolicies) {
                result = activePolicies.reduce(function (minDate, item) {
                    if (item.pending || item.carVin !== carVin || item.dateTo <= minDate) {
                        return minDate;
                    }

                    return item.dateTo;
                }, result);
            }

            result.setDate(result.getDate() + 1);
            return result;
        },
        isNotActivePolicy: function (policy) {
            var currentDate = new Date();
            var dateTo = new Date(policy.dateTo);
            return dateTo < currentDate || policy.isManuallyDeactivated;
        },
        onTransactionInfoLinkPress: function (oEvent) {
            var transactionHash = oEvent.getSource().getProperty("text");
            var langModel = this.getOwnerComponent().getModel("i18n");
            Utils.showMessageBoxTransactionInfo(transactionHash, langModel);
        },
        onAddPolicyPress: function (oEvent) {
            var personId = this.oPersonModel.getProperty("/id");
            var vin = this.oTechModel.getProperty("/tech/myPoliciesTab/nextPolicyCarVin");
            var dateToString = this.oTechModel.getProperty("/tech/myPoliciesTab/nextPolicyDateToString");
            var dateTo = Utils.dateStringToDateObject(dateToString);

            var self = this;
            API.addPersonInsurance(personId, vin, dateTo).done(function(operations) {
                Utils.appendPendingOperations(self.oOperationsModel, operations);
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.error("Cannot add insurance: textStatus = ", textStatus, "error = ", errorThrown);
                var sErrorText = self.oLangModel.getResourceBundle().getText("msg.box.error");
                MessageBox.error(sErrorText);
            });
        }
    });
});