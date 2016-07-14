'use strict';
app.controller('plannerController',
	['$scope', 'plannerService', 'stateService', 'supplierService',
		function ($scope, plannerService, stateService, supplierService) {

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

	$scope.getPastEventKeys = function () {
		return Object.keys($scope.pastEvents);
	};

	supplierService
		.getEvents()
		.then(function (response){
			$scope.eventTypes = response.data;
	});

	$scope.getCities = function() {
		stateService
			.getCities($scope.event.StateId)
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
	}

	$scope.getEvents();

}]);