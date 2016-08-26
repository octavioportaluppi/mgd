'use strict';
app.controller('navController', ['$scope', '$location', 'authService', 'supplierService', function ($scope, $location, authService, supplierService) {

  $scope.navigationItems = {
    CityFilter: [],
    EventTypeFilter: [],
    ServiceTypeFilter: []
  };

  $scope.init = function() {
    supplierService
      .getAllSuppliers()
      .then(function(res) {
        $scope.navigationItems = res.data.QueryFilterInfo;
        $scope.navigationItems.EventTypeFilter = res.data.QueryFilterInfo.EventTypeFilter.slice(0, 5);
        $scope.navigationItems.ServiceTypeFilter = res.data.QueryFilterInfo.ServiceTypeFilter.slice(0, 5);
      });
  }

  $scope.init();
}]);
