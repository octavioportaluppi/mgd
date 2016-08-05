'use strict';
app.controller('forgotPasswordController', ['$scope', 'accountService', function ($scope, accountService) {

    $scope.account = {};

    $scope.send = function (form) {
        if(!form.$valid) {
            return;
        }
        accountService
            .forgotPassword($scope.account.email)
            .then(function () {
                $scope.sent = true;
            });
    }

}]);