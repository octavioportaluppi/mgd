'use strict';

var controllerAgenda = ['$scope', 'supplierService', 'agendaService',
    function ($scope, supplierService, agendaService) {

        $scope.serviceTypes = {};
        $scope.newTask = {};
        $scope.taskItem = [];
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
            startingDay: 1
        };

        $scope.openDatePicker = function () {
            $scope.datepicker.opened = true;
        };

        $scope.createTask = function (form) {
            if(!form.$valid) {
                return;
            }
            $scope.newTask.EventId = $scope.id;
            $scope.newTask.Status = '0';
            agendaService
                .createTaskItems($scope.id,$scope.newTask)
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
                    $scope.taskItem = response.data.Content;
                    $scope.filters = {};
                    $scope.filters.today = response.data.TodayCount;
                    $scope.filters.week = response.data.WeekCount;
                    $scope.filters.services = response.data.CategoryCounts;
                });
        };

        $scope.getItems();


        supplierService
            .getServices()
            .then(function (res) {
                $scope.serviceTypes = res.data
            });

        $scope.deleteItem = function(id) {
            agendaService
                .deletTaskItems($scope.id, id)
                .then(function () {
                    $scope.getItems();
                })


        };

        $scope.update = function(id, task) {

            task.ServiceTypeId = task.ServiceType.Id;

            agendaService
                .putTaskItems($scope.id,id, task)
                .then(function () {
                    $scope.editTask = false;
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