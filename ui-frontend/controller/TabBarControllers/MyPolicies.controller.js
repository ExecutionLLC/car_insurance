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

            var operationsModelBinding = new sap.ui.model.Binding(
                this.oOperationsModel, "/", this.oOperationsModel.getContext("/")
            );
            operationsModelBinding.attachChange(this.onOperationsChanges.bind(this));
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
        getMinValidPolicyDate: function (carVin) {
            var cars = this.oPersonModel.getProperty("/cars");
            var soldCars = this.oPersonModel.getProperty("/soldCars");

            var car = cars.concat(soldCars).find(function(item) {
                return item.vin === carVin;
            });
            if (!car) {
                return null;
            }

            var result = new Date();
            var dateTo = Utils.findLastActiveInsuranceDateTo(car.insurances);
            if (dateTo && result < dateTo) {
                result = dateTo;
            }
            result.setDate(result.getDate() + 1);

            return result;
        },
        updateDatePickerRange: function () {
            var vin = this.oTechModel.getProperty("/tech/myPoliciesTab/nextPolicyCarVin");
            var minDate = this.getMinValidPolicyDate(vin);
            var datePicker = this.getView().byId("policyDateTo");
            datePicker.setValue(minDate);
            datePicker.setMinDate(minDate);
        },
        updateAddPolicyState: function ()  {
            var vin = this.oTechModel.getProperty("/tech/myPoliciesTab/nextPolicyCarVin");
            var dateTo = this.oTechModel.getProperty("/tech/myPoliciesTab/nextPolicyDateTo");
            if (!vin) {
                this.oTechModel.setProperty("/tech/myPoliciesTab/isAddPolicyButtonEnabled", false);
                return;
            }
            if (!dateTo) {
                this.oTechModel.setProperty("/tech/myPoliciesTab/isAddPolicyButtonEnabled", false);
                return;
            }

            this.oTechModel.setProperty("/tech/myPoliciesTab/isAddPolicyButtonEnabled", true);
        },
        onPolicyCarSelected: function (oEvent) {
            var vin = oEvent.getSource().getProperty("selectedKey");
            this.oTechModel.setProperty("/tech/myPoliciesTab/nextPolicyCarVin", vin);
            this.updateDatePickerRange();
            this.updateAddPolicyState();
        },
        onPolicyDateSelected: function (oEvent) {
            var dateString = oEvent.getSource().getProperty("dateValue");
            var date = new Date(dateString);
            this.oTechModel.setProperty("/tech/myPoliciesTab/nextPolicyDateTo", date);
            this.updateAddPolicyState();
        },
        onAddPolicyPress: function (oEvent) {
            var personId = this.oPersonModel.getProperty("/id");
            var vin = this.oTechModel.getProperty("/tech/myPoliciesTab/nextPolicyCarVin");
            var dateTo = this.oTechModel.getProperty("/tech/myPoliciesTab/nextPolicyDateTo");
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