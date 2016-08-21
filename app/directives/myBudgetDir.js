'use strict';

var budgetController = ['$scope', 'eventService',
    function ($scope, eventService){

        $scope.budgets = [];
        $scope.newPayment = {};

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
                    form.$setUntouched();
                    form.$setPristine();
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
                            totalFinal += parseInt(budget.PayedSoFar);
                        });
                    $scope.total = {Title: 'Total', Initial: totalInitial, Final: totalFinal}
                })
        };

        $scope.addPayment = function(budgetId, form){
            if(!form.$valid){
                return;
            }
            eventService
                .createPayment(budgetId, $scope.newPayment)
                .then(function () {
                    $scope.newPayment = {};
                    form.$setUntouched();
                    form.$setPristine();
                    $scope.getBudgets();
                });
        };

        $scope.deleteBudget = function(budgetId) {
            eventService
                .deleteBudget(budgetId)
                .then(function () {
                    $scope.getBudgets();
                })
        };

        $scope.deletePayment = function(paymentId) {
            eventService
                .deletePayment(paymentId)
                .then(function () {
                    $scope.getBudgets();
                })
        };

        $scope.selectBudget = function(budget) {
            $scope.budgets.forEach(function (item){
                if(item.Id === budget.Id){
                    return;
                }
                item.showChilds = false;
                item.showForm = false;
            });
            budget.showChilds = !budget.showChilds;
            budget.showForm = !budget.showForm;
            $scope.newPayment = {};
        };

        $scope.getBudgets();

        eventService
            .getPaymentModes()
            .then(function(response){
                $scope.paymentModes = response.data;
            });

        $scope.getPaymentMode = function (paymentMode){
            if (!$scope.paymentModes){
                return;
            }
            return $scope
                .paymentModes
                .find(function (payment){
                    return payment.Value == paymentMode;
                })
        }

}];

app.directive('myBudget', function() {
    return {
        restrict: 'E',
        scope: {
            id: '=',
            event: '='
        },
        templateUrl: '/app/views/my-budget.html',
        controller: budgetController
    };
});