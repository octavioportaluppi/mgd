'use strict';

var controller = ['$scope',
    function ($scope){

}];

app.directive('myAgenda', function() {
    return {
        restrict: 'E',
        scope: {
            id: '@'
        },
        templateUrl: '/app/views/my-agenda.html',
        controller: controller
    };
});