sap.ui.define([
    "sap/ui/core/format/NumberFormat",
    "personal/account/util/Utils",
    "personal/account/util/Const"
], function (NumberFormat, Utils, Const) {
    "use strict";
    return {

        /**
         * @description объект для форматирования валюты
         */
        oCurrencyFormat: NumberFormat.getCurrencyInstance(),

        /**
         * @description Форматирование названия кнопки по щелчку, во вкладке "Получить выписку"
         * @param {boolean] isShowHideButtonPressed - нажата ли кнопка
         * @return {string} Показать или Спрятать
         */
        formatButtonName: function (isShowHideButtonPressed) {
            var oBundle = this.getOwnerComponent()
                    .getModel("i18n")
                    .getResourceBundle();
            var sHide = oBundle.getText("hideButtonLabel");
            var sShow = oBundle.getText("showButtonLabel");
            return isShowHideButtonPressed ? sHide : sShow
        },

        /**
         * @description Форматирование адреса НПФ в имя
         * @param {string} npfAddress - адрес нпф
         * @return {string} - имя
         */
        formatNpfAddressToName: function (npfAddress) {
            var oComponent = this.getOwnerComponent();
            var oModel = oComponent.getModel("npfModel");
            var item = Utils.getNpfObjectByAddress(npfAddress, oModel);

            return item ? item.name : "?";
        },
        /**
         * @description Форматирование адреса НПФ в рейтинг надежности
         * @param {string} npfAddress - адрес НПФ
         * @return {string} - надежность
         */
        formatNpfAddressToReliability: function (npfAddress) {
            var oComponent = this.getOwnerComponent();
            var oModel = oComponent.getModel("npfModel");
            var item = Utils.getNpfObjectByAddress(npfAddress, oModel);

            return item ? item.ratingOfReliability : "?";
        },

        /**
         * @description Форматирование входящего чисела миллисекнд в дату для использования в диаграмме
         * @param {number} timestamp - число в миллисекундах
         * @return {string} - строка в формате "мм.гггг"
         */
        formatDate: function (timestamp) {
            var result = Utils.timestampToString(timestamp);
            return result.split(".").slice(1).join(".");
        },

        /**
         * @description Форматирование входящих чисел в дату для использования в таблице
         * @param {number} timestamp - число в миллисекундах
         * @return {string} дата в формате "дд.мм.гггг"
         */
        formatDateForTable: function (timestamp) {
            return Utils.timestampToString(timestamp);
        },

        /**
         * @description Форматирование значения зарплаты
         * @param {number} amount - значение выплат
         * @param {number} tariff - тариф
         * @param {string} comment - назначение выплат
         * @param {string} currencyCode - код валюты
         * @return {number} - искомая зарплата с кодом валюты
         */
        formatAmountToSalary: function (amount, tariff, comment, currencyCode) {
            if (/.*(процент)|(Interest).*/.test(comment)) {
                return "";
            }
            var salary = amount/tariff*100.0;
            return this.formatter.oCurrencyFormat.format(salary, currencyCode);
        },

        /**
         * @description Форматирование рядов в таблице возможных НПФ для вкладки "Смена НПФ" (не отображает текущий НПФ в таблице выбора)
         * @param npfAddress - адреса НПФ
         * @param currentNpfAddress - текущий адрес
         */
        formatColumnListItem: function (npfAddress, currentNpfAddress) {
            if (!npfAddress || !currentNpfAddress) {
                return true;
            }

            return npfAddress.toUpperCase() !== currentNpfAddress.toUpperCase();
        },

        /**
         * @description Форматирование НПФ рейтинга в символ
         * @param npfAddress - адрес НПФ
         * @return oNpfRating.symbol - символ
         */
        formatNpfRating: function (npfAddress) {
            var ratingOfReliability = this.formatter.formatNpfAddressToReliability.call(this,npfAddress);
            var oNpfRating = Utils.conversionNpfRating(ratingOfReliability);
            return oNpfRating.symbol;
        },

        /**
         * @description Форматирование НПФ рейтинга в соответствующую картинку
         * @param {string} npfAddress - адрес НПФ
         * @return {string} oNpfRating.imageSrc - картинка
         */
        formatNpfRatingToImage: function (npfAddress) {
            var ratingOfReliability = this.formatter.formatNpfAddressToReliability.call(this,npfAddress);
            var oNpfRating = Utils.conversionNpfRating(ratingOfReliability);
            return oNpfRating.imageSrc;
        },

        /**
         * @description Форматирование цвета статуса смены состояния
         * @param {boolean} isFinished - закрончена ли операция
         * @return {string} - цвет
         */
        formatTableItemStatus: function (isFinished) {
            return isFinished ? Const.REQUEST_DONE_COLOR : Const.REQUEST_PENDING_COLOR;
        },

        /**
         * @description Вывод числа подтверждений
         * @param {boolean} isFinished - выполнение запроса
         * @return {number} - номер
         */
        formatNumberOfConformations: function(isFinished) {
            return isFinished ? Const.DEFAULT_NUMBER_OF_CONFORMATIONS : 0;
        },

        formatCurrency: function (value, currencyStr) {
            var formattedValue = this.formatter.oCurrencyFormat.format(value);
            return formattedValue + " " + currencyStr;
        }
    }

},true);