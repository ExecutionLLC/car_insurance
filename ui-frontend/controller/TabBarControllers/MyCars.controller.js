sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/SimpleType",
    'sap/ui/model/ValidateException',
    "personal/account/formatter/formatter",
    "personal/account/util/API",
    "personal/account/util/Utils",
    'sap/ui/model/json/JSONModel',
    "personal/account/util/Const"
], function (Controller, MessageBox, SimpleType, ValidateException, formatter, API, Utils, JSONModel, Const) {
    "use strict";

    function appendCar(personModel, carInfo) {
        var modelCars = personModel.getProperty("/cars") || [];
        var newCars = modelCars.concat([carInfo]);
        personModel.setProperty("/cars", newCars);
    }

    function moveToSoldCar(personModel, carVin) {
        var modelCars = personModel.getProperty("/cars") || [];
        var modelSoldCars = personModel.getProperty("/soldCars") || [];
        var foundCarIndex = modelCars.findIndex(function(car) {
            return car.vin === carVin;
        });
        if (foundCarIndex < 0) {
            return;
        }
        var foundCars = modelCars.splice(foundCarIndex, 1);
        var newSoldCars = foundCars.concat(modelSoldCars);
        personModel.setProperty("/cars", modelCars);
        personModel.setProperty("/soldCars", newSoldCars);
    }

    var emptyCarInfo = {
        vin: "",
        model: "",
        vehicleType: Const.CAR_TYPES[0].id,
        numberPlate: "",
        maxPower: "",
        year: ""
    };

    var inputIds = [
        "vinInput",
        "typeInput",
        "modelInput",
        "powerInput",
        "yearInput",
        "numberPlateInput"
    ];

    var buttonId = "addSelectedCar";

    function checkValidation(oView, ids) {
        var allValid = true;
        $.each(ids, function (i, inputId) {
            var oInput = oView.byId(inputId);
            var oBinding = oInput.getBinding("value");
            if (oBinding) {
                var oType = oBinding.getType();
                if (!oType) {
                    oInput.setValueState("Success");
                } else {
                    var isValid = oType.validateValue(oInput.getValue());
                    if (isValid) {
                        oInput.setValueState("Success");
                    } else {
                        oInput.setValueState("Error");
                        allValid = false;
                    }
                }
            }
        });
        return allValid;
    }

    function transformFocusInfo(focusInfo, index, delta) {
        if (focusInfo.cursorPos > index) {
            focusInfo.cursorPos += delta;
        }
        if (focusInfo.selectionStart > index) {
            focusInfo.selectionStart += delta;
        }
        if (focusInfo.selectionEnd > index) {
            focusInfo.selectionEnd += delta;
        }
    }

    function filterInput(oInput, transform) {
        var focusInfo = oInput.getFocusInfo();
        var value = oInput.getValue();

        var newValueChars = [];
        var valueChars = value.split('');
        valueChars.forEach(function(chr, index) {
            var newChr = transform(chr) || '';
            var delta = newChr.length - chr.length;
            transformFocusInfo(focusInfo, index, delta);
            newValueChars.push(newChr);
        });

        oInput.setValue(newValueChars.join(''));
        oInput.applyFocusInfo(focusInfo);
    }

    return Controller.extend("personal.account.controller.TabBarControllers.MyCars", {
        formatter: formatter,

        onInit: function () {
            var oView = this.getView();
            oView.setModel(new JSONModel({
                carInfo: Object.assign({}, emptyCarInfo),
                vinHash: Object.create(null)
            }));
            this.validate();
            this.oComponent = this.getOwnerComponent();
            this.oTechModel = this.oComponent.getModel("techModel");
            this.oPersonModel = this.oComponent.getModel("personModel");
            this.oOperationsModel = this.oComponent.getModel("operationsModel");

            this.oTechModel.setProperty(
                "/tech/myCarsTab/carTypes",
                Const.CAR_TYPES
            );

            var operationsModelBinding = new sap.ui.model.Binding(
                this.oOperationsModel, "/", this.oOperationsModel.getContext("/")
            );
            operationsModelBinding.attachChange(this.onModelChanges.bind(this));
            var personModelBinding = new sap.ui.model.Binding(
                this.oPersonModel, "/", this.oPersonModel.getContext("/")
            );
            personModelBinding.attachChange(this.onModelChanges.bind(this));
            var thisModelBinding = new sap.ui.model.Binding(
                oView.getModel(), "/", oView.getModel().getContext("/")
            );
            thisModelBinding.attachChange(this.onThisModelChanges.bind(this));
        },

        onThisModelChanges: function() {
            this.validate();
        },

        onModelChanges: function() {
            var modelCars = this.oPersonModel.getProperty("/cars") || [];
            var modelSoldCars = this.oPersonModel.getProperty("/soldCars") || [];
            var modelOperations = this.oOperationsModel.getData();
            var operations = modelOperations.length ? modelOperations : [];

            function getOperationsForVIN(operations, vin) {
                return operations.filter(function (operation) {
                    return operation.carVin === vin;
                });
            }

            function fillCarsWithOperations(cars, operations) {
                return cars.map(function (car) {
                    return Object.assign(
                        {},
                        car,
                        {
                            operations: getOperationsForVIN(operations, car.vin)
                        }
                    );
                });
            }

            this.oTechModel.setProperty("/tech/myCarsTab/cars", fillCarsWithOperations(modelCars, operations));
            this.oTechModel.setProperty("/tech/myCarsTab/soldCars", fillCarsWithOperations(modelSoldCars, operations));

            var vinHash = modelCars.reduce(
                function(hash, car) {
                    hash[car.vin] = car;
                    return hash;
                },
                Object.create(null)
            );
            this.getView().getModel().setProperty("/vinHash", vinHash);
        },

        onAddCar: function() {
            var isNewCarInfoVisible = !this.oTechModel.getProperty("/tech/myCarsTab/isNewCarInfoVisible");
            this.oTechModel.setProperty("/tech/myCarsTab/isNewCarInfoVisible", isNewCarInfoVisible);
        },

        customVINType: SimpleType.extend("text", {
            formatValue: function (oValue) {
                return oValue;
            },
            parseValue: function (oValue) {
                return oValue;
            },
            validateValue: function (oValue) {
                return !!oValue.length;
            }
        }),

        customNonemptyType: SimpleType.extend("text", {
            formatValue: function (oValue) {
                return oValue;
            },
            parseValue: function (oValue) {
                return oValue;
            },
            validateValue: function (oValue) {
                return !!oValue.length;
            }
        }),

        onCapitalizeInputLiveChange: function(event) {
            var oElement = event.getSource();
            filterInput(oElement, function(chr) {
                if (!/[a-z0-9]/i.test(chr)) {
                    return '';
                }
                return chr.toUpperCase();
            });
        },

        onDigitsInputLiveChange: function(event) {
            var oElement = event.getSource();
            filterInput(oElement, function(chr) {
                if (!/\d/i.test(chr)) {
                    return '';
                }
                return chr.toUpperCase();
            });
        },

        validate: function() {
            var oButton = this.getView().byId(buttonId);
            var oView = this.getView();
            var allValid = checkValidation(oView, inputIds);
            if (!allValid) {
                oButton.setEnabled(false);
                return false;
            }
            var vinHash = oView.getModel().getProperty("/vinHash");
            var carInfo = oView.getModel().getProperty("/carInfo");
            if (vinHash[carInfo.vin]) {
                oView.byId("vinInput").setValueState("Error");
                oButton.setEnabled(false);
                return false;
            }
            oButton.setEnabled(true);
            return true;
        },

        onAddSelectedCar: function() {
            if (!this.validate()) {
                return;
            }

            var oView = this.getView();
            var operationsModel = this.oOperationsModel;
            var techModel = this.oTechModel;
            var personModel = this.oPersonModel;

            var sErrorText = this.getOwnerComponent().getModel("i18n")
                .getResourceBundle()
                .getText("msg.box.error");
            var carInfo = oView.getModel().getProperty("/carInfo");
            var personId = personModel.getProperty("/id");
            var self = this;
            API.addPersonCar(personId, carInfo)
                .then(function(addCarOperations) {
                    appendCar(personModel, carInfo);
                    Utils.appendPendingOperations(operationsModel, addCarOperations);
                    techModel.setProperty("/tech/myCarsTab/isNewCarInfoVisible", false);
                    oView.getModel().setProperty("/carInfo", Object.assign({}, emptyCarInfo));
                    self.validate();
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    console.error("Cannot add car: textStatus = ", textStatus, "error = ", errorThrown);
                    MessageBox.error(sErrorText);
                });
        },

        onSellCar: function(oEvent) {
            var sErrorText = this.getOwnerComponent().getModel("i18n")
                .getResourceBundle()
                .getText("msg.box.error");
            var personModel = this.oPersonModel;
            var operationsModel = this.oOperationsModel;
            var personId = personModel.getProperty("/id");
            var vin = oEvent.getSource().data("vin");
            API.salePersonCar(personId, vin)
                .then(function(soldCarOperations) {
                    moveToSoldCar(personModel, vin);
                    Utils.appendPendingOperations(operationsModel, soldCarOperations);
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    console.error("Cannot sale car: textStatus = ", textStatus, "error = ", errorThrown);
                    MessageBox.error(sErrorText);
                });
        },

        onLinkPress: function (oEvent) {
            var transactionHash = oEvent.getSource().getProperty("text");
            var langModel = this.getOwnerComponent().getModel("i18n");
            Utils.showMessageBoxTransactionInfo(transactionHash, langModel);
        }
    });
});
