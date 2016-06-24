'use strict';
app.controller('tasksController', ['$scope', function ($scope) {
    $scope.tasks = [
        {
            taskItems: []
        }
    ];

    $scope.pendingChanges = false;
    
    $scope.taskEdit = false;

    $scope.newTask = {
        Title: '',
        ServiceType: 0,
        DueDate: '',
        Notes: '',
        Status: 0
    };

    $scope.datepicker = {
        opened: false
    };

    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.dateOptions = {
        appendToBody: true,
        placement: 'top-right',
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.addTask = function() {
        if ($scope.newTask.Title != '') {
            $scope.tasks[0].taskItems.push($scope.newTask);
        }
        $scope.newTask = {
            Title: '',
            ServiceType: 0,
            DueDate: '',
            Notes: '',
            Status: 0
        };

        $scope.pendingChanges = true;
    };

    $scope.saveTasks = function() {
    };

    $scope.openDatePicker = function() {
        $scope.datepicker.opened = true;
    };

}]);