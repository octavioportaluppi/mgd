'use strict';
app.controller('suppliersController', ['$scope', '$http', '$q', 'supplierService', function ($scope, $http, $q, supplierService) {

    $scope.size = 5;
    $scope.offset = 0;

    $scope.nextPage = function(){
        $scope.offset = $scope.offset + $scope.size;
        $scope.getSuppliers();
    };

    $scope.isCurrentPage = function(pageNumber){
        return $scope.offset == pageNumber;
    };

    $scope.goPage = function(pageNumber){
        $scope.offset = pageNumber;
        $scope.getSuppliers();
    };

    $scope.getSuppliers = function (){
        supplierService
            .getAllSuppliers(
                $scope.size,
                $scope.offset)
            .success(function (response){
                $scope.suppliers = response;
            })
    };

    $scope.getSuppliers();

}]);