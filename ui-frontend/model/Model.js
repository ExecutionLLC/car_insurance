/*
	Модуль описывает элементы структуры моделей и константы для приложения
*/
sap.ui.define([
    "personal/account/util/Const"
],function(Const){

    "use strict";

    var oModule={
        //структуры локальных моделей
        modelStructure:{
            //техническая модель приложения
            tech:{
                selectedKey: "",
                getReportTab: {
                    isShowHideButtonPressed: false,
                    isShowHideButtonEnabled: false,
                    dateFrom: "?",
                    dateTo: "?",
                    AmountIncome: 0,
                    AmountOutgoing: 0,
                    AmountDifference: 0,
                    operationsTableData: []
                },
                changeTariffTab: {
                    selectedTariff: 6,
                    changeTariffMessage: "",
                    isButtonChangeTariffEnabled: false,
                    isSliderChangeTariffEnabled: false,
                    tariffTableData: []
                },
                changeNpfTab: {
                    selectedNpfAddress:"",
                    selectedNpf: "",
                    isSelectButtonEnabled: true,
                    isSelectedNpfLabelVisible: false,
                    needConformation: true,
                    isNextNpfTableVisible: false,
                    applyButtonText: "",
                    isApplyButtonVisible: false,
                    changeNpfMessage: "",
                    changeNpfMessageType: "Error",
                    nextMinTimeForChangeMessage: "",
                    isNextMinTimeForChangeLabelVisible: false,
                    npfTableData: []
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
                }
            }
        }
    };

    return oModule;

},true);