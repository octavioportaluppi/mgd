'use strict';
app.controller('emailConfirmController', ['$scope', 'accountService', '$location', '$routeParams', function ($scope, accountService, $location, $routeParams) {

    accountService
        .confirmEmail($routeParams.hash, $routeParams.userid)
        .then(function () {
            $location.path('/email-confirmation-success');
        });

}]);
