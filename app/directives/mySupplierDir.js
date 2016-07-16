'use strict';

var controller = ['$scope',
    function ($scope){

}];

app.directive('mySupplier', function() {
    return {
        restrict: 'E',
        scope: {
            id: '@'
        },
        templateUrl: '/app/views/my-supplier.html',
        controller: controller
    };
});