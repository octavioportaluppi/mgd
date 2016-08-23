'use strict';
app.controller('plannerDataController',
	['$scope', 'plannerService', 'stateService', 'authService', '$location',
		function ($scope, plannerService, stateService, authService, $location) {

	$scope.planner = {};

	authService
		.getPlanner()
		.then(function (response) {
			$scope.planner = response.data;
			$scope.planner.Birthdate = new Date(response.data.Birthdate);
			$scope.getCities();
		});

	//TODO: Agregar servicio para traer el usuario.
	$scope.update = function(form) {
		if(!form.$valid) {
			return;
		}
		$scope.planner.CityId = $scope.planner.City.Id;
		$scope.planner.StateId = $scope.planner.State.Id;
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

	stateService
		.getStates()
		.then(function (response) {
			$scope.states = response.data;
		});

	$scope.getCities = function() {
		stateService
			.getCities($scope.planner.State.Id)
			.then(function (response){
				$scope.cities = response.data;
			});
	};

}]);