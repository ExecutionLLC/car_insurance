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
            return this.formatter.formatReliabilityDescription.call(this, ratingOfReliability) + ' (' + oICRating.symbol + ')';
        },

        formatReliabilityDescription: function(rating) {
            var oBundle = this.getOwnerComponent()
                .getModel("i18n")
                .getResourceBundle();
            var oICRating = Utils.conversionICRating(rating);
            return oBundle.getText("InsuranceReliability." + oICRating.description);
        },

        formatCarHeaderExpirationColorPrefix: function(insurances) {

            function expirationClass(expirationType) {
                if (expirationType === Const.INSURANCE_EXPIRATION.EXPIRED) {
                    return "expired";
                }
                if (expirationType === Const.INSURANCE_EXPIRATION.SOON) {
                    return "soon";
                }
                return "ok";
            }

            var expirationType = Utils.calcInsuranceExpirationType(insurances);
            return '<span class="car-header-expiration ' + expirationClass(expirationType) + '" />';
        },

        formatReliabilitySpan: function(rating) {
            var oICRating = Utils.conversionICRating(rating);
            var text = oICRating.symbol + ' (' + this.formatter.formatReliabilityDescription.call(this, rating) + ')';
            return '<span style="color: ' + oICRating.color + ';">' + text + '</span>';
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

        formatBonusMalus: function (value) {
            return this.formatter.oBonusMalusFormat.format(value);
        },

        formatLastInsuranceDateTo: function(insurances) {
            var date = Utils.findLastActiveInsuranceDateTo(insurances);
            if (!date) {
                return '';
            }
            return Utils.dateObjToDateString(date);
        },

        formatLastInsuranceNumber: function(insurances) {
            return Utils.findLastActiveInsuranceNumber(insurances) || '';
        },

        formatInsuranceColorStrip: function(insurances) {

            function expirationClass(expirationType) {
                if (expirationType === Const.INSURANCE_EXPIRATION.EXPIRED) {
                    return "expired";
                }
                if (expirationType === Const.INSURANCE_EXPIRATION.SOON) {
                    return "soon";
                }
                return "ok";
            }

            var expirationType = Utils.calcInsuranceExpirationType(insurances);
            return '<div class="profile-car-expiration ' + expirationClass(expirationType) + '" />';
        },

        formatOperationsWCount: function(operations, filteredOperationsCount) {
            var oBundle = this.getOwnerComponent()
                .getModel("i18n")
                .getResourceBundle();
            var countStr = operations && operations.length ?
                " (" + filteredOperationsCount + ")" :
                "";
            return oBundle.getText("operations") + countStr;
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