/*
	Модуль описывает элементы структуры моделей и константы для приложения
*/
sap.ui.define([
],function(){
    "use strict";

    var oModule = {
        BASE_URL: "https://executiona4038b30e.hana.ondemand.com/CarInsurance/car_insurance.xsjs",
        // время, через которое обновляются данные
        ASYNC_UPDATE_TIMEOUT: 10 * 1000,
        // время следующей смены НПФ
        TIME_NEXT_CHANGE_INSURANCE_COMPANY: 120*1000,
        DEFAULT_NUMBER_OF_CONFORMATIONS: 7,
        DEFAULT_NUMBER_OF_CONFIRMATIONS: 7,
        //цвета состояния выполнения запроса
        REQUEST_DONE_COLOR: "green",
        REQUEST_PENDING_COLOR: "#f4d742",
        // язык приложения
        LANG: "ru_RU",
        OPERATION_TYPE: {
            CAR_ADDED: "CAR_ADDED",
            CAR_DELETED: "CAR_DELETED",
            INSURANCE_ADDED: "INSURANCE_ADDED",
            INSURANCE_DEACTIVATED: "INSURANCE_DEACTIVATED",
            INSURANCE_COMPANY_CHANGED: "INSURANCE_COMPANY_CHANGED",
            BASE_PRICE_CHANGED: "BASE_PRICE_CHANGED",
            BONUS_MALUS_CHANGED: "BONUS_MALUS_CHANGED",
            TRAFFIC_ACCIDENT: "TRAFFIC_ACCIDENT",
            CUSTOM: "CUSTOM"
        },
        CAR_TYPES: [
            {
                id: 'CAR',
                icon: 'car.png'
            },
            {
                id: 'MOTORCYCLE',
                icon: 'motorcycle.png'
            }
        ],
        INSURANCE_EXPIRATION: {
            EXPIRED: 'EXPIRED',
            SOON: 'SOON',
            OK: 'OK'
        }
    };

    return oModule;
},true);