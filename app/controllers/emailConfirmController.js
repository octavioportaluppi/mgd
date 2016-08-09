'use strict';
app.controller('emailConfirmController', ['$scope', 'accountService', '$location', function ($scope, accountService, $location, $routeParams) {

    $scope.account = {};

    $scope.send = function (form) {
        if(!form.$valid) {
            return;
        }
        accountService
            .confirmEmail($routeParams.hash)
            .then(function () {
                $location.path('/email-confirmation-success');
            });
    }

}]);