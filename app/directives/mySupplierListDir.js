'use strict';

var supplierListController = ['$scope', 'supplierService', 'ngAuthSettings', 'stateService', '$filter', '$location',
    function ($scope, supplierService, ngAuthSettings, stateService, $filter, $location){

    $scope.size = 5;
    $scope.page = 1;
    //$scope.filter = $scope.filter || undefined;


    $scope.filtersSelected = [
      {name:'EventTypeId', value: $location.$$search.e},
      {name:'ServiceTypeId', value: $location.$$search.s},
      {name:'CityId', value: $location.$$search.c}
    ];
    $scope.query = $scope.query || undefined;


    $scope.getSuppliers = function (){
        //$scope.loading = true;
        supplierService
            .getAllSuppliers(
            $scope.size,
            $scope.page,
            $scope.filtersSelected,
            $scope.query,
            $scope.CityId,
            $scope.orderSeed)
            .success(function (response){
                $scope.loading = false;
                $scope.totalSuppliers = response.TotalResults;
                $scope.filters = response.QueryFilterInfo;
                $scope.totalPages = response.TotalPages;
                $scope.orderSeed = response.OrderSeed;
                $scope.suppliers = response.Content;
                $scope.suppliers.forEach(function(supplier){
                    if (supplier.LogoId > 0)
                        supplier.LogoUrl = ngAuthSettings.apiServiceBaseUri + '/api/Pictures/' + supplier.LogoId + '/Image';
                })
            })
    };

    $scope.getMoreSuppliers = function (){
        //$scope.loading = true;
        supplierService
            .getAllSuppliers(
            $scope.size,
            $scope.page,
            $scope.filtersSelected,
            $scope.query,
            $scope.CityId,
            $scope.orderSeed)
            .success(function (response){
                $scope.loading = false;
                $scope.suppliers = $scope.suppliers.concat(response.Content);
                $scope.suppliers.forEach(function(supplier) {
                    if (supplier.LogoId > 0)
                        supplier.LogoUrl = ngAuthSettings.apiServiceBaseUri + '/api/Pictures/' + supplier.LogoId + '/Image';
                });
            })
    };

    //$scope.getSuppliers();


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
    };

    $scope.doFilter = function(filterKey, filter){
        $scope.page = 1;
        if (filterKey) //if there is no filter key defined it's because it's an initial load
        {
          var currentFilter = $scope.getFilterByName(filterKey.replace('Filter', 'Id'))
          //$scope.filtersSelected = {name: filterKey.replace('Filter', 'Id'), value: filter.Id };
          if (currentFilter != null) {
            currentFilter.value = filter.Id;
          }
        }
        $scope.getSuppliers();
    };

    $scope.getFilterByName = function(propertyValue) {
        var i=0, len=$scope.filtersSelected.length;
        for (; i<len; i++) {
            if (collection[i]["Name"] == +propertyValue) {
                return $scope.filtersSelected[i];
            }
        }
        return null;
    }

    $scope.clearAllFilters = function() {
        var i=0, len=$scope.filtersSelected.length;
        for (; i<len; i++) {
                $scope.filtersSelected[i] == null;
        }
    }

    $scope.doQuery = function(){
        //query string is set in the UI
        $scope.page = 1;
        $scope.filtersSelected = undefined;
        $scope.getSuppliers();
    }


    $scope.doFilter();
}];

app.directive('mySupplierList', function() {
    return {
        restrict: 'E',
        scope: {
            title: '@',
            descripion: '@',
            filter: '='
        },
        templateUrl: '/app/views/my-suppliers-list.html',
        controller: supplierListController
    };
});
