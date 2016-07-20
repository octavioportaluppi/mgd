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

    var _getPaymentModes = function () {
        return $http.get(serviceBase + 'api/paymentModes');
    };

    var _getGuests = function (eventId) {
        return $http.get(serviceBase + 'api/events/'+eventId+'/guests')
    };

    var _createGuests = function (eventId, groupGuestId, guest) {
        return $http.post(serviceBase + 'api/events/'+eventId+'/guestsgroups/'+groupGuestId+'/guests', guest)
    };

    var _createGuestGroups = function (eventId, guestGroup) {
        return $http.post(serviceBase + 'api/events/'+eventId+'/guestsgroups', guestGroup)
    };

    var _updateGuest = function (guest) {
        return $http.put(serviceBase + 'api/guests', guest)
    };

    var _getGuestGroups = function(eventId) {
        return $http.get(serviceBase + 'api/events/' + eventId + '/guestsgroups')
    };

    eventServiceFactory.createBudgetItem = _createBudgetItem;
    eventServiceFactory.deleteBudget = _deleteBudget;
    eventServiceFactory.getBudgets = _getBudgets;
    eventServiceFactory.createPayment = _createPayment;
    eventServiceFactory.deletePayment = _deletePayment;
    eventServiceFactory.getPaymentModes = _getPaymentModes;
    eventServiceFactory.getGuests = _getGuests;
    eventServiceFactory.createGuest = _createGuests;
    eventServiceFactory.updateGuest = _updateGuest;
    eventServiceFactory.getGuestGroups = _getGuestGroups;
    eventServiceFactory.createGuestGroup = _createGuestGroups;

    return eventServiceFactory;
}]);