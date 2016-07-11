'use strict';

var controller = ['$scope', 'supplierService', 'ngAuthSettings', 'stateService',
    function ($scope, supplierService, ngAuthSettings, stateService){

    $scope.size = 5;
    $scope.page = 1;

    $scope.getSuppliers = function (){
        $scope.loading = true;
        supplierService
            .getAllSuppliers(
            $scope.size,
            $scope.page)
            .success(function (response){
                $scope.loading = false;
                $scope.totalSuppliers = response.TotalResults;
                $scope.filters = response.QueryFilterInfo;
                $scope.totalPages = response.TotalPages;
                $scope.suppliers = response.Content;
                $scope.suppliers.forEach(function(supplier){
                    if (supplier.LogoId > 0)
                        supplier.LogoUrl = ngAuthSettings.apiServiceBaseUri + '/api/Pictures/' + supplier.LogoId + '/Image';
                })
            })
    };

    $scope.getMoreSuppliers = function (){
        $scope.loading = true;
        supplierService
            .getAllSuppliers(
            $scope.size,
            $scope.page)
            .success(function (response){
                $scope.loading = false;
                $scope.suppliers = $scope.suppliers.concat(response.Content);
                $scope.suppliers.forEach(function(supplier) {
                    if (supplier.LogoId > 0)
                        supplier.LogoUrl = ngAuthSettings.apiServiceBaseUri + '/api/Pictures/' + supplier.LogoId + '/Image';
                });
            })
    };

    $scope.getSuppliers();

    $scope.nextPage = function(){
        if($scope.page == $scope.totalPages){
            return;
        }
        $scope.page = $scope.page + 1;
        $scope.getMoreSuppliers();
    };

    stateService
        .getAllCities()
        .then(function (response) {
           $scope.cities = response.data;
        });

    $scope.getFilterNames = function(){
        if(!$scope.filters)
            return;
        return Object.keys($scope.filters);
    }
}];

app.directive('mySupplierList', function() {
    return {
        restrict: 'E',
        scope: {
            title: '@',
            descripion: '@'
        },
        templateUrl: '/app/views/my-suppliers-list.html',
        controller: controller
    };
});