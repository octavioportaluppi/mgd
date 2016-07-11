'use strict';
app.factory('plannerService', ['$http', '$q', 'ngAuthSettings', function ($http, $q, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var plannerServiceFactory = {};
    var _events = [];

    var _getEvents = function () {
        return $http.get(serviceBase + 'api/events')
    };

    var _getEvent = function (eventId) {

        var deferred = $q.defer();

        $http.get(serviceBase + 'api/events/' + eventId).then(function (res) {
            deferred.resolve(res.data);
        }, function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _saveEvent = function (event) {
        
        var deferred = $q.defer();

        $http.post(serviceBase + 'api/events', event).then(function (res) {
            deferred.resolve(res);
        }, function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;        
    }

    var _updateEvent = function (event) {

        var deferred = $q.defer();
        
        $http.put(serviceBase + 'api/events', event).success(function (res) {
            deferred.resolve(res);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;

    };

    plannerServiceFactory.events = _events;
    plannerServiceFactory.getEvent = _getEvent;
    plannerServiceFactory.getEvents = _getEvents;
    plannerServiceFactory.saveEvent = _saveEvent;
    plannerServiceFactory.updateEvent = _updateEvent;
    
    return plannerServiceFactory;
}]);