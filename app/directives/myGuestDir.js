'use strict';

var controller = ['$scope',
    function ($scope){

}];

app.directive('myGuest', function() {
    return {
        restrict: 'E',
        scope: {
            id: '@'
        },
        templateUrl: '/app/views/my-guest.html',
        controller: controller
    };
});