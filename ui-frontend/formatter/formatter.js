sap.ui.define([
    "sap/ui/core/format/NumberFormat",
    "personal/account/util/Utils",
    "personal/account/util/Const"
], function (NumberFormat, Utils, Const) {
    "use strict";

    function findLastInsurance(insurances) {
        return insurances.reduce(
            function(lastInsurance, insurance) {
                if (!lastInsurance) {
                    return insurance;
                }
                return lastInsurance.dateTo > insurance.dateTo ?
                    lastInsurance :
                    insurance;
            },
            null
        );
    }

    function findLastInsuranceDateTo(insurances) {
        if (!insurances) {
            return null;
        }
        var lastInsurance = findLastInsurance(insurances);
        if (!lastInsurance) {
            return null;
        }
        return new Date(lastInsurance.dateTo);
    }

    function monthDiff(d1, d2) {
        if (d2 < d1) {
            return -1;
        }
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth() + 1;
        months += d2.getMonth();
        return months <= 0 ? 0 : months;
    }

    return {

        /**
         * @description объект для форматирования валюты
         */
        oCurrencyFormat: NumberFormat.getCurrencyInstance(),

        /**
         * @description Форматирование адреса страховой компании в имя
         * @param {string} icAddress - адрес с.к.
         * @return {string} - имя
         */
        formatICAddressToName: function (icAddress) {
            var oComponent = this.getOwnerComponent();
            var oModel = oComponent.getModel("icModel");
            var item = Utils.getInsuranceObjectByAddress(icAddress, oModel);
            return item ? item.name : "?";
        },

        /**
         * @description Форматирование адреса с.к. в рейтинг надежности
         * @param {string} icAddress - адрес с.к.
         * @return {string} надежность
         */
        formatICAddressToReliability: function (icAddress) {
            var oComponent = this.getOwnerComponent();
            var oModel = oComponent.getModel("icModel");
            var item = Utils.getInsuranceObjectByAddress(icAddress, oModel);
            return item ? item.rating : null;
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
         * @description Форматирование рядов в таблице возможных с.к. для вкладки "Смена с.к." (не отображает текущий с.к. в таблице выбора)
         * @param icAddress - адреса с.к.
         * @param currentICAddress - текущий адрес
         */
        formatICColumnListItem: function (icAddress, currentICAddress) {
            if (!icAddress || !currentICAddress) {
                return true;
            }

            return icAddress !== currentICAddress;
        },

        /**
         * @description Форматирование рейтинга с.к. в соответствующую картинку
         * @param {string} icAddress - адрес с.к.
         * @return {string} oICRating.imageSrc - картинка
         */
        formatICAddressToReliabilityImage: function (icAddress) {
            var ratingOfReliability = this.formatter.formatICAddressToReliability.call(this, icAddress);
            var oICRating = Utils.conversionICRating(ratingOfReliability);
            return oICRating.imageSrc;
        },

        /**
         * @description Форматирование рейтинга с.к. в соответствующую картинку
         * @param {string} icAddress - адрес с.к.
         * @return {string} oICRating.imageSrc - картинка
         */
        formatICAddressToReliabilityString: function (icAddress) {
            var ratingOfReliability = this.formatter.formatICAddressToReliability.call(this, icAddress);
            var oICRating = Utils.conversionICRating(ratingOfReliability);
            return oICRating.description + ' (' + oICRating.symbol + ')';
        },

        formatTableItemPending: function (isPending) {
            return !isPending ? Const.REQUEST_DONE_COLOR : Const.REQUEST_PENDING_COLOR;
        },

        formatNumberOfConfirmations: function(isPending) {
            return !isPending ? Const.DEFAULT_NUMBER_OF_CONFIRMATIONS : 0;
        },

        formatCurrency: function (value, currencyStr) {
            var formattedValue = this.formatter.oCurrencyFormat.format(value);
            return formattedValue + " " + currencyStr;
        },

        formatLastInsuranceDateTo: function(insurances) {
            var date = findLastInsuranceDateTo(insurances);
            if (!date) {
                return '';
            }
            return date.toLocaleDateString(
                sap.ui.getCore().getConfiguration().getLanguage().slice(0, 2)
            );
        },

        formatInsuranceColorStrip: function(insurances) {

            function color(monthsDoExpire) {
                if (!monthsDoExpire || monthsDoExpire <= 1) {
                    return 'red';
                }
                if (monthsDoExpire <= 3) {
                    return 'yellow';
                }
                return 'green';
            }

            var lastInsuranceDataTo = findLastInsuranceDateTo(insurances);
            var monthsToExpire = lastInsuranceDataTo ?
                monthDiff(new Date(), new Date(lastInsuranceDataTo)) :
                -1;

            var bgColor = color(monthsToExpire);
            return '<div style="width: 20px; height: 100px; background: ' + bgColor + ';" />';
        },

        formatOperationName: function (operationType) {
            var oBundle = this.getOwnerComponent()
                .getModel("i18n")
                .getResourceBundle();
            return oBundle.getText("operationType." + operationType);
        }
    }

},true);