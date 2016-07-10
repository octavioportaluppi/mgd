'use strict';

var controller = ['$scope', 'supplierService', 'ngAuthSettings', 'stateService',
    function ($scope, supplierService, ngAuthSettings, stateService){

    $scope.size = 5;
    $scope.page = 1;

    $scope.getSuppliers = function (){
        supplierService
            .getAllSuppliers(
            $scope.size,
            $scope.page)
            .success(function (response){
                $scope.suppliers = response.Content;
                $scope.suppliers.forEach(function(supplier){
                    if (supplier.LogoId > 0)
                        supplier.LogoUrl = ngAuthSettings.apiServiceBaseUri + '/api/Pictures/' + supplier.LogoId + '/Image';
                })
            })
    };

    $scope.getSuppliers();

    stateService
        .getAllCities()
        .then(function (response) {
           $scope.cities = response.data;
        });




}];

app.directive('mySupplierList', function() {
    return {
        restrict: 'E',
        scope: {
            title: '@',
            descripion: '@'
        },
        templateUrl: '/app/views/my-suppliers-list.html',
        controller: controller
    };
});