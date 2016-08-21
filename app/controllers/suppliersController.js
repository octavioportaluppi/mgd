'use strict';
app.controller('suppliersController',
    ['$scope', 'supplierService', '$routeParams', 'ngAuthSettings', 'dateService', 'authService',
        function ($scope, supplierService, $routeParams, ngAuthSettings, dateService, authService) {
            $scope.supplier = {};
            $scope.isSupplier = false;
            $scope.myInterval = 3000;
            $scope.noWrapSlides = false;

            $scope.authentication = authService.authentication;

            $scope.active = 0;
            $scope.slides = [];

            $scope.votes = [];

            $scope.load = function () {
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

                                if(!pic.IsLogo)
                                    $scope.slides.push(elem)
                            });
                    });

                supplierService
                    .getAnswersById($routeParams.supplierId)
                    .then(function (response) {
                       $scope.answers = response.data;
                    });
            };

            $scope.load();

            $scope.vote = function (vote) {
                supplierService
                    .vote($routeParams.supplierId, vote)
                    .then(function () {
                        $scope.load();
                    });
            };

            $scope.isOpen = function () {
                if (!$scope.supplier.OpeningHours) {
                    return false;
                }
                return dateService.isOpen($scope.supplier.OpeningHours);
            };

        }]);