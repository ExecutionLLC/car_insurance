/*
	Модуль описывает элементы структуры моделей и константы для приложения
*/
sap.ui.define([
    "personal/account/util/Const"
],function(Const){//TODO remove, reformat

    "use strict";

    var oModule={
        //структуры локальных моделей
        modelStructure:{
            //техническая модель приложения
            tech:{
                selectedKey: "",
                insuranceHistoryTab: {//TODO remove
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

},true);