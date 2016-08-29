'use strict';
app.controller('contactController', ['$scope', '$location', 'authService', 'contactService', function ($scope, $location, authService, contactService) {

  $scope.name = '';
  $scope.email = '';
  $scope.phone = '';
  $scope.message = '';
  $scope.loading = false;
  $scope.response = false;

  $scope.contactSubmit = function () {
      $scope.loading = true;
      var props = {
        name: $scope.name,
        email: $scope.email,
        phone: $scope.phone,
        message: $scope.message
      };
      contactService.sendContactInfo(props).then(
        function (response) {
        $scope.loading = false;
        $scope.response = true;
      }, function (response) {
        $scope.loading = false;
        $scope.response = true;
      }
      )
  }

  $scope.init = function() {}

  $scope.init();
}]);
