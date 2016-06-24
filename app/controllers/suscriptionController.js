'use strict';
app.controller('suscriptionController', ['$scope', function ($scope) {
  $scope.suscriptionType = [{
  	id: "1",
  	name: "free",
  	stars: 1,
  	feature1: true,
  	feature2: true,
  	feature3: true,
  	feature4: false,
  	feature5: false
  }, {
  	id: "2",
  	name: "basic",
  	stars: 2,
  	feature1: true,
  	feature2: true,
  	feature3: true,
  	feature4: true,
  	feature5: false
  }, {
  	id: "3",
  	name: "premium",
  	stars: 3,
  	feature1: true,
  	feature2: true,
  	feature3: true,
  	feature4: true,
  	feature5: true
  }];
  $scope.userSuscription = 0;
  $scope.getRating = function(num) {
  	return new Array(num);
  }
}]);