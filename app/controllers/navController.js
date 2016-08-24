'use strict';
app.controller('navController', ['$scope', '$location', 'authService', 'supplierService', function ($scope, $location, authService, supplierService) {

  $scope.navigationItems = {
    CityFilter: [],
    EventTypeFilter: [],
    ServiceTypeFilter: []
  };
	$scope.plannerCollapsed = true;
	$scope.suppliersCollapsed = true;
  $scope.isCollapsed = true;

  $scope.logOut = function () {
      authService.logOut();
      $location.path('/');
  };

  $scope.goHome = function () {
      $location.path('/');
  };

  $scope.authentication = authService.authentication;

	//britez
	$scope.isActive = function(currentLocation) {
		return $location.path() == currentLocation;
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
