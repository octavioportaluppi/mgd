'use strict';
app.controller('activateController',
    ['$scope', '$routeParams','accountService', function ($scope, $routeParams, accountService) {

        $scope.activate = {};

        $scope.activate = function (form) {
            if(!form.$valid) {
                return false;
            }

            $scope.activate.code = $routeParams.hash;

            accountService
                .activatePassword($scope.activate)
                .then(
                    function() {
                        $scope.sent = true;
                    }
            )
        };

        $scope.checkPassword = function(){
            if($scope.activate.Password === ''){
                return true;
            }

            return new RegExp('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$')
                .test($scope.activate.Password);
        };

}]);