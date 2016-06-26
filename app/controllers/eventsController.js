'use strict';
app.controller(
    'eventsController', 
    [
        '$scope', 
        '$routeParams', 
        'supplierService', 
        function ($scope, $routeParams , supplierService) {

            /*
            supplierService
                .getSuppliersByEvent($routeParams.eventId)
                .success(function (response){
                    $scope.suppliers = response;
                })
            */

            $scope.suppliers = [
                {
                   id: 1,
                   name: 'someName',
                   description: 'someDescription' 
                },
                {
                   id: 1,
                   name: 'someName',
                   description: 'someDescription' 
                },
                {
                   id: 1,
                   name: 'someName',
                   description: 'someDescription' 
                },
                {
                   id: 1,
                   name: 'someName',
                   description: 'someDescription' 
                }
            ]

            $scope.eventId = $routeParams.eventId;

        }
    ]
);