'use strict';
app.factory('eventService', ['$http', 'ngAuthSettings',function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var eventServiceFactory = {};

    var _createBudgetItem = function (budgetItem) {
        return $http.post(serviceBase + 'api/events/'+ budgetItem.EventId +'/budgetitems', budgetItem);
    };

    var _deleteBudget = function (budgetId) {
        return $http.delete(serviceBase + 'api/budgetitems/' + budgetId);
    };

    var _createPayment = function (budgetId, payment) {
        return $http.post(serviceBase + 'api/budgetitems/'+ budgetId +'/payments', payment);
    };

    var _deletePayment = function (paymentId) {
        return $http.delete(serviceBase + 'api/payments/'+ paymentId);
    };

    var _getBudgets = function (eventId) {
        return $http.get(serviceBase + 'api/events/' + eventId + '/budgetitems');
    };

    eventServiceFactory.createBudgetItem = _createBudgetItem;
    eventServiceFactory.deleteBudget = _deleteBudget;
    eventServiceFactory.getBudgets = _getBudgets;
    eventServiceFactory.createPayment = _createPayment;
    eventServiceFactory.deletePayment = _deletePayment;

    return eventServiceFactory;
}]);