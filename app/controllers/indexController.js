﻿'use strict';
app.controller('indexController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {

	$scope.plannerCollapsed = true;
  	$scope.suppliersCollapsed = true;

    $scope.logOut = function () {
        authService.logOut();
        $location.path('/');
    };

    $scope.authentication = authService.authentication;

	//britez
	$scope.isActive = function(currentLocation) {
		return $location.path() == currentLocation;
	};
}]);