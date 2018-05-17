sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "personal/account/formatter/formatter",
    "personal/account/util/Const",
    "personal/account/util/Utils",
    "personal/account/util/API"
], function (Controller, formatter, Const, Utils, API) {
    "use strict";

    return Controller.extend("personal.account.controller.TabBarControllers.InsuranceCompany", {
        formatter: formatter,

        onInit: function () {
            this.oComponent = this.getOwnerComponent();
            this.oTechModel = this.oComponent.getModel("techModel");
            this.oPersonModel = this.oComponent.getModel("personModel");
            this.oOperationsModel = this.oComponent.getModel("operationsModel");
            this.enableSelectButtonTimerId = null;
            this.oResourceBundle = this.oComponent.getModel("i18n").getResourceBundle();

            var operationsModelBinding = new sap.ui.model.Binding(
                this.oOperationsModel, "/", this.oOperationsModel.getContext("/")
            );
            operationsModelBinding.attachChange(this.onOperationsModelChanges.bind(this));
        },

        enableSelectButton: function(enable, nextMinTimeForChanges) {
            if (nextMinTimeForChanges) {
                this.oTechModel.setProperty("/tech/insuranceCompanyTab/isNextMinTimeForChangeLabelVisible", true);
                var message = Utils.timestampToString(nextMinTimeForChanges, true);
                this.oTechModel.setProperty("/tech/insuranceCompanyTab/nextMinTimeForChangeMessage", message);
                this.oTechModel.setProperty("/tech/insuranceCompanyTab/isSelectButtonEnabled", false);
            } else {
                this.oTechModel.setProperty("/tech/insuranceCompanyTab/isNextMinTimeForChangeLabelVisible", false);
                this.oTechModel.setProperty("/tech/insuranceCompanyTab/nextMinTimeForChangeMessage", "");
                this.oTechModel.setProperty("/tech/insuranceCompanyTab/isSelectButtonEnabled", true);
            }
        },

        onOperationsModelChanges: function() {
            var modelOperations = this.oOperationsModel.getData();
            var operationsArray = modelOperations.length ? modelOperations : [];
            var insuranceOperations = operationsArray.filter(function(operation) {
                var operationType = operation.operationType;
                return operationType === Const.OPERATION_TYPE.INSURANCE_COMPANY_CHANGED;
            });

            this.oTechModel.setProperty("/tech/insuranceCompanyTab/insuranceCompaniesTableData", insuranceOperations);

            var firstPendedOperation = insuranceOperations.find(function(operation) {
                return operation.pending;
            });

            if (firstPendedOperation) {
                var sRequestPendingText = this.oResourceBundle.getText("insuranceCompany.men.exp.requestPendingText");
                this.oTechModel.setProperty("/tech/insuranceCompanyTab/selectedInsuranceCompany", "");
                this.oTechModel.setProperty("/tech/insuranceCompanyTab/isNextInsuranceCompanyTableVisible", false);
                this.oTechModel.setProperty("/tech/insuranceCompanyTab/needConfirmation", true);
                this.oTechModel.setProperty("/tech/insuranceCompanyTab/isApplyButtonVisible", false);
                this.oTechModel.setProperty("/tech/insuranceCompanyTab/changeInsuranceCompanyMessage", sRequestPendingText);
                this.oTechModel.setProperty("/tech/insuranceCompanyTab/changeInsuranceCompanyMessageType", "Warning");
                this.oTechModel.setProperty("/tech/insuranceCompanyTab/changeInsuranceCompanyMessageIsPending", true);
            } else {
                var changeInsuranceCompanyMessageIsPending = this.oTechModel.getProperty("/tech/insuranceCompanyTab/changeInsuranceCompanyMessageIsPending");
                if (changeInsuranceCompanyMessageIsPending) {
                    this.oTechModel.setProperty("/tech/insuranceCompanyTab/changeInsuranceCompanyMessage", "");
                    this.oTechModel.setProperty("/tech/insuranceCompanyTab/changeInsuranceCompanyMessageIsPending", false);
                }
            }

            var lastOperation = insuranceOperations[insuranceOperations.length - 1];
            var nextMinTimeForChanges = lastOperation ?
                +new Date(lastOperation.timestamp) + Const.TIME_NEXT_CHANGE_INSURANCE_COMPANY :
                null;
            var currentTime = new Date();
            if (nextMinTimeForChanges && currentTime < nextMinTimeForChanges) {
                if (this.enableSelectButtonTimerId) {
                    clearTimeout(this.enableSelectButtonTimerId);
                }

                this.enableSelectButton(false, nextMinTimeForChanges);

                this.enableSelectButtonTimerId = setTimeout(function () {
                    this.enableSelectButton(true);
                    this.enableSelectButtonTimerId = null;
                }.bind(this), nextMinTimeForChanges - currentTime);
            } else {
                this.enableSelectButton(true);
            }
        },

        onSelectButton: function (oEvent) {
            var isNextInsuranceCompanyTableVisible = !this.oTechModel.getProperty("/tech/insuranceCompanyTab/isNextInsuranceCompanyTableVisible");
            this.oTechModel.setProperty("/tech/insuranceCompanyTab/isNextInsuranceCompanyTableVisible", isNextInsuranceCompanyTableVisible);
        },

        onSelectInsuranceCompanyTableItem: function (oEvent) {
            var oItem = oEvent.getSource();
            var oSelectedObject = oItem.getBindingContext("icModel").getObject();
            var nSelectedInsuranceCompanyAddress = oSelectedObject.id;
            var selectedInsuranceCompanyName = oSelectedObject.name;
            var sApplyButtonTextChange = this.oResourceBundle.getText("insuranceCompany.men.exp.applyButtonTextChange");
            this.oTechModel.setProperty("/tech/insuranceCompanyTab/selectedInsuranceCompanyAddress", nSelectedInsuranceCompanyAddress);
            this.oTechModel.setProperty("/tech/insuranceCompanyTab/selectedInsuranceCompany", selectedInsuranceCompanyName);
            this.oTechModel.setProperty("/tech/insuranceCompanyTab/isNextInsuranceCompanyTableVisible", false);
            this.oTechModel.setProperty("/tech/insuranceCompanyTab/applyButtonText", sApplyButtonTextChange);
            this.oTechModel.setProperty("/tech/insuranceCompanyTab/needConfirmation", true);
            this.oTechModel.setProperty("/tech/insuranceCompanyTab/isApplyButtonVisible", true);
            this.oTechModel.setProperty("/tech/insuranceCompanyTab/changeInsuranceCompanyMessage", "");
            this.oTechModel.setProperty("/tech/insuranceCompanyTab/changeInsuranceCompanyMessageIsPending", false);
        },

        onApplyButton: function () {
            var sApplyButtonTextChangeConfirm = this.oResourceBundle.getText("insuranceCompany.men.exp.applyButtonTextChangeConfirm");
            var sConfirmQuestion = this.oResourceBundle.getText("insuranceCompany.men.exp.confirmQuestion");
            var needConfirmation = this.oTechModel.getProperty("/tech/insuranceCompanyTab/needConfirmation");
            if (needConfirmation) {
                this.oTechModel.setProperty("/tech/insuranceCompanyTab/applyButtonText", sApplyButtonTextChangeConfirm);
                this.oTechModel.setProperty("/tech/insuranceCompanyTab/changeInsuranceCompanyMessage", sConfirmQuestion);
                this.oTechModel.setProperty("/tech/insuranceCompanyTab/changeInsuranceCompanyMessageType", "Error");
                this.oTechModel.setProperty("/tech/insuranceCompanyTab/changeInsuranceCompanyMessageIsPending", false);
                this.oTechModel.setProperty("/tech/insuranceCompanyTab/needConfirmation", false);
            } else {
                var personId = this.oPersonModel.getProperty("/id");
                var selectedInsuranceCompanyAddress = this.oTechModel.getProperty("/tech/insuranceCompanyTab/selectedInsuranceCompanyAddress");
                var operationsModel = this.oOperationsModel;
                var self = this;
                API.setPersonInsuranceCompany(personId, selectedInsuranceCompanyAddress)
                    .then(function(responceOperations) {
                        Utils.appendPendingOperations(operationsModel, responceOperations);
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        console.error("Cannot change insurance company: textStatus = ", textStatus, "error = ", errorThrown);
                        self.oTechModel.setProperty("/tech/insuranceCompanyTab/selectedInsuranceCompany", "");
                        self.oTechModel.setProperty("/tech/insuranceCompanyTab/isNextInsuranceCompanyTableVisible", false);
                        self.oTechModel.setProperty("/tech/insuranceCompanyTab/needConfirmation", true);
                        self.oTechModel.setProperty("/tech/insuranceCompanyTab/isApplyButtonVisible", false);
                        self.oTechModel.setProperty("/tech/insuranceCompanyTab/changeInsuranceCompanyMessage", "");
                        self.oTechModel.setProperty("/tech/insuranceCompanyTab/changeInsuranceCompanyMessageIsPending", false);
                    });
            }
        },

        onLinkPress: function (oEvent) {
            var transactionHash = oEvent.getSource().getProperty("text");
            var langModel = this.getOwnerComponent().getModel("i18n");
            Utils.showMessageBoxTransactionInfo(transactionHash, langModel);
        }
    });
});