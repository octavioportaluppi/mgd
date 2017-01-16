'use strict';
app.controller('suppliersController',
    ['$scope', 'supplierService', '$routeParams', 'ngAuthSettings', 'dateService', 'authService', 'textAngularManager',
        function ($scope, supplierService, $routeParams, ngAuthSettings, dateService, authService, textAngularManager) {
            $scope.supplier = {};
            $scope.isSupplier = false;
            $scope.myInterval = 1000;
            $scope.noWrapSlides = false;

            $scope.authentication = authService.authentication;

            $scope.active = 0;
            $scope.slides = [];

            $scope.votes = [];

            $scope.load = function () {
                supplierService
                    .getSuppliersById($routeParams.supplierId)
                    .success(function (res) {
                        $scope.supplier = res;
                        if ($scope.supplier.LogoId > 0)
                            $scope.supplier.LogoUrl = ngAuthSettings.apiServiceBaseUri + 'api/Pictures/' + $scope.supplier.LogoId + '/Image?thumbnail=true';
                        var id = 0;
                        res.Pictures
                            .forEach(function (pic) {
                                var elem = {
                                    img: ngAuthSettings.apiServiceBaseUri + 'api/Pictures/' + pic.Id + '/Image?thumbnail=false',
                                    id: id++
                                };

                                if(!pic.IsLogo)
                                    $scope.slides.push(elem)
                            });
                    }).error(function(){
                      window.location = '/#/'
                      return;
                    })  ;

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
