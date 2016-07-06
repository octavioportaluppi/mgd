'use strict';
app.controller('dashboardSupplierController', ['$scope', 'supplierService', 'authService', function ($scope, supplierService) {

	$scope.supplier = {};
    $scope.chart = 0;
	$scope.dashboard = '';

	$scope.getDashboard = function() {
		supplierService
			.getDashboard()
			.then(function(res) {
				$scope.dashboard = res;
				$scope.supplier.City = res.City;
				$scope.supplier.Name = res.Name;
				$scope.supplier.Address = res.Address;
				$scope.supplier.Phone = res.Phone;
				$scope.supplier.Description = res.Description;
				$scope.supplier.FacebookUrl = res.FacebookUrl;
				$scope.supplier.InstagramUrl = res.InstagramUrl;
				$scope.supplier.TwitterUrl = res.TwitterUrl;
				$scope.supplier.State = res.State;
				$scope.supplier.OpeningHours = res.OpeningHours;
				$scope.chart = getProgress();
		});
	};
    

	function getProgress() {
		$scope.value = 0;
        if($scope.dashboard.ServiceTypes.length !== 0){
                $scope.value += 0.091;
        }
		for (var field in $scope.supplier) {
			if ($scope.supplier[field] !== null) {
				delete $scope.supplier.CityId;
				$scope.value += 0.091;
			}
		}
		var total = $scope.value.toFixed(2);
		return total;
	}

	//britez
	$scope.editServices = false;
	$scope.editAboutMe = false;
	$scope.editProfile = false;

	$scope.updateDetails = function(){
		var cityId = $scope.supplier.City.Id;
		$scope.supplier.CityId = cityId;
		delete $scope.supplier.City;
        supplierService
            .updateSupplierProfile($scope.supplier)
            .then(function () {
				$scope.editAboutMe = !$scope.editAboutMe;
                $scope.getDashboard();
            })
	};

	$scope.updateProfile = function(){
		var cityId = $scope.supplier.City.Id;
		$scope.supplier.CityId = cityId;
        supplierService
			.updateSupplierProfile($scope.supplier)
			.then(function(){
				$scope.editProfile = !$scope.editProfile;
				$scope.getDashboard();
			})
	};

	$scope.updateServices = function (){
		var ids = $scope
			.dashboard
			.ServiceTypes
			.map(function (service) {
				return service.Id;
			});
		supplierService
			.updateSuppliersService(ids)
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

	supplierService
		.getCities()
		.then(function (response) {
			$scope.cities = response.data;
		});

	$scope.getDashboard();

	$scope.haveItem = function(itemId){
		return $scope.dashboard.ServiceTypes.find(function(it){
			return it.Id === itemId;
		})
	};

}]);

