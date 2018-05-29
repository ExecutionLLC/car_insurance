sap.ui.define([
    "sap/ui/core/format/NumberFormat",
    "personal/account/util/Utils",
    "personal/account/util/Const"
], function (NumberFormat, Utils, Const) {
    "use strict";

    function getICAddressReliability(icModel, icAddress) {
        var item = Utils.getInsuranceObjectByAddress(icAddress, icModel);
        return item ? item.rating : null;
    }

    function getReliabilityDescription(i18nModel, rating) {
        var oBundle = i18nModel.getResourceBundle();
        var oICRating = Utils.conversionICRating(rating);
        return oBundle.getText("InsuranceReliability." + oICRating.description);
    }

    function expirationClass(expirationType) {
        if (expirationType === Const.INSURANCE_EXPIRATION.EXPIRED) {
            return "expired";
        }
        if (expirationType === Const.INSURANCE_EXPIRATION.SOON) {
            return "soon";
        }
        return "ok";
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
            var oComponent = this.getOwnerComponent();
            var icModel = oComponent.getModel("icModel");
            var ratingOfReliability = getICAddressReliability(icModel, icAddress);
            var oICRating = Utils.conversionICRating(ratingOfReliability);
            return oICRating.imageSrc;
        },

        formatCarHeaderExpirationColorPrefix: function(insurances) {

            var expirationType = Utils.calcInsuranceExpirationType(insurances);

            /**
             * Dirty hack: place this element before that one what must be stylized
             * because there's no simple way to set element's class
             * See styles, '.car-header-expiration' selector
             */

            return '<span class="car-header-expiration ' + expirationClass(expirationType) + '" />';
        },

        formatInsuranceExpirationColorPrefix: function(dateTo) {

            var expirationType = Utils.calcInsuranceDateToExpirationType(dateTo);

            /**
             * Dirty hack: same as formatCarHeaderExpirationColorPrefix
             */

            return '<span class="insurance-header-expiration ' + expirationClass(expirationType) + '" />';
        },

        formatReliabilityText: function(rating) {
            var oICRating = Utils.conversionICRating(rating);
            var i18nModel = this.getOwnerComponent().getModel("i18n");
            return oICRating.symbol + ' (' + getReliabilityDescription(i18nModel, rating) + ')';
        },

        formatReliabilityColor: function(rating) {
            var oICRating = Utils.conversionICRating(rating);
            return oICRating.color;
        },

        formatTableItemPending: function (isPending) {
            return !isPending ? Const.REQUEST_DONE_COLOR : Const.REQUEST_PENDING_COLOR;
        },

        formatNumberOfConfirmations: function(isPending) {
            return !isPending ? Const.DEFAULT_NUMBER_OF_CONFIRMATIONS : 0;
        },

        formatCurrency: function (value, templateCurrency) {
            var formattedValue = this.formatter.oCurrencyFormat.format(value);
            return $.sap.formatMessage(templateCurrency, [formattedValue]);
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

        formatOperationsWCount: function(operationsStr, templateStrWCount, operations, filteredOperationsCount) {
            if (operations && operations.length) {
                return $.sap.formatMessage(templateStrWCount, [filteredOperationsCount]);
            } else {
                return operationsStr;
            }
        },

        formatOperationText: function (operation) {
            var operationType = operation.operationType;
            var operationData = operation.operationData;
            var oBundle = this.getOwnerComponent()
                .getModel("i18n")
                .getResourceBundle();

            function formatStr(strId, params) {
                return Utils.i18nFormatStr(oBundle, strId, params);
            }

            switch (operationType) {
                case Const.OPERATION_TYPE.CAR_ADDED:
                    var carModel = operationData.model || "?";
                    return formatStr('Operations.buyCar', [carModel]);
                case Const.OPERATION_TYPE.CAR_DELETED:
                    var carModel = operationData.model || "?";
                    return formatStr('Operations.sellCar', [carModel]);
                case Const.OPERATION_TYPE.INSURANCE_ADDED:
                    var oPersonModel = this.getOwnerComponent().getModel("personModel");
                    var car = Utils.getCarByVin(oPersonModel, operationData.carVin);
                    var carModel = car ? car.model : "?";
                    var priceString = operationData.price ? operationData.price.toFixed(2) : "?";
                    return formatStr(
                        'Operations.insuranceContraction',
                        [operationData.insuranceNumber, carModel, priceString]
                    );
                case Const.OPERATION_TYPE.INSURANCE_DEACTIVATED:
                    var oPersonModel = this.getOwnerComponent().getModel("personModel");
                    var car = Utils.getCarByVin(oPersonModel, operationData.carVin);
                    var carModel = car ? car.model : "?";
                    var refundString = operationData.refund != undefined ? operationData.refund.toFixed(2) : "?";
                    if (operationData.deactivationReason === Const.OPERATION_TYPE.CAR_DELETED) {
                        return formatStr(
                            'Operations.insuranceAvoidationDueCarSell',
                            [operationData.insuranceNumber, carModel, refundString]
                        );
                    } else if (operationData.deactivationReason === Const.OPERATION_TYPE.INSURANCE_COMPANY_CHANGED) {
                        return formatStr(
                            'Operations.insuranceAvoidationDueCompanyChange',
                            [operationData.insuranceNumber, carModel, refundString]
                        );
                    } else {
                        return formatStr(
                            'Operations.insuranceAvoidation',
                            [operationData.insuranceNumber, carModel, refundString]
                        );
                    }
                case Const.OPERATION_TYPE.INSURANCE_COMPANY_CHANGED:
                    var oInsuranceCompaniesModel = this.getOwnerComponent().getModel("icModel");
                    var oldCompany = Utils.getInsuranceCompanyById(oInsuranceCompaniesModel, operationData.oldId);
                    var oldCompanyName = oldCompany && oldCompany.name || "?";
                    var newCompany = Utils.getInsuranceCompanyById(oInsuranceCompaniesModel, operationData.newId);
                    var newCompanyName = oldCompany && newCompany.name || "?";
                    return formatStr(
                        'Operations.insuranceCompanyChange',
                        [oldCompanyName, newCompanyName]
                    );
                case Const.OPERATION_TYPE.BASE_PRICE_CHANGED:
                    return formatStr(
                        'Operations.basePriceChange',
                        [operationData.oldBasePrice, operationData.newBasePrice]
                    );
                case Const.OPERATION_TYPE.BONUS_MALUS_CHANGED:
                    var bonusMalusCoefficient = operationData.newBonusMalus;
                    var bonusMalusClass = Utils.getBonusMalusClassByCoefficient(bonusMalusCoefficient);
                    return formatStr(
                        'Operations.bonusMalusChange',
                        [bonusMalusClass, bonusMalusCoefficient]
                    );
                case Const.OPERATION_TYPE.TRAFFIC_ACCIDENT:
                    var model = operationData.model;
                    var payout = operationData.payout;
                    return formatStr(
                        'Operations.trafficAccident',
                        [model, payout]
                    );
            }

            return "?";
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
        },

        formatCarBuyDate: function(templateStr, operations) {
            var lastBuyOperation = Utils.findLastOperation(operations, Const.OPERATION_TYPE.CAR_ADDED);
            var dateStr = lastBuyOperation ?
                Utils.dateObjToString(lastBuyOperation.timestamp) :
                '';
            return $.sap.formatMessage(templateStr, [dateStr]);
        },

        formatCarSaleDate: function(templateStr, operations) {
            var lastSellOperation = Utils.findLastOperation(operations, Const.OPERATION_TYPE.CAR_DELETED);
            var dateStr = lastSellOperation ?
                Utils.dateObjToString(lastSellOperation.timestamp) :
                '';
            return $.sap.formatMessage(templateStr, [dateStr]);
        }
    }

},true);