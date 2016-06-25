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

            $scope.eventItems = [
                {
                    id: 1,
                    name:"Bodas",
                    icon:"bodas"
                }, 
                {
                    id: 2,
                    name:"Cumpleaños",
                    icon:"cumpleanos"
                }, 
                {
                    id: 3,
                    name:"Quinceañeras",
                    icon:"quinceaneras"
                }, 
                {
                    id: 4,
                    name:"Graduaciones",
                    icon:"graduaciones"
                }, 
                {
                    id: 7,
                    name:"Bautizos",
                    icon:"bautizo"
                }, 
                {
                    id: 8,
                    name:"Conferencias",
                    icon:"conferencias"
                }, 
                {
                    id: 9,
                    name:"Showers",
                    icon:"showers"
                }, 
                {
                    id: 10,
                    name:"Otros",
                    icon:"icon_otros"
                }
            ];
        }
    ]
);