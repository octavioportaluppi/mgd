'use strict';
app.controller('indexController', ['$scope', '$location', 'authService', '$uibModal', function ($scope, $location, authService, $uibModal) {
  	$scope.collapsed = 'lalalalalalal';
  	$scope.plannerCollapsed = true;
  	$scope.suppliersCollapsed = true;

	$scope.signup = function() {

	var modalInstance = $uibModal.open({
  		animation: true,
	      templateUrl: '/app/views/signup-modal.html',
	      controller: 'modalController'
	    });
	};

    $scope.logOut = function () {
        authService.logOut();
        $location.path('/');
    };

    $scope.authentication = authService.authentication;

	//britez
	$scope.isActive = function(currentLocation) {
		return $location.path() == currentLocation;
	}

	$scope.isCollapsed = function() {
		return $scope.collapsed;
	}

}]);

app.controller('modalController', function ($scope, $uibModalInstance, $location) {

	$scope.cancel = function () {
    	$uibModalInstance.close();
  	};
    
    $scope.planner = function () {
        $location.path('/signup-planner');
    	$uibModalInstance.close();
  	};

  	$scope.supplier = function () {
        $location.path('/signup-supplier');
    	$uibModalInstance.close();
    };
});