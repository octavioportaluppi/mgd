'use strict';

var guestController = ['$scope', 'eventService',
    function ($scope, eventService){

    $scope.newGuest = {};
    $scope.newGuest.IsConfirmed = false;

    $scope.newGuestGroup = {};

    $scope.createGuest = function (form){
        if(!form.$valid) {
            return;
        }

        eventService
            .createGuest($scope.id, $scope.newGuest.GroupGuestId, $scope.newGuest)
            .then(function (){
                $scope.getGuests();
                $scope.newGuest = {};
                form.$setUntouched();
                form.$setPristine();
            })
    };

    $scope.createGuestGroup = function (form) {
        if(!form.$valid) {
            return;
        }
        eventService
            .createGuestGroup($scope.id, $scope.newGuestGroup)
            .then(function () {
                $scope.getGuests();
                $scope.newGuestGroup = {};
                form.$setUntouched();
                form.$setPristine();
            })
    };

    $scope.getGuests = function () {
        eventService
            .getGuests($scope.id)
            .then(function (response){
                $scope.guests = response.data;
                $scope.getGuestGroups();
            })
    };

    $scope.updateGuest = function (form) {
        if(!form.$valid) {
            return;
        }
        eventService
            .updateGuest($scope.editGuest)
            .then(function (){
                $scope.getGuests();
            });
    };

    $scope.getGuestGroups = function () {
        eventService
            .getGuestGroups($scope.id)
            .then(function (response) {
                $scope.guestGroups = response.data;
                $scope
                    .guestGroups
                    .forEach(function (group) {
                        group.guests = $scope
                            .guests
                            .filter(function (guest){ return guest.Group.Id === group.Id })
                    })
            })
    };

    $scope.getGuests();

}];

app.directive('myGuest', function() {
    return {
        restrict: 'E',
        scope: {
            id: '='
        },
        templateUrl: '/app/views/my-guest.html',
        controller: guestController
    };
});