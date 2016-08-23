'use strict';
app.controller('forgotPasswordController', ['$scope', 'accountService', '$location', function ($scope, accountService, $location) {

    $scope.account = {};

    $scope.send = function (form) {
        if(!form.$valid) {
            return;
        }
        accountService
            .forgotPassword($scope.account.email)
            .then(function () {
                $location.path('/password-confirmation')
            });
    }

}]);