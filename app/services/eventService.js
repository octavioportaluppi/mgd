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

    var _updateGuest = function (eventId, groupId, guestId, guest) {
        return $http
            .put(serviceBase +
            'api/events/' + eventId +
            '/guestsgroups/' + groupId +
            '/guests/' + guestId, guest);
    };

    var _updateGuestGroup = function (eventId, groupId, guestGroup) {
        return $http
            .put(serviceBase +
            'api/events/' + eventId +
            '/guestsgroups/' + groupId, guestGroup);
    };

    var _getGuestGroups = function(eventId) {
        return $http.get(serviceBase + 'api/events/' + eventId + '/guestsgroups')
    };

    var _deleteGuest = function(eventId, groupId, guestId) {
        return $http
            .delete(serviceBase +
            'api/events/' + eventId +
            '/guestsgroups/' + groupId +
            '/guests/' + guestId)
    };

    var _deleteGuestGroup = function(eventId, groupId) {
        return $http
            .delete(serviceBase +
            'api/events/' + eventId +
            '/guestsgroups/' + groupId +
            '?keepGuests=true')
    };

    var _getSuppliers = function (eventId) {
        return $http.get(serviceBase + 'api/events/' + eventId + '/suppliers');
    };

    var _subscribeSupplier = function (eventId, supplierId) {
        var params = { params: { isFavourite: false } };
        return $http.post(serviceBase + 'api/events/' + eventId + '/suppliers/' + supplierId, {}, params);
    };

    var _unsubscribeSupplier = function (eventId, supplierId) {
        return $http.delete(serviceBase + 'api/events/' + eventId + '/suppliers/' + supplierId, {});
    };

    var _tackSupplier = function (eventId, supplierId, isTacked) {
        var params = { params: { isFavourite: isTacked } };
        return $http.put(serviceBase + 'api/events/' + eventId + '/suppliers/' + supplierId, {}, params);
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
    eventServiceFactory.updateGuestGroup = _updateGuestGroup;
    eventServiceFactory.deleteGuest = _deleteGuest;
    eventServiceFactory.deleteGuestGroup = _deleteGuestGroup;

    eventServiceFactory.getSuppliers = _getSuppliers;
    eventServiceFactory.subscribeSupplier = _subscribeSupplier;
    eventServiceFactory.unsubscribeSupplier = _unsubscribeSupplier;
    eventServiceFactory.tackSupplier = _tackSupplier;

    return eventServiceFactory;
}]);