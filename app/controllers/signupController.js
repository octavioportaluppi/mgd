'use strict';
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
                $scope.updateUser();
            } else {
                $scope.createUser();
            }
        }
    };

    $scope.updateUser = function(){
        //TODO: Update the user data;
    };

    $scope.createUser = function(){
        authService
            .saveRegistration($scope.registration)
            .then(
            function() {
                authService
                    .login($scope.registration, 'supplier')
                    .then(function() {
                        $scope.authentication = authService.authentication;
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
        //TODO: Change to correct service
        $scope.ServiceTypes = [];
        supplierService
            .getDashboard()
            .then(
                function (data) {
                    $scope.supplier.ServiceTypes = data.ServiceTypes;
                    $scope
                        .supplierEvents
                        .forEach(function (event){
                            supplierService
                                .getEventServices(event.Id)
                                .then(function (data) {
                                    data.forEach(function (item){
                                        var find = $scope.ServiceTypes.find(function(it){return item.Id === it.Id});
                                        if(!find){
                                            $scope.ServiceTypes.push(item);
                                        }
                                    });
                                });
                        });
                        callback();
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
        $scope
            .supplier
            .ServiceTypes
            .forEach(function (service){
                supplierService
                    .getQuestions(service.Id)
                    .then(function (response){
                        response
                            .data
                            .forEach(function (question){
                                var find = $scope.questions.find(function(it){return question.Id === it.Id});
                                if(!find) {
                                    $scope.questions.push(question);
                                }
                            });
                    });
            })
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