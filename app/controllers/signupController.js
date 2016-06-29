'use strict';
app.controller('signupController', ['$scope', '$location', '$timeout', 'authService', function ($scope, $location, $timeout, authService) {

    $scope.savedSuccessfully = false;
    $scope.message = "";

    $scope.registration = {
        Email: "",
        Password: "",
        ConfirmPassword: ""
    };

    $scope.planner = {
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

    $scope.events = [];

    $scope.cities = [{ 'id': 1, 'name': 'Hermosillo' }];
    
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
        if(form.$valid) {
            callback();
        }
    }

}]);