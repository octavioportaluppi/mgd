'use strict';
app.controller('subscriptionController', ['$scope', 'accountService', '$location', function ($scope, accountService, $location) {

    $scope.load = function () {
        accountService
            .getSubscriptionTypes()
            .then(function (response) {
                $scope.subscriptions = response.data;
            });

        accountService
            .getCurrentSubscription()
            .then(function (response) {
                $scope.currentSubscription = response.data;
            });
    };

    $scope.load();

    $scope.getNumber = function (number) {
        return new Array(number);
    };

    $scope.changeSubscription = function(subscriptionId){
        if ($scope.currentSubscription.Id == subscriptionId) {
            return;
        }
        accountService
            .updateSubscription(subscriptionId)
            .then(function (){
                $location.path('subscription-success')
            })
    };

}]);