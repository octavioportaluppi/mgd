'use strict';
app.controller('homeController', ['$scope', 'supplierService', function ($scope, supplierService) {
	$scope.isSupplier = false;
	$scope.myInterval = 3000;
	$scope.noWrapSlides = false;

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
		.then(function(data) {
			console.log(data);
			$scope.eventItems = data;
		});

	$scope.getEvents = function (){
		return $scope.eventItems;
	}
   
}]);