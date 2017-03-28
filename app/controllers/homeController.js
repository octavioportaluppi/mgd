'use strict';
app.controller('homeController', ['$scope', 'supplierService', 'ngAuthSettings', 'wpService', function ($scope, supplierService, ngAuthSettings, wpService) {

	$scope.isSupplier = false;

	// Suppliers
	$scope.size = 4;
	$scope.page = 1;
	$scope.filter = $scope.filter || undefined;
	$scope.query = $scope.query || undefined;
	$scope.suppliers = [];

 // WP posts
	$scope.wpPosts = [];

	// Slides
	$scope.active = 0;
	$scope.myInterval = 3000;
	$scope.noWrapSlides = false;
	$scope.slides = [
		{
			id: 0, //Bautizo
			img: 'img/headers/bautizos.jpg',
			text: 'Sabemos la importancia de compartir valiosos momentos',
			link: '/#/suppliers/browse/event/7',
			class: 'header-bautizos'
		},
		{
			id: 1,
			img: 'img/headers/cumpleanos.jpg',
			text: '¿Estás listo para planear la mejor fiesta de cumpleaños?',
			link: '/#/suppliers/browse/event/2',
			class: 'header-cumpleanos'
		},
		{
			id: 2, //Bodas
			img: 'img/headers/bodas.jpg',
			text: 'Te ayudamos a que tu gran día sea inolvidable',
			link: '/#/suppliers/browse/event/1',
			class: 'header-bodas'
		},
		{
			id: 3, //Quinceañeras
			img: 'img/headers/quinceaneras.jpg',
			text: 'Aquí tu fiesta de ensueño se hará realidad',
			link: '/#/suppliers/browse/event/3',
			class: 'header-quinceaneras'
		},
		{
			id: 4, //Graduaciones
			img: 'img/headers/graduaciones.jpg',
			text: 'Te acompañamos en tu camino al éxito',
			link: '/#/suppliers/browse/event/4',
			class: ''
		},
		{
			id: 5, //Conferencias
			img: 'img/headers/conferencias.jpg',
			text: 'Somos tu mano derecha en la organización de tus conferencias',
			link: '/#/suppliers/browse/event/8',
			class: 'header-conferencias'
		},
		{
			id: 6, //Otros
			img: 'img/headers/otros.jpg',
			text: 'Estamos contigo en la organización de todos tus eventos',
			link: '/#/suppliers/browse/event/10',
			class: 'header-otros'
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
			//$scope.loading = true;
			supplierService
					.getPremiumSuppliers(
					$scope.size,
					$scope.page,
					$scope.filter,
					$scope.query,
					$scope.CityId)
					.success(function (response){
							$scope.loading = false;
							$scope.suppliers = response;
							$scope.suppliers.forEach(function(supplier){
									if (supplier.LogoId > 0)
											supplier.LogoUrl = ngAuthSettings.apiServiceBaseUri + '/api/Pictures/' + supplier.LogoId + '/Image?Thumbnail=False';
							});
						$scope.suppliers = $scope.suppliers;
					});
	};

	$scope.getPosts = function () {
		wpService
			.getPosts()
			.then(function (response) {
				$scope.wpPosts = response;
			});
	}

	$scope.initHome = function() {
		$scope.getSuppliers();
		$scope.getPosts();
	}

	$scope.initHome();

}]);
