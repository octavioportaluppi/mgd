'use strict';
app.controller('signupPlannerController', [
    '$scope', 'authService', 'stateService', 'dateService',
    function ($scope, authService, stateService, dateService) {


    $scope.registration = {};
    $scope.planner = {};

    $scope.datepicker = {
        opened: false
    };

    $scope.altInputFormats = ['M!-d!-yyyy'];

    $scope.dateOptions = {
        placement: 'top-right',
        formatYear: 'yy',
        maxDate: new Date(),
        startingDay: 1
    };

    $scope.openDatePicker = function() {
        $scope.datepicker.opened = true;
    };

    $scope.stepsPlanner = [
        { templateUrl: '/app/views/signup-planner-data.html', hasForm: true },
        { templateUrl: '/app/views/signup-planner-welcome.html', hasForm: true }
    ];

    //check if user is already logged in
    if (authService.authentication.isAuth){
        $location.path('/');
    }

    //Britez
    $scope.savePlannerData = function (form, callback){
        if(form.$valid && $scope.checkPassword()) {
            if($scope.authentication && $scope.authentication.isAuth) {
                $scope.updateUser(callback);
            } else {
                $scope.createUser(form, callback);
            }
        }
    };

    $scope.updateUser = function(callback){
        authService
            .updatePlanner($scope.planner)
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
                    .login($scope.registration, 'planner')
                    .then(function() {
                        $scope.authentication = authService.authentication;
                        authService
                            .savePlanner($scope.planner)
                            .then(function (){
                                callback();
                            })
                    })
            },
            function(error) {
                if (error.data.ModelState[""][0].match("already"))
                {
                  $scope.errorMessage = "El email ingresado ya esta en uso. Por favor, escoge otro.";
                }
                else {
                    $scope.errorMessage = "Oops. Hubo un error al intentar registrarte. Por favor, ponte en contacto con nosotros para solucionarlo.";
                }
                form.$valid = false;
            }
        );
    };

    $scope.findString = function(obj, s){
      var found = false;
      for(var i = 0; i < obj.length; i++) {
          if (obj[i] == s) {
              found = true;
              break;
          }
      }
    }

    $scope.checkPassword = function(){
        if($scope.registration.Password === ''){
            return true;
        }

        return new RegExp('^(?=.*[A-Z])(?=.*[!@#$&*.])(?=.*[0-9])(?=.*[a-z]).{8,}$')
            .test($scope.registration.Password);
    };

    $scope.getCities = function() {
        stateService
            .getCities($scope.planner.StateId)
            .then(function (response){
               $scope.cities = response.data;
            });
    };

    stateService
        .getStates()
        .then(function (response) {
            $scope.states = response.data;
        });

    $scope.days = dateService.getDays();

}]);
