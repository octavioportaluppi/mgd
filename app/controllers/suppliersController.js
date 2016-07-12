'use strict';
app.controller('suppliersController',
    ['$scope', 'supplierService', '$routeParams','ngAuthSettings',
        function ($scope, supplierService, $routeParams,ngAuthSettings) {

        $scope.supplier = {};

        supplierService
            .getSuppliersById($routeParams.supplierId)
            .then(function(res){
                $scope.supplier = res.data;
                if ($scope.supplier.LogoId > 0)
                $scope.supplier.LogoUrl = ngAuthSettings.apiServiceBaseUri + '/api/Pictures/' +   $scope.supplier.LogoId + '/Image';
                $scope.supplier.Pictures = res.data.Pictures
                .map(function (pic) {
                    return ngAuthSettings.apiServiceBaseUri + '/api/Pictures/' + pic.Id + '/Image';
                });

            });








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
                .then(function(response) {
                    $scope.eventItems = response.data;
                });

            $scope.getEvents = function (){
                return $scope.eventItems;
            }
}]);