sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "personal/account/formatter/formatter",
    "personal/account/util/API",
    "personal/account/util/Utils"
], function (Controller, MessageBox, formatter, API, Utils) {
    "use strict";

    function appendCar(personModel, carInfo) {
        var modelCars = personModel.getProperty("/cars") || [];
        var newCars = modelCars.concat([carInfo]);
        personModel.setProperty("/cars", newCars);
    }

    return Controller.extend("personal.account.controller.TabBarControllers.MyCars", {
        formatter: formatter,

        onInit: function () {
            this.oComponent = this.getOwnerComponent();
            this.oTechModel = this.oComponent.getModel("techModel");
            this.oPersonModel = this.oComponent.getModel("personModel");
            this.oOperationsModel = this.oComponent.getModel("operationsModel");

            var operationsModelBinding = new sap.ui.model.Binding(
                this.oOperationsModel, "/", this.oOperationsModel.getContext("/")
            );
            operationsModelBinding.attachChange(this.onModelChanges.bind(this));
            var personModelBinding = new sap.ui.model.Binding(
                this.oPersonModel, "/", this.oPersonModel.getContext("/")
            );
            personModelBinding.attachChange(this.onModelChanges.bind(this));
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
        },

        onAddCar: function() {
            var isNewCarInfoVisible = !this.oTechModel.getProperty("/tech/myCarsTab/isNewCarInfoVisible");
            this.oTechModel.setProperty("/tech/myCarsTab/isNewCarInfoVisible", isNewCarInfoVisible);
        },

        onAddSelectedCar: function() {

            var oView = this.getView();
            var operationsModel = this.oOperationsModel;
            var techModel = this.oTechModel;
            var personModel = this.oPersonModel;

            var sErrorText = this.getOwnerComponent().getModel("i18n")
                .getResourceBundle()
                .getText("msg.box.error");

            function getInputText(inputId) {
                var oInput = oView.byId(inputId);
                if (oInput) {
                    return oInput.getValue();
                }
            }

            var carInfo = {
                vin: getInputText("vinInput"),
                vehicleType: getInputText("typeInput"),
                model: getInputText("modelInput"),
                maxPower: getInputText("powerInput"),
                year: getInputText("yearInput"),
                numberPlate: getInputText("numberPlateInput")
            };

            var personId = personModel.getProperty("/id");

            API.addPersonCar(personId, carInfo)
                .then(function(addCarOperations) {
                    appendCar(personModel, carInfo);
                    Utils.appendPendingOperations(operationsModel, addCarOperations);
                    techModel.setProperty("/tech/myCarsTab/isNewCarInfoVisible", false);
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    console.error("Cannot add car: textStatus = ", textStatus, "error = ", errorThrown);
                    MessageBox.error(sErrorText);
                });
        },

        onSellCar: function() {
        },

        onLinkPress: function (oEvent) {
            var transactionHash = oEvent.getSource().getProperty("text");
            var langModel = this.getOwnerComponent().getModel("i18n");
            Utils.showMessageBoxTransactionInfo(transactionHash, langModel);
        }
    });
});
