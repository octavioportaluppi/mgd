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

	$scope.slides = [
		{
			id: 0,
			img: 'img/mi_gran_dia_conferencia.jpg',
			text: 'Bautizo: Sabemos la importancia de compartir valiosos momentos.'
		}, 
		{
			id: 1,
			img: 'img/mi_gran_dia_cumpleanos.jpg',
			text: 'Cumpleaños: ¿Estás listo para planear la mejor fiesta de cumpleaños?'
		}, 
		{
			id: 2,
			img: 'img/mi_gran_dia_boda.jpg',
			text: 'Bodas: Te ayudamos a que tu gran día sea inolvidable.'
		}, 
		{
			id: 3,
			img: 'img/mi_gran_dia_boda.jpg',
			text: 'Quinceañeras: Aquí tu fiesta de ensueño se hará realidad.'
		}, 
		{
			id: 4,
			img: 'img/mi_gran_dia_boda.jpg',
			text: 'Graduaciones: Te acompañamos en tu camino al éxito.'
		}, 
		{
			id: 5,
			img: 'img/mi_gran_dia_boda.jpg',
			text: 'Conferencias: Somos tu mano derecha en la organización de tus conferencias.'
		}, 
		{
			id: 6,
			img: 'img/mi_gran_dia_boda.jpg',
			text: 'Despedidas: Despide tu soltería de la mejor manera ¡nosotros te ayudamos!'
		}, 
		{
			id: 7,
			img: 'img/mi_gran_dia_boda.jpg',
			text: 'Otros: Estamos contigo en la organización de todos tus eventos.'
		}

	];

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
