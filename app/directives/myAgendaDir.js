'use strict';

var controllerAgenda = ['$scope', 'supplierService', 'agendaService',
    function ($scope, supplierService, agendaService) {

        $scope.serviceTypes = {};
        $scope.newTask = {};
        $scope.taskItem = [];
        $scope.addTask = false;
        $scope.editTask = false;
        $scope.showTask = false;
        $scope.itemTask = {};

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
                    form.$setUntouched();
                    form.$setPristine();
                    $scope.selectedFilter = 'all';
                    $scope.addTask = !$scope.addTask;
                    $scope.getItems()
                });
        };

        $scope.getItems = function (filter) {
            agendaService
                .getTaskItems($scope.id, filter)
                .then(function(response){
                    if(!filter) {
                        $scope.total = response.data.Content.length;
                    }
                    $scope.handleResponse(response);
                    $scope.updateFilters(response);
                });
        };

        $scope.getTodayItems = function () {
            var filter = { params: {fromDate: new Date(), toDate: new Date()}};
            $scope.getItems(filter);
        };

        $scope.getWeekItems = function () {
            var curr = new Date;
            var first = curr.getDate() - curr.getDay();
            var last = first + 6;

            var firstDay = new Date(curr.setDate(first));
            var lastDay = new Date(curr.setDate(last));
            var filter = { params: { fromDate: firstDay, toDate: lastDay}};
            $scope.getItems(filter);
        };

        $scope.getServiceItems = function (serviceId) {
            var params = { params: { ServiceTypeId: serviceId }};
            $scope.getItems(params);
        };

        $scope.handleResponse = function (response){
            $scope.taskItem = response.data.Content;
            if($scope.taskItem.length > 0)
                $scope.getOneTask($scope.taskItem[0]);
            else
                $scope.taskItemSelected = undefined;
        };

        $scope.updateFilters = function (response){
            $scope.filters = {};
            $scope.filters.today = response.data.TodayCount;
            $scope.filters.week = response.data.WeekCount;
            $scope.filters.services = response.data.CategoryCounts;
        };

        $scope.doFilter = function (filter, param) {
            var resultFilter = $scope.availableFilters[filter];
            if(!resultFilter) { return; }
            if(!param) {
                $scope.selectedFilter = filter;
            } else {
                $scope.selectedFilter = param;
            }
            resultFilter(param);
        };

        $scope.completeTask = function (task) {
            agendaService
                .completeTask($scope.id, task.Id)
                .then(function (response) {
                    if(task.Id === $scope.taskItemSelected.Id) {
                        $scope.taskItemSelected.Status = response.data;
                    }
                    var elem = $scope.taskItem.find(function (item){
                        return item.Id === task.Id;
                    });
                    if(elem) {
                        elem.Status = response.data;
                    }
                });
        };

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

        $scope.update = function(form) {

            if(!form.$valid) {
                return;
            }

            var task = $scope.taskItemSelected;

            task.ServiceTypeId = task.ServiceType.Id;

            agendaService
                .putTaskItems($scope.id, task.Id, task)
                .then(function () {
                    $scope.editTask = false;
                    $scope.getItems();
                })
        };

        $scope.edit = function () {
            $scope.taskItemSelected.DueDate = new Date($scope.taskItemSelected.DueDate);
            $scope.taskItemSelected.edit = true;
        };

        $scope.selectTaskItem = function(taskItem) {
            $scope.taskItem.forEach(function (item) {item.selected = false;});
            taskItem.selected = true;
        };

        $scope.getOneTask = function(itemTask) {

            $scope.selectTaskItem(itemTask);

            itemTask.ServiceTypeId = itemTask.ServiceType.Id;
            agendaService
                .getItemTask($scope.id, itemTask.Id, itemTask)
                .then(function (response) {
                    $scope.taskItemSelected = response.data;
                })
        };

        $scope.selectedFilter = 'all';
        $scope.availableFilters = {
            'all':$scope.getItems,
            'today':$scope.getTodayItems,
            'week':$scope.getWeekItems,
            'service': $scope.getServiceItems
        };

        $scope.getItems();
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