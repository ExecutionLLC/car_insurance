sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "personal/account/formatter/formatter",
    "personal/account/util/Const",
    "personal/account/util/Utils"
], function (Controller, formatter, Const, Utils) {
    "use strict";

    var $ = {
        ajax: function(opts) {
            console.log('IC ajax', opts);
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
                    doneF({ "transactionHash": '' + Math.random() });
                    alwaysF();
                },
                1000
            );

            return res;
        }
    };

    return Controller.extend("personal.account.controller.TabBarControllers.InsuranceCompany", {
        formatter: formatter,

        onInit: function () {
            this.oComponent = this.getOwnerComponent();
            this.oTechModel = this.oComponent.getModel("techModel");
            this.oMainModel = this.oComponent.getModel("mainModel");
            this.enableSelectButtonTimerId = null;
            this.oResourceBundle = this.oComponent.getModel("i18n").getResourceBundle();


            var mainModelBinding = new sap.ui.model.Binding(
                this.oMainModel, "/", this.oMainModel.getContext("/")
            );
            mainModelBinding.attachChange(this.onMainModelChanges.bind(this));
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

        onMainModelChanges: function() {
            var sRequestPendingText =this.oResourceBundle.getText("insuranceCompany.men.exp.requestPendingText");
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
                this.oTechModel.setProperty("/tech/insuranceCompanyTab/changeNpfMessageState", "Warning");
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
                var snils = this.oMainModel.getProperty("/metadata/snils");
                var selectedInsuranceCompanyAddress = this.oTechModel.getProperty("/tech/insuranceCompanyTab/selectedInsuranceCompanyAddress");

                $.ajax({
                    url: Utils.getChangeNpfUrl(snils),
                    dataType: "json",
                    type: "PUT",
                    data: JSON.stringify({"npf": selectedInsuranceCompanyAddress}),
                    jsonp: false
                });

                var now = +new Date();
                var pendedNpfChanges = this.oMainModel.getProperty("/pendedNpfChanges");
                // состояние кнопок/лейблов/... следует состоянию модели, все изменения состояния GUI произойдут в onMainModelChanges
                this.oMainModel.setProperty("/pendedNpfChanges", pendedNpfChanges.concat([{
                    npf: selectedInsuranceCompanyAddress,
                    timestamp: now,
                    isFinished: false
                }]));
            }
        },

        onLinkPress: function (oEvent) {
            var transactionHash = oEvent.getSource().getProperty("text");
            var langModel = this.getOwnerComponent().getModel("i18n");
            Utils.showMessageBoxTransactionInfo(transactionHash, langModel);
        }
    });
});