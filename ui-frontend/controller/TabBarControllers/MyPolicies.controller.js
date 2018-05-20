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

            var myPoliciesTabContext = this.oTechModel.getContext("/tech/myPoliciesTab");

            var techModelBindingCarVin = this.oTechModel.bindProperty("nextPolicyCarVin", myPoliciesTabContext);
            techModelBindingCarVin.attachChange(this.onNextPolicyCarVinChanges.bind(this));

            var techModelBindingDateTo = this.oTechModel.bindProperty("nextPolicyDateTo", myPoliciesTabContext);
            techModelBindingDateTo.attachChange(this.onNextPolicyDateToChanges.bind(this));

            var operationsContext = this.oOperationsModel.getContext("/");
            var operationsModelBinding = new sap.ui.model.Binding(
                this.oOperationsModel, "/", operationsContext
            );
            operationsModelBinding.attachChange(this.onOperationsChanges.bind(this));
        },
        onNextPolicyCarVinChanges: function () {
            this.updateNextPolicyMinDate(true);
            this.updateNextPolicyGroupState();
        },
        onNextPolicyDateToChanges: function () {
            this.updateNextPolicyGroupState();
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

            this.updateNextPolicyMinDate(false);
            this.updateNextPolicyGroupState();
        },
        updateNextPolicyMinDate: function (forceResetCurrentValue) {
            var vin = this.oTechModel.getProperty("/tech/myPoliciesTab/nextPolicyCarVin");
            if (!vin) {
                return;
            }

            var minDate = this.getMinValidPolicyDate(vin);
            var minDateString = Utils.dateObjToDateString(minDate);

            var dateToString = this.oTechModel.getProperty("/tech/myPoliciesTab/nextPolicyDateTo");
            var dateTo = dateToString ? Utils.dateStringToDateObject(dateToString) : null;

            var datePicker = this.getView().byId("policyDateTo");
            if (dateTo && dateTo < minDate) {
                this.oTechModel.setProperty("/tech/myPoliciesTab/nextPolicyDateTo", minDateString);
                datePicker.setMinDate(minDate);
            } else {
                datePicker.setMinDate(minDate);
                if (forceResetCurrentValue) {
                    this.oTechModel.setProperty("/tech/myPoliciesTab/nextPolicyDateTo", minDateString);
                }
            }
        },
        updateNextPolicyGroupState: function () {
            var activePolicies = this.oPoliciesModel.getProperty("/activePolicies");
            var hasPending = activePolicies && activePolicies.find(function (item) {
               return item.pending === true;
            });
            var vin = this.oTechModel.getProperty("/tech/myPoliciesTab/nextPolicyCarVin");
            var dateToString = this.oTechModel.getProperty("/tech/myPoliciesTab/nextPolicyDateTo");

            if (hasPending) {
                this.oTechModel.setProperty("/tech/myPoliciesTab/isNextPolicyGroupEnabled", false);
                this.oTechModel.setProperty("/tech/myPoliciesTab/isNextPolicyButtonEnabled", false);
                this.oTechModel.setProperty("/tech/myPoliciesTab/infoTextState", "Warning");
                this.oTechModel.setProperty("/tech/myPoliciesTab/infoText", "Заявка на расмотрении");
            } else if (!vin) {
                this.oTechModel.setProperty("/tech/myPoliciesTab/isNextPolicyGroupEnabled", true);
                this.oTechModel.setProperty("/tech/myPoliciesTab/isNextPolicyButtonEnabled", false);
                this.oTechModel.setProperty("/tech/myPoliciesTab/infoTextState", "Warning");
                this.oTechModel.setProperty("/tech/myPoliciesTab/infoText", "Выберите автомобиль");
            } else if (!dateToString) {
                this.oTechModel.setProperty("/tech/myPoliciesTab/isNextPolicyGroupEnabled", true);
                this.oTechModel.setProperty("/tech/myPoliciesTab/isNextPolicyButtonEnabled", false);
                this.oTechModel.setProperty("/tech/myPoliciesTab/infoTextState", "Warning");
                this.oTechModel.setProperty("/tech/myPoliciesTab/infoText", "Выберите дату");
            } else {
                this.oTechModel.setProperty("/tech/myPoliciesTab/isNextPolicyGroupEnabled", true);
                this.oTechModel.setProperty("/tech/myPoliciesTab/isNextPolicyButtonEnabled", true);
                this.oTechModel.setProperty("/tech/myPoliciesTab/infoTextState", "Warning");
                this.oTechModel.setProperty("/tech/myPoliciesTab/infoText", "");
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
            var dateToString = this.oTechModel.getProperty("/tech/myPoliciesTab/nextPolicyDateTo");
            var dateTo = Utils.dateStringToDateObject(dateToString);

            var operationsModel = this.oOperationsModel;
            var langModel = this.getOwnerComponent().getModel("i18n");
            API.addPersonInsurance(personId, vin, dateTo).done(function(operations) {
                Utils.appendPendingOperations(operationsModel, operations);
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.error("Cannot add insurance: textStatus = ", textStatus, "error = ", errorThrown);
                var sErrorText = langModel.getResourceBundle().getText("msg.box.error");
                MessageBox.error(sErrorText);
            });
        }
    });
});