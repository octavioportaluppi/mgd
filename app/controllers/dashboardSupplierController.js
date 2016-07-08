'use strict';
app.controller('dashboardSupplierController',
	['$scope', 'supplierService', 'ngAuthSettings', 'stateService', function ($scope, supplierService, ngAuthSettings, stateService) {

	$scope.supplier = {};
    $scope.chart = 0;
	$scope.dashboard = '';

	$scope.days = [
		{ id: 0, name: 'Domingo'},
		{ id: 1, name: 'Lunes' },
		{ id: 2, name: 'Martes' },
		{ id: 3, name: 'Miercoles' },
		{ id: 4, name: 'Jueves' },
		{ id: 5, name: 'Viernes' },
		{ id: 5, name: 'Sabado' }
	];

	$scope.getDays = function () {
		return $scope.days;
	};

	$scope.getDashboard = function() {
		$scope.editProfile = false;
		$scope.editServices = false;
		$scope.editAboutMe = false;
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
				$scope.supplier.LogoId = res.LogoId;
				$scope.supplier.pic = ngAuthSettings.apiServiceBaseUri + '/api/Pictures/' + res.LogoId + '/Image';
				$scope.chart = getProgress();
		});
	};
    

	function getProgress() {
		$scope.value = 0;
        if($scope.dashboard.ServiceTypes.length !== 0){
                $scope.value += 0.1;
        }
		for (var field in $scope.supplier) {
			if ( $scope.supplier[field] !== "" && $scope.supplier[field] !== null) {
				delete $scope.supplier.CityId;
				$scope.value += 0.08;
			}
		}
		var total = $scope.value.toFixed(1);
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

        $scope.saveSupplierProfile = function (form, callback){
            if(form.$valid ) {
                    $scope.updateProfile(callback);
                } else {
               $scope.editProfile;
                }

        };

        $scope.saveSupplierAboutMe = function (form,callback){
            if(form.$valid) {
                $scope.updateDetails(callback)
            }else{
                $scope.editAboutMe;
            }
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

	$scope.getCities = function() {
		stateService
			.getCities($scope.supplier.StateId)
			.then(function (response){
				$scope.cities = response.data;
			});
	};

	stateService
		.getStates()
		.then(function (response) {
			$scope.states = response.data;
		});


		$scope.getDashboard();

	$scope.haveItem = function(itemId){
		return $scope.dashboard.ServiceTypes.find(function(it){
			return it.Id === itemId;
		})
	};

}]);

