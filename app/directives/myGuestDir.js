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

    $scope.deleteGuest = function (groupId, guestId) {
      eventService
          .deleteGuest($scope.id, groupId, guestId)
          .then(function (){
              $scope.getGuests();
          })
    };

    $scope.updateGuest = function (form, guest) {
        if(!form.$valid) {
            return;
        }

        guest.GuestsGroupId = guest.Group.Id;

        eventService
            .updateGuest(
                $scope.id,
                guest.OldGroupId,
                guest.Id,
                guest)
            .then(function () {
                $scope.getGuests();
            })
    };

    $scope.updateGuestGroup = function (form, guestGroup) {
        if(!form.$valid) {
            return;
        }
        eventService
            .updateGuestGroup($scope.id, guestGroup.Id, guestGroup)
            .then(function(){
                $scope.getGuests();
            })
    };

    $scope.deleteGuestGroup = function (guestGroupId) {
        eventService
            .deleteGuestGroup($scope.id, guestGroupId)
            .then(function () {
                $scope.getGuests();
            })
    };

    $scope.getGuests();

}];

app.directive('myGuest', function() {
    return {
        restrict: 'E',
        scope: {
            id: '=',
            event: '='
        },
        templateUrl: '/app/views/my-guest.html',
        controller: guestController
    };
});