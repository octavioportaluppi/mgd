﻿'use strict';
app.controller('signupController', [
    '$scope', '$location', '$timeout', 'authService', 'supplierService',
    function ($scope, $location, $timeout, authService, supplierService) {

    $scope.registration = {};
    $scope.supplier = {};
    $scope.supplierEvents = [];

    $scope.stepsSupplier = [
        { templateUrl: '/app/views/signup-supplier-data.html', hasForm: true },
        { templateUrl: '/app/views/signup-supplier-event.html', hasForm: true },
        { templateUrl: '/app/views/signup-supplier-services.html', hasForm: true },
        { templateUrl: '/app/views/signup-supplier-questions.html', hasForm: true },
        { templateUrl: '/app/views/signup-welcome.html', hasForm: true }
    ];
    
    //Britez
    $scope.saveSupplierData = function (form, callback){
        if(form.$valid && $scope.checkPassword()) {
            if($scope.authentication && $scope.authentication.isAuth) {
                $scope.updateUser(callback);
            } else {
                $scope.createUser(form, callback);
            }
        }
    };

    $scope.updateUser = function(callback){
        supplierService
            .updateSupplierProfile($scope.supplier)
            .then(function () {
                callback();
            })
    };

    $scope.createUser = function(form, callback){
        authService
            .saveRegistration($scope.registration)
            .then(
            function() {
                authService
                    .login($scope.registration, 'supplier')
                    .then(function() {
                        $scope.authentication = authService.authentication;
                        $scope.supplier.OpeningHours = {DayFrom: 0, DayTo: 6, HoursFrom: '12:00', HoursTo:'23:00'};
                        authService
                            .saveSupplier($scope.supplier)
                            .then(function (){
                                callback();
                            })
                    })
            },
            function(error) {
                $scope.errorMessage = error;
                form.$valid = false;
            }
        );
    };

    $scope.getSupplierServices = function (callback) {
        $scope.ServiceTypes = [];
        supplierService
            .getDashboard()
            .then(
                function (data) {
                    $scope.supplier.ServiceTypes = data.ServiceTypes;
                    var eventsIds = $scope
                        .supplierEvents
                        .map(function (event){ return event.Id})
                        .join(",");
                    supplierService
                        .getEventServices(eventsIds)
                        .then(function (data) {
                            $scope.ServiceTypes = data.found;
                            callback();
                        });
                });
    };

    $scope.saveSupplierServices = function (callback) {
        var ids = $scope.supplier.ServiceTypes.map(function (it) { return it.Id });
        supplierService
            .updateSuppliersService(ids)
            .then(function (){
                $scope.getSupplierQuestions();
                callback();
        })
    };

    $scope.getSupplierQuestions = function () {
        $scope.questions = [];
        var ids = $scope
                    .supplier
                    .ServiceTypes
                    .map(function (service) { return service.Id })
                    .join(",");
        supplierService
            .getQuestions(ids)
            .then(function (response) {
                $scope.questions = response.data.found;
            });
    };

    $scope.saveSupplierQuestions = function(form, callback) {
      if (form.$valid){
        supplierService
            .saveQuestions($scope.questions)
            .then(function (){
                callback();
            });
      }
    };

    $scope.checkPassword = function(){
        if($scope.registration.Password === ''){
            return true;
        }

        return new RegExp('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$')
            .test($scope.registration.Password);
    };

    $scope.hasService = function(event){
        if(!$scope.supplier.ServiceTypes) {
            return false;
        }

        return $scope.supplier.ServiceTypes.find(function (item){
            return item.Id === event.Id;
        })
    };

    $scope.hasEvent = function(event){
        return $scope.supplierEvents.find(function (item){
            return item.Id === event.Id;
        })
    };

    $scope.getServiceTypes = function (){
        return $scope.ServiceTypes;
    };

    $scope.getQuestions = function () {
        return $scope.questions;
    };

    supplierService
        .getCities()
        .then(function (data) {
            $scope.cities = data;
        });

    supplierService
        .getEvents()
        .then(function (response){
           $scope.events = response.data;
        });

}]);