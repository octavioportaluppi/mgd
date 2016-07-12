'use strict';
app.controller('suppliersController',
    ['$scope', 'supplierService', '$routeParams', 'ngAuthSettings',
        function ($scope, supplierService, $routeParams, ngAuthSettings) {
            $scope.supplier = {};
            $scope.isSupplier = false;
            $scope.myInterval = 3000;
            $scope.noWrapSlides = false;

            $scope.active = 0;
            $scope.slides = [];


            supplierService
                .getSuppliersById($routeParams.supplierId)
                .then(function (res) {
                    $scope.supplier = res.data;
                    if ($scope.supplier.LogoId > 0)
                        $scope.supplier.LogoUrl = ngAuthSettings.apiServiceBaseUri + 'api/Pictures/' + $scope.supplier.LogoId + '/Image';
                    var id = 0;
                    res.data.Pictures
                        .forEach(function (pic) {
                            var elem = {
                                img: ngAuthSettings.apiServiceBaseUri + 'api/Pictures/' + pic.Id + '/Image',
                                id: id++
                            };

                            $scope.slides.push(elem)
                        });
                });
        }]);