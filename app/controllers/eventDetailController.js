'use strict';
app.controller('eventDetailController',
	['$scope', 'plannerService','$routeParams', '$location',
		function ($scope, plannerService, $routeParams, $location) {


		$scope.eventId = $routeParams.eventId;

		plannerService
			.getEvent($routeParams.eventId)
			.then(function (response){
				$scope.event = response.data;
				$scope.event.enabled = $scope.event.RemainingDays >= 0;
			});

		//britez
		$scope.currentDetail = 'agenda';

		$scope.goDetail = function(detail) {
			$scope.currentDetail = detail;
		};

		$scope.isActive = function (detail){
			return $scope.currentDetail === detail;
		};

		$scope.isUrlActive = function (detail){
			return $location.path() == detail;
		};
}]);
