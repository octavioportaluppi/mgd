'use strict';
app.controller(
    'SupplierAllController',
    [
        '$scope',
        '$routeParams',
        'supplierService',
        'ngAuthSettings',
        'stateService',
        function ($scope, $routeParams, supplierService, ngAuthSettings,stateService) {

          $scope.size = 5;
          $scope.page = 1;
          $scope.orderSeed = null;
          $scope.filter = [];
          $scope.initialFilter = {};

                $scope.getSuppliers = function (){
                    //$scope.loading = true;
                    $scope.filter.push($scope.initialFilter);
                    supplierService
                        .getAllSuppliers(
                        $scope.size,
                        $scope.page,
                        $scope.filter,
                        $scope.query,
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
                                    supplier.LogoUrl = ngAuthSettings.apiServiceBaseUri + '/api/Pictures/' + supplier.LogoId + '/Image?thumbnail=true';
                            })
                        })
                };

                $scope.getMoreSuppliers = function (){
                    //$scope.loading = true;
                    //max, page, filter, query, orderSeed
                    supplierService
                        .getAllSuppliers(
                        $scope.size,
                        $scope.page,
                        $scope.filter,
                        $scope.query,
                        $scope.orderSeed)
                        .success(function (response){
                            $scope.loading = false;
                            $scope.suppliers = $scope.suppliers.concat(response.Content);
                            $scope.suppliers.forEach(function(supplier) {
                                if (supplier.LogoId > 0)
                                    supplier.LogoUrl = ngAuthSettings.apiServiceBaseUri + 'api/Pictures/' + supplier.LogoId + '/Image?thumbnail=true';
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
                return $.grep(Object.keys($scope.filters), function(value) {
                  return value.replace('Filter', 'Id') != $scope.initialFilter.name;
                });
            };

            $scope.currentFilter =  function(key)
            {
                for (var i = 0; i<$scope.filter.length; i++)
                {
                  if ($scope.filter[i].name == key)
                    return $scope.filter[i].title;
                }
                return null;
            }

            $scope.doFilter = function(filterKey, filter){
                $scope.page = 1;
                $scope.filter.push({name: filterKey.replace('Filter', 'Id'), value: filter.Id, title: filter.Title });
                $scope.getSuppliers();
            };

            $scope.doQuery = function(){
                //query string is set in the UI
                $scope.page = 1;
                $scope.filtersSelected = undefined;
                $scope.getSuppliers();
            }

            $scope.clearAllFilters = function() {
                $scope.filter = [];
                $scope.page = 1;
                $scope.getSuppliers();
            }

            $scope.clearFilter = function(filter) {
              $scope.filter = jQuery.grep($scope.filter, function(value) {
                return value.name != filter;
              });
              $scope.page = 1;
              $scope.getSuppliers();
            }

            stateService
                .getAllCities()
                .then(function (response) {
                   $scope.cities = response.data;
                });
        }
    ]
);
