'use strict';

var budgetController = ['$scope', 'eventService',
    function ($scope, eventService){

        $scope.budgets = [];
        $scope.newSubBudget = {};

        $scope.createBudget = function (form) {
            if(!form.$valid) {
                return;
            }
            $scope.newBudget.EventId = $scope.id;
            $scope.newBudget.Notes = '';
            eventService
                .createBudgetItem($scope.newBudget)
                .then(function(){
                    $scope.newBudget = {};
                     $scope.getBudgets();
                })
        };

        $scope.getBudgets = function() {
            eventService
                .getBudgets($scope.id)
                .then(function (response){
                    $scope.budgets = response.data;
                    var totalInitial = 0;
                    var totalFinal = 0;
                    $scope
                        .budgets
                        .forEach(function (budget) {
                            totalInitial += parseInt(budget.Initial);
                            totalFinal += parseInt(budget.Final);
                        });
                    $scope.total = {Title: 'Total', Initial: totalInitial, Final: totalFinal}
                })
        };

        $scope.addSubBudget = function(budget){
            if(!budget.subBudgets) {
                budget.subBudgets = [];
            }
            budget.subBudgets.push(angular.copy($scope.newSubBudget));
            budget.showForm = false;
            $scope.newSubBudget = {};
        };

        $scope.selectBudget = function(budget) {
            $scope.budgets.forEach(function (item){
                item.showChilds = false;
                item.showForm = false;
            });
            budget.showChilds = true;
            budget.showForm = true;
        };

        $scope.getBudgets();

}];

app.directive('myBudget', function() {
    return {
        restrict: 'E',
        scope: {
            id: '='
        },
        templateUrl: '/app/views/my-budget.html',
        controller: budgetController
    };
});