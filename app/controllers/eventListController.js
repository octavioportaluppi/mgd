'use strict';
app.controller(
    'eventListController', 
    [
        '$scope', 
        '$routeParams', 
        'supplierService', 
        function ($scope, $routeParams , supplierService) {

            supplierService
                .getEvents()
                .then(function(response){
                    $scope.eventItems = response;
                })
        }
    ]
);