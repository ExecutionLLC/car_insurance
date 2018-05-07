/*
	Модуль описывает элементы структуры моделей и константы для приложения
*/
sap.ui.define([
],function(){
    "use strict";

    var oModule = {
        BASE_URL: "https://executiona4038b30e.hana.ondemand.com/PFR/pfr.xsjs",
        LOGIN_URL: "https://executiona4038b30e.hana.ondemand.com/PFR/simple_login.xsjs",
        // время, через которое обновляются данные
        ASYNC_UPDATE_TIMEOUT: 30 * 1000,
        ASYNC_UPDATE_TIMEOUT_DEFAULT: 60 * 1000,
        // время следующей смены НПФ
        TIME_NEXT_CHANGE_NPF: 120*1000,
        DEFAULT_NUMBER_OF_CONFORMATIONS: 7,
        // значения ключей селекта диаграммы
        SELECTED_LAST_YEAR : "last-year",
        SELECTED_ALL_TIME : "all-time",
        //цвета состояния выполнения запроса
        REQUEST_DONE_COLOR: "green",
        REQUEST_PENDING_COLOR: "#f4d742",
        // язык приложения
        LANG: "ru_RU"
    };

    return oModule;
},true);