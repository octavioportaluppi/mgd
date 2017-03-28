'use strict';
app.controller('signupController', [
    '$scope', '$location', '$timeout', 'authService', 'supplierService', 'stateService', 'dateService', 'Upload',
    function ($scope, $location, $timeout, authService, supplierService, stateService, dateService, Upload) {

    $scope.registration = {};
    $scope.supplier = {};
    $scope.supplier.photos = [];
    $scope.supplierEvents = [];

    $scope.stepsSupplier = [
        { templateUrl: '/app/views/signup-supplier-data.html', hasForm: true },
        { templateUrl: '/app/views/signup-supplier-event.html', hasForm: true },
        { templateUrl: '/app/views/signup-supplier-services.html', hasForm: true },
        { templateUrl: '/app/views/signup-supplier-questions.html', hasForm: true },
        { templateUrl: '/app/views/signup-welcome.html', hasForm: true }
    ];

    //check if user is already logged in
    if (authService.authentication.isAuth){
        $location.path('/');
    }

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
                        authService
                            .saveSupplier($scope.supplier)
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
          var answers = Object
              .keys($scope.supplier.questions)
              .map(function (key) {
                  return {QuestionId: key, Text: $scope.supplier.questions[key]}
              });

        supplierService
            .saveQuestions(answers)
            .then(function (){
                callback();
            });
      }
    };

    $scope.checkPassword = function(){
        if($scope.registration.Password === ''){
            return true;
        }

        return new RegExp('^(?=.*[A-Z])(?=.*[!@#$&*.])(?=.*[0-9])(?=.*[a-z]).{8,}$')
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

    $scope.getCities = function() {
        stateService
            .getCities($scope.supplier.StateId)
            .then(function (response){
               $scope.cities = response.data;
            });
    };

    stateService
        .getStates()
        .then(function (response) {
            $scope.states = response.data;
        });

    supplierService
        .getEvents()
        .then(function (response){
           $scope.events = response.data;
        });

    $scope.days = dateService.getDays();

}]);
