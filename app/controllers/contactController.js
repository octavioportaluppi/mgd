'use strict';
app.controller('contactController', ['$scope', '$location', 'authService', 'contactService', function ($scope, $location, authService, contactService) {

  $scope.name = '';
  $scope.email = '';
  $scope.phone = '';
  $scope.message = '';
  $scope.loading = false;
  $scope.response = false;
$scope.contact = {};
        $scope.contactSubmit = function (contactForm) {

            if (contactForm.$valid) {
                //$scope.loading = true;
                /*var props = {
                    Name: $scope.name,
                    Email: $scope.email,
                    Phone: $scope.phone,
                    Message: $scope.message
                };*/
                //console.log(props);
                contactService.sendContactInfo($scope.contact).then(
                        function (response) {
                            $scope.loading = false;
                            $scope.response = true;
                        }, function (response) {
                    $scope.loading = false;
                    $scope.response = true;
                });
            }
        }

  $scope.init = function() {}

  $scope.init();

}]);
