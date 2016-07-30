'use strict';

var controller = ['$scope', 'eventService', 'supplierService', 'ngAuthSettings',
    function ($scope, eventService, supplierService, ngAuthSettings){

        $scope.getSuppliers = function () {
            eventService
                .getSuppliers($scope.id)
                .then(function (response){
                    $scope.suppliers = response.data;
                    $scope.addNew = false;
                    $scope.showServices = true;
                    $scope.showSuppliers = false;
                });
        };

        $scope.getSuppliers();

        $scope.addNewSupplier = function () {
            supplierService
                .getServices()
                .then(function(response) {
                    $scope.services = response.data;
                    $scope.addNew = true;
                    $scope.showServices = true;
                    $scope.showSuppliers = false;
                    $scope.availableSuppliers = [];
                    $scope.page = 1;
                });
        };

        $scope.page = 1;
        $scope.availableSuppliers = [];

        $scope.getSuppliersByService = function (serviceId) {
            $scope.currentServiceId = serviceId;
            supplierService
                .getAllSuppliers(10, $scope.page, {name: 'ServiceTypeId', value: serviceId})
                .then(function(response) {
                    $scope.availableSuppliers = $scope.availableSuppliers.concat(response.data.Content);
                    $scope.availableSuppliers .forEach(function(supplier) {
                        if (supplier.LogoId > 0)
                            supplier.LogoUrl = ngAuthSettings.apiServiceBaseUri + '/api/Pictures/' + supplier.LogoId + '/Image';
                    });
                    $scope.totalPages = response.data.TotalPages;
                    $scope.addNew = true;
                    $scope.showServices = false;
                    $scope.showSuppliers = true;
                });
        };

        $scope.nextPage = function(){
            if($scope.page == $scope.totalPages){
                return;
            }
            $scope.page = $scope.page + 1;
            $scope.getSuppliersByService($scope.currentServiceId);
        };

        $scope.subscribe = function (supplierId) {
            eventService
                .subscribeSupplier($scope.id, supplierId)
                .then(function () {
                    $scope.getSuppliers();
                });
        };

        $scope.unsubscribe = function (supplierId) {
            eventService
                .unsubscribeSupplier($scope.id, supplierId)
                .then(function () {
                    $scope.getSuppliers();
                });
        };

        $scope.isSubscribed = function (supplierId) {
            var result = $scope.suppliers.find(function (supplier) {
                return supplier.Id === supplierId;
            });

            return typeof result != 'undefined';
        };

        $scope.tackSupplier = function (supplierId) {
            eventService
                .tackSupplier($scope.id, supplierId, !$scope.isTacked(supplierId))
                .then(function () {
                    $scope.getSuppliers();
                })
        };

        $scope.isTacked = function (supplierId) {
            var result = $scope.suppliers.find(function (supplier) {
                return supplier.Id === supplierId;
            });

            return typeof result != 'undefined' && result.IsFavourite;
        };
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