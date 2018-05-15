sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "personal/account/formatter/formatter",
    "personal/account/util/Const",
    "personal/account/util/Utils",
    "personal/account/util/API"
], function (Controller, formatter, Const, Utils, API) {
    "use strict";

    function appendPendingOperation(operationsModel, operation) {
        var modelOperations = operationsModel.getData();
        var operationsArray = modelOperations.length ?
            modelOperations :
            [];
        var pendingOperation = Object.assign({}, operation, {pending: true});
        var newOperations = operationsArray.concat(pendingOperation);
        operationsModel.setData(newOperations);
    }

    return Controller.extend("personal.account.controller.TabBarControllers.InsuranceCompany", {
        formatter: formatter,

        onInit: function () {
            this.oComponent = this.getOwnerComponent();
            this.oTechModel = this.oComponent.getModel("techModel");
            this.oMainModel = this.oComponent.getModel("mainModel");
            this.oPersonModel = this.oComponent.getModel("personModel");
            this.oOperationsModel = this.oComponent.getModel("operationsModel");
            this.enableSelectButtonTimerId = null;
            this.oResourceBundle = this.oComponent.getModel("i18n").getResourceBundle();


            var mainModelBinding = new sap.ui.model.Binding(
                this.oMainModel, "/", this.oMainModel.getContext("/")
            );
            mainModelBinding.attachChange(this.onMainModelChanges.bind(this));

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
            console.log('OPS', this.oOperationsModel.getData()); // TODO handle operations change
        },

        onMainModelChanges: function() {
            var sRequestPendingText = this.oResourceBundle.getText("insuranceCompany.men.exp.requestPendingText");
            var npfHistory = this.oMainModel.getProperty("/npfHistory");
            var pendedNpfChanges = this.oMainModel.getProperty("/pendedNpfChanges");

            var pendedNpfTableData = pendedNpfChanges.map(function (value) {
                return {
                    npf: value.npf,
                    timestamp: value.timestamp,
                    transactionHash: value.transactionHash,
                    isFinished: false
                };
            });
            var historyNpfTableData = npfHistory.map(function (value) {
                return {
                    npf: value.newNpf,
                    timestamp: value.timestamp,
                    transactionHash: value.transactionHash,
                    isFinished: true
                }
            });
            var totalInsuranceCompanyTableData = pendedNpfTableData.concat(historyNpfTableData);
            this.oTechModel.setProperty("/tech/insuranceCompanyTab/insuranceCompaniesTableData", totalInsuranceCompanyTableData);

            if (pendedNpfChanges.length !== 0) {
                this.oTechModel.setProperty("/tech/insuranceCompanyTab/selectedInsuranceCompany", "");
                this.oTechModel.setProperty("/tech/insuranceCompanyTab/isNextInsuranceCompanyTableVisible", false);
                this.oTechModel.setProperty("/tech/insuranceCompanyTab/needConformation", true);
                this.oTechModel.setProperty("/tech/insuranceCompanyTab/isApplyButtonVisible", false);
                this.oTechModel.setProperty("/tech/insuranceCompanyTab/changeInsuranceCompanyMessage", sRequestPendingText);
                this.oTechModel.setProperty("/tech/insuranceCompanyTab/changeInsuranceCompanyMessageType", "Warning");
            } else {
                var changeInsuranceCompanyMessage = this.oTechModel.getProperty("/tech/insuranceCompanyTab/changeInsuranceCompanyMessage");
                // FIXME
                if (changeInsuranceCompanyMessage === sRequestPendingText) {
                    this.oTechModel.setProperty("/tech/insuranceCompanyTab/changeInsuranceCompanyMessage", "");
                }
            }

            var nextMinTimeForChanges = null;
            if (pendedNpfChanges.length !== 0) {
                var lastItem = pendedNpfChanges[pendedNpfChanges.length - 1];
                nextMinTimeForChanges = lastItem.timestamp + Const.TIME_NEXT_CHANGE_NPF;
            } else if (npfHistory.length !== 0) {
                var lastItem = npfHistory[npfHistory.length - 1];
                nextMinTimeForChanges = lastItem.timestamp + Const.TIME_NEXT_CHANGE_NPF;
            }

            var currentTime = +new Date();
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
            this.oTechModel.setProperty("/tech/insuranceCompanyTab/needConformation", true);
            this.oTechModel.setProperty("/tech/insuranceCompanyTab/isApplyButtonVisible", true);
            this.oTechModel.setProperty("/tech/insuranceCompanyTab/changeInsuranceCompanyMessage", "");
        },

        onApplyButton: function () {
            var sApplyButtonTextChangeConfirm = this.oResourceBundle.getText("insuranceCompany.men.exp.applyButtonTextChangeConfirm");
            var sConfirmQuestion = this.oResourceBundle.getText("insuranceCompany.men.exp.confirmQuestion");
            var needConformation = this.oTechModel.getProperty("/tech/insuranceCompanyTab/needConformation");
            if (needConformation) {
                this.oTechModel.setProperty("/tech/insuranceCompanyTab/applyButtonText", sApplyButtonTextChangeConfirm);
                this.oTechModel.setProperty("/tech/insuranceCompanyTab/changeInsuranceCompanyMessage", sConfirmQuestion);
                this.oTechModel.setProperty("/tech/insuranceCompanyTab/changeInsuranceCompanyMessageType", "Error");
                this.oTechModel.setProperty("/tech/insuranceCompanyTab/needConformation", false);
            } else {
                var personId = this.oPersonModel.getProperty("/id");
                var selectedInsuranceCompanyAddress = this.oTechModel.getProperty("/tech/insuranceCompanyTab/selectedInsuranceCompanyAddress");
                var operationsModel = this.oOperationsModel;
                var oldInsuranceCompaneId = this.oPersonModel.getProperty("/insuranceCompanyId");
                API.setPersonInsuranceCompany(personId, selectedInsuranceCompanyAddress)
                    .then(function(resp) {
                        console.log('resp', resp); // TODO handle result

                        appendPendingOperation(operationsModel, {
                            timestamp: '' + new Date(),
                            operationType: Const.OPERATION_TYPE.INSURANCE_COMPANY_CHANGED,
                            contragent: null,
                            carVin: null,
                            insuranceNumber: null,
                            ownerId: personId,
                            operationData: {
                                oldId: oldInsuranceCompaneId,
                                newId: selectedInsuranceCompanyAddress
                            }
                        });
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