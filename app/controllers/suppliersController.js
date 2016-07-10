'use strict';
app.controller('suppliersController',
    ['$scope', '$http', '$q', 'supplierService', 'ngAuthSettings', function ($scope, $http, $q, supplierService, ngAuthSettings) {

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

}]);