'use strict';

var controllerAgenda = ['$scope', 'supplierService', 'agendaService','eventService',
    function ($scope, supplierService, agendaService) {

        $scope.serviceTypes = {};
        $scope.newTask = {};
        $scope.taskItem = {};
        $scope.addTask = false;
        $scope.editTask = false;

        $scope.datepicker = {
            opened: false
        };

        $scope.altInputFormats = ['M!-d!-yyyy'];

        $scope.dateOptions = {
            appendToBody: true,
            placement: 'top-right',
            formatYear: 'yy',
            maxDate: new Date(),
            startingDay: 1
        };

        $scope.openDatePicker = function () {
            $scope.datepicker.opened = true;
        };

        $scope.createTask = function () {
            $scope.newTask.EventId = $scope.id;
            $scope.newTask.Status = 0;
            agendaService
                .createTaskItems($scope.newTask)
                .then(function () {
                    $scope.newTask = {};
                    $scope.addTask = !$scope.addTask;
                    $scope.getItems()
                });
        };

        $scope.getItems = function () {
            agendaService
                .getTaskItems($scope.id)
                .then(function(response){
                    $scope.taskItem = response.data
                });
        };

        $scope.getItems();


        supplierService
            .getServices()
            .then(function (res) {
                $scope.serviceTypes = res.data
            });

        $scope.deleteItem = function(eventId) {
            agendaService
                .deletTaskItems(eventId)
                .then(function () {
                    $scope.getItems();
                })


        };

        $scope.update = function(eventId) {
            agendaService
                .putTaskItems(eventId)
                .then(function () {
                    $scope.editTask = !$scope.editTask;
                    $scope.getItems();
                })
        }
    }];

app.directive('myAgenda', function () {
    return {
        restrict: 'E',
        scope: {
            id: '='
        },
        templateUrl: '/app/views/my-agenda.html',
        controller: controllerAgenda
    };
});