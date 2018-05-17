sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "personal/account/util/Utils",
    "personal/account/formatter/formatter"
], function (Controller, Utils, formatter) {
    "use strict";
    return Controller.extend("personal.account.controller.TabBarControllers.MyPolicies", {
        formatter: formatter,
        onInit: function () {
            this.oComponent = this.getOwnerComponent();

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
                if (item.operationType !== "INSURANCE_ADDED" && item.operationType !== "INSURANCE_DEACTIVATED") {
                    return;
                }

                var pending = item.pending;
                var policyNumber = item.insuranceNumber;

                var isNotActive = this.isNotActivePolicy(item.operationData);
                if (policiesHash[policyNumber] !== undefined) {
                    policiesHash[policyNumber].isNotActive = policiesHash[policyNumber].isNotActive || isNotActive;
                } else {
                    var policy = Object.assign({}, item.operationData);
                    policy.carModel = "?";
                    policy.transactionHash = item.transactionHash;
                    policy.transactionFrom = item.transactionFrom;
                    policy.isNotActive = isNotActive;
                    policy.pending = pending;
                    policiesHash[policyNumber] = policy;
                }
            }, this);

            var cars = this.oPersonModel.getProperty("/cars");
            var soldCars = this.oPersonModel.getProperty("/soldCars");
            var allCars = cars.concat(soldCars);
            allCars.forEach(function (car) {
                if(!car.insurances) {
                    return;
                }

                car.insurances.forEach(function (insurance) {
                    var policy = policiesHash[insurance.insuranceNumber];
                    if (policy) {
                        policy.carModel = car.model;
                    }
                });
            });

            var activePolicies = [];
            var inactivePolicies = [];
            for (var k in policiesHash) {
                if (policiesHash[k].isNotActive) {
                    inactivePolicies.push(policiesHash[k]);
                } else {
                    activePolicies.push(policiesHash[k]);
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
        onLinkPress: function (oEvent) {
            var transactionHash = oEvent.getSource().getProperty("text");
            var langModel = this.getOwnerComponent().getModel("i18n");
            Utils.showMessageBoxTransactionInfo(transactionHash, langModel);
        }
    });
});