'use strict';
app.controller('signupController', [
    '$scope', '$location', '$timeout', 'authService', 'supplierService',
    function ($scope, $location, $timeout, authService, supplierService) {

    /*$scope.savedSuccessfully = false;
    $scope.message = "";*/

    $scope.registration = {};
    $scope.supplier = {};
    $scope.supplierEvents = [];

    /*$scope.planner = {
        FirstName: "",
        LastName: "",
        CityId: '',
        Birthdate: ""
    };

    $scope.supplier = {
        Name: '',
        Description: '',
        Address: '',
        CityId: '',
        FacebookUrl: '',
        TwitterUrl: '',
        InstagramUrl: '',
        Phone: ''
    };

    $scope.services = [];
    */

    $scope.stepsPlanner = [
        {
            templateUrl: '/app/views/signup-supplier-data.html',
            hasForm: true
        }
    ];
    
    $scope.stepsSupplier = [
        {
            templateUrl: '/app/views/signup-supplier-data.html',
            hasForm: true
        },
        {
            templateUrl: '/app/views/signup-supplier-event.html',
            hasForm: true
        },
        {
            templateUrl: '/app/views/signup-supplier-services.html',
            hasForm: true
        },
        {
            templateUrl: '/app/views/signup-supplier-pictures.html',
            hasForm: true
        },
        {
            templateUrl: '/app/views/signup-supplier-suscription.html',
            hasForm: true
        }
    ];
    
    $scope.datepicker = {
        opened: false
    };

    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.dateOptions = {
        appendToBody: true,
        placement: 'top-right',
        formatYear: 'yy',
        maxDate: new Date(),
        startingDay: 1
    };

    $scope.openDatePicker = function() {
        $scope.datepicker.opened = true;
    };

    $scope.signupPlanner = function () {
        console.log($scope.registration);
        authService.saveRegistration($scope.registration).then(function (response) {
            $scope.savedSuccessfully = true;
            $scope.message = "El usuario se ha registrado exitosamente";
            authService.login($scope.registration, 'planner').then(function (response) {
                authService.savePlanner($scope.planner).then(function (response) {    
                    startTimer();
                });
            });
        },
         function (response) {
             console.log(response);
             var errors = [];
             for (var key in response.data.ModelState) {
                 for (var i = 0; i < response.data.ModelState[key].length; i++) {
                     errors.push(response.data.ModelState[key][i]);
                 }
             }
             $scope.message = "El registro falló  debido a:" + errors.join(' ');
         }); 
    };

    $scope.signupSupplier = function () {
        console.log($scope.registration);
        authService.saveRegistration($scope.registration).then(function (response) {
            $scope.savedSuccessfully = true;
            $scope.message = "El usuario se ha registrado exitosamente";
            authService.login($scope.registration, 'supplier').then(function (response) {
                authService.savePlanner($scope.planner).then(function (response) {    
                    authService.saveSupplier($scope.supplier).then(function (response) {    
                        startTimer();
                    });
                });
            });
        },
         function (response) {
             console.log(response);
             var errors = [];
             for (var key in response.data.ModelState) {
                 for (var i = 0; i < response.data.ModelState[key].length; i++) {
                     errors.push(response.data.ModelState[key][i]);
                 }
             }
             $scope.message = "El registro falló  debido a:" + errors.join(' ');
         }); 
    };    

    var startTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $location.path('/welcome');
        }, 2000);
    }

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

    $scope.saveSupplierBusinessData = function (form, callback) {
        if (form.$valid) {
            //authService
                //.saveSupplier($scope.supplier)
                //.then(function (){
                    callback();
                //})
        }
    };

    $scope.getSupplierServices = function (callback) {
        supplierService
            .getServices()
            .then(
                function (data) {
                    $scope.ServiceTypes = data;
                    supplierService
                        .getDashboard()
                        .then(
                            function (data) { $scope.supplier.ServiceTypes = data.ServiceTypes });
                    callback();
                });
    };

    $scope.saveSupplierServices = function (callback) {
        var ids = $scope.supplier.ServiceTypes.map(function (it) { return it.Id });
        supplierService
            .updateSuppliersService(ids)
            .then(function (){
                callback();
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