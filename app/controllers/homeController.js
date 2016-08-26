'use strict';
app.controller('homeController', ['$scope', 'supplierService', 'ngAuthSettings', function ($scope, supplierService, ngAuthSettings) {
	$scope.isSupplier = false;
	$scope.myInterval = 3000;
	$scope.noWrapSlides = false;

	// Suppliers
	$scope.size = 5;
	$scope.page = 1;
	$scope.filter = $scope.filter || undefined;
	$scope.query = $scope.query || undefined;
	$scope.suppliers = [];

	$scope.active = 0;

	$scope.slides = [{
		id: 0,
		img: 'img/mi_gran_dia_conferencia.jpg',
		text: 'Te ayudamos a organizar tus conferencias'
	}, {
		id: 1,
		img: 'img/mi_gran_dia_cumpleanos.jpg',
		text: 'Te ayudamos a organizar tus cumpleaños'
	}, {
		id: 2,
		img: 'img/mi_gran_dia_boda.jpg',
		text: 'Te ayudamos a organizar tu boda'
	}];

	supplierService
		.getEvents()
		.then(function(response) {
			$scope.eventItems = response.data;
		});

	$scope.getEvents = function (){
		return $scope.eventItems;
	}

	$scope.getSuppliers = function (){
			$scope.loading = true;
			supplierService
					.getAllSuppliers(
					$scope.size,
					$scope.page,
					$scope.filter,
					$scope.query,
					$scope.CityId)
					.success(function (response){
							$scope.loading = false;
							$scope.totalSuppliers = response.TotalResults;
							$scope.filters = response.QueryFilterInfo;
							$scope.totalPages = response.TotalPages;
							$scope.suppliers = response.Content;
							$scope.suppliers.forEach(function(supplier){
									if (supplier.LogoId > 0)
											supplier.LogoUrl = ngAuthSettings.apiServiceBaseUri + '/api/Pictures/' + supplier.LogoId + '/Image';
							});
						$scope.suppliers = $scope.suppliers.slice(0,4);
					});
	};

	$scope.initHome = function() {
		$scope.getSuppliers();
	}

	$scope.initHome();

}]);
