'use strict';
app.factory('eventService', ['$http', 'ngAuthSettings',function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var eventServiceFactory = {};

    var _createBudgetItem = function (budgetItem) {
        return $http.post(serviceBase + 'api/events/'+ budgetItem.EventId +'/budgetitems', budgetItem);
    };

    var _getBudgets = function (eventId) {
        return $http.get(serviceBase + 'api/events/' + eventId + '/budgetitems');
    };

    eventServiceFactory.createBudgetItem = _createBudgetItem;
    eventServiceFactory.getBudgets = _getBudgets;

    return eventServiceFactory;
}]);