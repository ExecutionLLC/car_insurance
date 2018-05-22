/*
	Модуль описывает элементы структуры моделей и константы для приложения
*/
sap.ui.define([
], function () {

    "use strict";

    var oModule = {
        //структуры локальных моделей
        modelStructure: {
            //техническая модель приложения
            tech: {
                selectedKey: "",
                insuranceHistoryTab: {
                    operationsFilteredCount: 0
                },
                insuranceCompanyTab: {
                    selectedInsuranceCompanyAddress: "",
                    selectedInsuranceCompany: "",
                    isSelectButtonEnabled: true,
                    needConfirmation: true,
                    isNextInsuranceCompanyTableVisible: false,
                    applyButtonText: "",
                    isApplyButtonVisible: false,
                    changeInsuranceCompanyMessage: "",
                    changeInsuranceCompanyMessageType: "Error",
                    changeInsuranceCompanyMessageIsPending: false,
                    nextMinTimeForChangeMessage: "",
                    isNextMinTimeForChangeLabelVisible: false,
                    insuranceCompaniesTableData: []
                },
                myPoliciesTab: {
                    isNewPolicyVisible: false,
                    isNextPolicyGroupEnabled: false,
                    isNextPolicyButtonEnabled: false,
                    nextPolicyCarVin: null,
                    nextPolicyDateFrom: null,
                    nextPolicyDateToString: null,
                    nextPolicyPriceString: '?',
                    infoTextState: "Warning",
                    infoText: ""
                },
                myCarsTab: {
                    isNewCarInfoVisible: false,
                    carTypes: [],
                    cars: [],
                    soldCars: []
                }
            }
        }
    };

    return oModule;

}, true);