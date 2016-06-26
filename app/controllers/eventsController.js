'use strict';
app.controller(
    'eventsController', 
    [
        '$scope', 
        '$routeParams', 
        'supplierService', 
        function ($scope, $routeParams , supplierService) {

            $scope.offset = 0;
            $scope.size = 5;
            $scope.eventName = $routeParams.eventName;

            $scope.getSuppliers = function (){
                supplierService
                    .getSuppliersByEvent(
                        $routeParams.eventId, 
                        $scope.size,
                        $scope.offset)
                    .success(function (response){
                        $scope.suppliers = response;
                    })
            }

            $scope.nextPage = function(){
                $scope.offset = $scope.offset + 1;
                $scope.getSuppliers();
            }

            $scope.isCurrentPage = function(pageNumber){
                return $scope.offset == pageNumber;
            }

            $scope.goPage = function(pageNumber){
                $scope.offset = pageNumber;
                $scope.getSuppliers();
            }

            $scope.getSuppliers();
        }
    ]
);