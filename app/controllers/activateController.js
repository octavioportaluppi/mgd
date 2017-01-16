'use strict';
app.controller('activateController',
    ['$scope', '$routeParams','accountService', '$location', function ($scope, $routeParams, accountService, $location) {

        $scope.activate = {};

        // accountService
        //     .accountInfo()
        //     .then(function (response) {
        //         $scope.userType = response.data.Role;
        //     });

        $scope.activateAccount = function (form) {
            if(!form.$valid) {
                return false;
            }

            $scope.activate.code = $routeParams.hash;
            $scope.activate.email = $routeParams.email;

            accountService
                .activatePassword($scope.activate)
                .then(
                    function() {
                        $location.path('/password-changed')
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
