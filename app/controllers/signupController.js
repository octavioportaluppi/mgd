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
            templateUrl: '/app/views/signup-supplier-business.html',
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

            //authService
                //.saveRegistration($scope.registration)
                //.then(
                    //function() {
                        //authService
                            //.login($scope.registration, 'supplier')
                            //.then(function() {
                                //TODO: change this for current auth
                                $scope.authentication = {isAuth: true};
                                callback();
                            //})
                    //},
                    //function(error) {
                        //$scope.errorMessage = error;
                        //form.$valid = false;
                   //}
            //)

        }
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

    $scope.getSupplierBusinessData = function (callback) {
        //TODO: Get suppler business data to edit
        callback();
    };

    $scope.saveSupplierEvents = function (callback) {
        //authService
        //.saveSupplier($scope.supplier)
        //.then(function (){
        callback();
        //})
    };

    $scope.checkPassword = function(){
        if($scope.registration.Password === ''){
            return true;
        }

        return new RegExp('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$')
            .test($scope.registration.Password);
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
        })

}]);