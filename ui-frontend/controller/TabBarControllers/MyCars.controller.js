sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "personal/account/formatter/formatter"
], function (Controller, formatter) {
    "use strict";

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
        }
    });
});
