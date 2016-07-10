'use strict';
app.controller('suppliersController',
    ['$scope', '$http', '$q', 'supplierService', 'ngAuthSettings', function ($scope, $http, $q, supplierService, ngAuthSettings) {

    $scope.size = 5;
    $scope.page = 1;

    $scope.nextPage = function(){
        $scope.page = $scope.page + 1;
        $scope.getSuppliers();
    };

    $scope.isCurrentPage = function(pageNumber){
        return $scope.page == pageNumber;
    };

    $scope.goPage = function(pageNumber){
        $scope.page = pageNumber;
        $scope.getSuppliers();
    };

    $scope.getSuppliers = function (){
        supplierService
            .getAllSuppliers(
                $scope.size,
                $scope.page)
            .success(function (response){
                $scope.suppliers = response.Content;
                $scope.suppliers.forEach(function(supplier){
                    if (supplier.LogoId > 0)
                        supplier.LogoUrl = ngAuthSettings.apiServiceBaseUri + '/api/Pictures/' + supplier.LogoId + '/Image';
                })
            })
    };

    $scope.getSuppliers();

}]);