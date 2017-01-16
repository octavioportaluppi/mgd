'use strict';
app.controller('navController', ['$scope', '$location', 'authService', 'supplierService', 'stateService',
function ($scope, $location, authService, supplierService, stateService) {

  $scope.navigationItems = {
    CityFilter: [],
    EventTypeFilter: [],
    ServiceTypeFilter: []
  };

  $scope.init = function() {

    supplierService
      .getEvents()
      .then(function(res) {
        $scope.navigationItems.EventTypeFilter = res.data;
      });

      supplierService
        .getServices()
        .then(function(res) {
          $scope.navigationItems.ServiceTypeFilter = res.data.slice(0, 5);
        });

        stateService
          .getAllCities()
          .then(function(res) {
            $scope.navigationItems.CityFilter = res.data.slice(0, 5);
        });
  }

  $scope.init();
}]);
