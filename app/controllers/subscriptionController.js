'use strict';
app.controller('subscriptionController', ['$scope', 'accountService', 'authService', '$location', function ($scope, accountService, authService, $location) {

    $scope.load = function () {
      if(!authService
    			.authentication.isAuth || authService
    			.authentication.userType !== 'supplier') {
            authService.logOut();
    		$location.path('/login-supplier');
    	} else {
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
        }
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
