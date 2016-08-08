'use strict';
app.controller('emailConfirmController', ['$scope', 'accountService', '$location', function ($scope, accountService, $location) {

    $scope.account = {};

    $scope.send = function (form) {
        if(!form.$valid) {
            return;
        }
        /*accountService
            .confirmEmail($scope.account.email)
            .then(function () {
            */
        $location.path('/email-confirmation-success');
            /*});*/
    }

}]);