'use strict';
app.controller('plannerDataController',
	['$scope', 'plannerService', 'stateService', 'authService', '$location',
		function ($scope, plannerService, stateService, authService, $location) {


	//TODO: Agregar servicio para traer el usuario.
	$scope.update = function(form) {
		if(!form.$valid) {
			return;
		}
		authService
			.updatePlanner($scope.planner)
			.then(function () {
				$location.path('planner')
			});
	};

	$scope.datepicker = {
		opened: false
	};

	$scope.altInputFormats = ['M!-d!-yyyy'];

	$scope.dateOptions = {
		placement: 'top-right',
		formatYear: 'yy',
		maxDate: new Date(),
		startingDay: 1
	};

	$scope.openDatePicker = function() {
		$scope.datepicker.opened = true;
	};

	$scope.getCities = function() {
		stateService
			.getCities($scope.planner.StateId)
			.then(function (response){
				$scope.cities = response.data;
			});
	};

	stateService
		.getStates()
		.then(function (response) {
			$scope.states = response.data;
		});

}]);