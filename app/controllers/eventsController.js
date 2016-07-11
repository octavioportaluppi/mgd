'use strict';
app.controller(
    'eventsController', 
    [
        '$scope', 
        '$routeParams', 
        'supplierService', 
        function ($scope, $routeParams , supplierService) {

            $scope.page = 1;
            $scope.size = 5;

            $scope.getSuppliers = function (){
                supplierService
                    .getSuppliersByEvent(
                        $routeParams.eventId, 
                        $scope.size,
                        $scope.page)
                    .success(function (response){
                        $scope.suppliers = response.Content;
                    })
            };

            $scope.nextPage = function(){
                $scope.page = $scope.page + 1;
                $scope.getSuppliers();
            };

            $scope.getSuppliers();
            
            supplierService
                .getEvents()
                .then(function(response){
                    $scope.event = response.data.find(function(item){
                        return item.Id == $routeParams.eventId;
                    })

                })
        }
    ]
);