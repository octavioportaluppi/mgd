'use strict';
app.controller('dashboardSupplierController', ['$scope', 'supplierService', 'authService', function ($scope, supplierService, authService) {

	$scope.supplier = {
	};

    $scope.events = [];
    
    $scope.chart = 0;



	$scope.dashboard = '';
    
    $scope.services = [];

    $scope.message = '';

	$scope.getDashboard = function() {
		supplierService
			.getDashboard()
			.then(function(res) {
				console.log(res);
				$scope.dashboard = res;
				$scope.supplier.City = res.City;
				$scope.supplier.Name = res.Name;
				$scope.supplier.Address = res.Address;
				$scope.supplier.Phone = res.Phone;
				$scope.supplier.Description = res.Description;
				$scope.supplier.FacebookUrl = res.FacebookUrl;
				$scope.supplier.InstagramUrl = res.InstagramUrl;
				$scope.supplier.TwitterUrl = res.TwitterUrl;
				$scope.dashboard.serviceTypes = res.serviceTypes;
				$scope.chart = getProgress();
		});
	};

	$scope.update = function() {
		authService.updateSupplier($scope.supplier).then(function(res) {
			$scope.message = 'Perfil actualizado';
		});
	};

	function getProgress() {
		var value = 0;
		for (var field in $scope.supplier) {
			console.log($scope.supplier[field]);
			if ($scope.supplier[field] !== '') {
				value += .125;
			}
		}
		return value;
	}

	//britez
	$scope.editServices = false;

	$scope.updateServices = function (){
		var ids = $scope
			.dashboard
			.ServiceTypes
			.map(function (service) {
				return service.Id;
			});
		supplierService
			.updateSuppliersTypes(ids)
			.then(function () {
				$scope.editServices = !$scope.editServices;
				$scope.getDashboard();
			})
	};

	supplierService
		.getServices()
		.then(function (data) {
			$scope.serviceTypes = data
		});

	$scope.getDashboard();

	$scope.haveItem = function(itemId){
		return $scope.dashboard.ServiceTypes.find(function(it){
			return it.Id === itemId;
		})
	};

}]);

