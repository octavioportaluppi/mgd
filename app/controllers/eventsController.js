'use strict';
app.controller(
    'eventsController', 
    [
        '$scope', 
        '$routeParams', 
        'supplierService',
        'ngAuthSettings',
        function ($scope, $routeParams, supplierService, ngAuthSettings) {

            $scope.size = 5;
            $scope.page = 1;
            $scope.filter = {name:'EventTypeId', value: $routeParams.eventId};

            $scope.getSuppliers = function (){
                $scope.loading = true;
                supplierService
                    .getAllSuppliers(
                    $scope.size,
                    $scope.page,
                    $scope.filter)
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
                    $scope.page,
                    $scope.filter)
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

            $scope.getFilterNames = function(){
                if(!$scope.filters)
                    return;
                return Object.keys($scope.filters);
            };

            $scope.doFilter = function(filterKey, filter){
                $scope.page = 1;
                $scope.filter = {name: filterKey.replace('Filter', 'Id'), value: filter.Id };
                $scope.getSuppliers();
            };

        }
    ]
);