'use strict';
app.factory('plannerService', ['$http', '$q', 'ngAuthSettings', function ($http, $q, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var plannerServiceFactory = {};
    var _events = [];
    
    

    var _getEvents = function () {
        return $http.get(serviceBase + 'api/events')
    };

    var _getEvent = function (eventId) {
        return $http.get(serviceBase + 'api/events/' + eventId)
    };

    var _saveEvent = function (event) {
        return $http.post(serviceBase + 'api/events', event)
    };

    var _updateEvent = function (event) {
        return $http.put(serviceBase + 'api/events/' + event.Id, event);
    };

    var _delete = function (event) {
        return $http.delete(serviceBase + 'api/events/' + event.Id);
    };

    plannerServiceFactory.events = _events;
    plannerServiceFactory.getEvent = _getEvent;
    plannerServiceFactory.getEvents = _getEvents;
    plannerServiceFactory.saveEvent = _saveEvent;
    plannerServiceFactory.updateEvent = _updateEvent;
    plannerServiceFactory.deleteEvent = _delete;
    
    return plannerServiceFactory;
}]);