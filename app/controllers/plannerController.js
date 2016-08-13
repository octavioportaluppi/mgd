'use strict';
app.controller('plannerController',
	['$scope', 'plannerService', 'stateService', 'supplierService', 'authService', '$location',
		function ($scope, plannerService, stateService, supplierService, authService, $location) {

	$scope.formCollapsed = true;

	$scope.getEvents = function() {
		plannerService.getEvents().then(function (response){
			$scope.events = response.data.CurrentEvents;
			$scope.pastEvents = [];
			response.data.PastEvents.map(
				function (event){
					var year = new Date(event.Date).getFullYear();
					if(!$scope.pastEvents[year]){
						$scope.pastEvents[year] = [];
					}
					$scope.pastEvents[year].push(event)
				}
			)
		});
	};

	$scope.showEdit = function(event) {
		event.edit = true;
		event.Date = new Date(event.Date);
	};

	$scope.updateEvent = function(form, event) {
		if (!form.$valid) {
			return;
		}

		event.EventTypeId = event.EventType.Id;
		event.StateId = event.State.Id;
		event.CityId = event.City.Id;

		plannerService
			.updateEvent(event)
			.then(function () {
				$scope.getEvents();
			})
	};

	$scope.getPastEventKeys = function () {
		if(!$scope.pastEvents) {
			return;
		}
		return Object.keys($scope.pastEvents);
	};

	$scope.getCities = function(stateId) {
		stateService
			.getCities(stateId)
			.then(function (response){
				$scope.cities = response.data;
			});
	};

	stateService
		.getStates()
		.then(function (response) {
			$scope.states = response.data;
		});

	$scope.saveEvent = function(form){
		if(!form.$valid) {
			return;
		}
		plannerService
			.saveEvent($scope.event)
			.then(function (){
				$scope.formCollapsed = true;
				$scope.getEvents();
			});
	};

	$scope.delete = function (event){
		plannerService
			.deleteEvent(event)
			.then(function (){
				$scope.getEvents();
			})
	};

	//check logged
	if(!authService
		.authentication.isAuth || authService
		.authentication.userType !== 'planner') {
		$location.path('/login-planner');
	} else {
		$scope.getEvents();

		supplierService
			.getEvents()
			.then(function (response){
				$scope.eventTypes = response.data;
			});
	}

	$scope.isActive = function(currentLocation) {
		return $location.path() == currentLocation;
	};

}]);