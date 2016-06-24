'use strict';
app.controller('suppliersController', ['$scope', '$http', '$q', 'supplierService', function ($scope, $http, $q, supplierService) {
	$scope.events = '';
	$scope.eventsServices = [];
	supplierService.getSuppliers();
	$scope.suppliers = supplierService.suppliers;

	console.log($scope.suppliers);

	angular.element(document).ready(function() {
		supplierService.getEvents().then(function(data) {
			$scope.events = data;
			for (var i = 0; i < $scope.events.length; i++) {
				//$scope.eventsServices = [];
				supplierService.getEventServices($scope.events[i].Id).then(function(services) {
					var temp = {'services': services};
					$scope.eventsServices.push(temp);
				}, function() {
					console.log('error');
				});
			};
		}, function() {
			console.log('error');
		});
    });
}]);