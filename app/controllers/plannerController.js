'use strict';
app.controller('plannerController', ['$scope', 'plannerService', function ($scope, plannerService) {

	plannerService.getEvents().then(function (response){
		$scope.events = response.data.CurrentEvents;
	});

}]);