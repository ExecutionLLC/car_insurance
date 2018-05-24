sap.ui.define([
    "sap/ui/core/format/NumberFormat",
    "personal/account/util/Utils",
    "personal/account/util/Const"
], function (NumberFormat, Utils, Const) {
    "use strict";

    function daysDiff(d1, d2) {
        return (d2 - d1) / 1000 / 60 / 60 / 24;
    }

    function getICAddressReliability(icModel, icAddress) {
        var item = Utils.getInsuranceObjectByAddress(icAddress, icModel);
        return item ? item.rating : null;
    }

    function getReliabilityDescription(i18nModel, rating) {
        var oBundle = i18nModel.getResourceBundle();
        var oICRating = Utils.conversionICRating(rating);
        return oBundle.getText("InsuranceReliability." + oICRating.description);
    }

    return {

        /**
         * @description объект для форматирования валюты
         */
        oCurrencyFormat: NumberFormat.getCurrencyInstance(),
        oBonusMalusFormat: NumberFormat.getInstance({maxFractionDigits: 2}),

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
         * @description Форматирование входящих чисел в дату для использования в таблице
         * @param {number} timestamp - число в миллисекундах
         * @return {string} дата в формате "дд.мм.гггг"
         */
        formatDateForTable: function (timestamp) {
            return Utils.dateObjToString(timestamp);
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
            var oComponent = this.getOwnerComponent();
            var icModel = oComponent.getModel("icModel");
            var ratingOfReliability = getICAddressReliability(icModel, icAddress);
            var oICRating = Utils.conversionICRating(ratingOfReliability);
            return oICRating.imageSrc;
        },

        formatReliabilitySpan: function(rating) {
            var oICRating = Utils.conversionICRating(rating);
            var i18nModel = this.getOwnerComponent().getModel("i18n");
            var text = oICRating.symbol + ' (' + getReliabilityDescription(i18nModel, rating) + ')';
            return '<span style="color: ' + oICRating.color + ';">' + text + '</span>';
        },

        formatTableItemPending: function (isPending) {
            return !isPending ? Const.REQUEST_DONE_COLOR : Const.REQUEST_PENDING_COLOR;
        },

        formatNumberOfConfirmations: function(isPending) {
            return !isPending ? Const.DEFAULT_NUMBER_OF_CONFIRMATIONS : 0;
        },

        formatCurrency: function (value, templateCurrency) {
            var formattedValue = this.formatter.oCurrencyFormat.format(value);
            return $.sap.formatMessage(templateCurrency, formattedValue);
        },

        formatBonusMalus: function (value) {
            return this.formatter.oBonusMalusFormat.format(value);
        },

        formatLastInsuranceDateTo: function(templateStr, insurances) {
            var date = Utils.findLastActiveInsuranceDateTo(insurances);
            var dateStr = date ?
                Utils.dateObjToDateString(date) :
                '';
            return $.sap.formatMessage(templateStr, [dateStr]);
        },

        formatLastInsuranceNumber: function(templateStr, insurances) {
            return $.sap.formatMessage(templateStr, [Utils.findLastActiveInsuranceNumber(insurances) || '']);
        },

        formatInsuranceColorStrip: function(insurances) {

            function color(daysDoExpire) {
                if (!daysDoExpire || daysDoExpire <= 0) {
                    return '#bb0000';
                }
                if (daysDoExpire <= 14) {
                    return '#ffcc00';
                }
                return '#2b7d2b';
            }

            var lastInsuranceDataTo = Utils.findLastActiveInsuranceDateTo(insurances);
            var daysToExpire = lastInsuranceDataTo ?
                daysDiff(new Date(), new Date(lastInsuranceDataTo)) :
                -1;

            var bgColor = color(daysToExpire);
            return '<div style="width: 100%; height: 80px; border-right: 14px solid ' + bgColor + ';" />';
        },

        formatOperationsWCount: function(operationsStr, templateStrWCount, operations, filteredOperationsCount) {
            if (operations && operations.length) {
                return $.sap.formatMessage(templateStrWCount, [filteredOperationsCount]);
            } else {
                return operationsStr;
            }
        },

        formatOperationName: function (operationType) {
            var oBundle = this.getOwnerComponent()
                .getModel("i18n")
                .getResourceBundle();
            return oBundle.getText("operationType." + operationType);
        },

        formatCarType: function(carType) {
            var oBundle = this.getOwnerComponent()
                .getModel("i18n")
                .getResourceBundle();
            return oBundle.getText("CarTypes." + carType);
        },

        formatCarTypeImage: function(carType) {
            var carTypeInfo = Const.CAR_TYPES.find(function(typeInfo) {
                return typeInfo.id === carType;
            });
            if (carTypeInfo) {
                return "./image/cars/" + carTypeInfo.icon;
            }
        }
    }

},true);