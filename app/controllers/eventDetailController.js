'use strict';
app.controller('eventDetailController',
	['$scope', 'plannerService','$routeParams',
		function ($scope, plannerService, $routeParams) {

		$scope.eventId = $routeParams.eventId;

		plannerService
			.getEvent($routeParams.eventId)
			.then(function (response){
				$scope.event = response.data;
			});

		//britez
		$scope.currentDetail = 'agenda';

		$scope.goDetail = function(detail) {
			$scope.currentDetail = detail;
		};

		$scope.isActive = function (detail){
			return $scope.currentDetail === detail;
		}
}]);