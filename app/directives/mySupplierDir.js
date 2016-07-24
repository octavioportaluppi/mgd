'use strict';

var controller = ['$scope', 'eventService', 'supplierService',
    function ($scope, eventService, supplierService){
/*
        eventService
            .getSuppliers($scope.id)
            .then(function (response){
                $scope.suppliers = response.data;
            })

        supplierService
            .getServices()
            .then(function(response) {
                $scope.services = response.data;
            });

        supplierService
            .getPremiumSuppliers()
            .then(function (response) {
                $scope.premiumSuppliers = response.data;
            })
*/
}];

app.directive('mySupplier', function() {
    return {
        restrict: 'E',
        scope: {
            id: '='
        },
        templateUrl: '/app/views/my-supplier.html',
        controller: controller
    };
});