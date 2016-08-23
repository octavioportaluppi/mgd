'use strict';
app.controller('supplierAccountController',
	['$scope', '$location', 'accountService', 'authService',
		function ($scope, $location, accountService) {

	$scope.isActive = function(currentLocation) {
		return $location.path() == currentLocation;
	};

	$scope.account = {};

	$scope.send = function (form) {
		if(!form.$valid) {
			return;
		}
		accountService
			.changePassword($scope.account)
			.then( function () {
				$location.path('/password-changed');
			})
	};

	$scope.checkPassword = function(){
		if($scope.account.NewPassword === ''){
			return true;
		}
		return new RegExp('^(?=.*[A-Z])(?=.*[!@#$&*.])(?=.*[0-9])(?=.*[a-z]).{8,}$')
			.test($scope.account.NewPassword);
	};

}]);

