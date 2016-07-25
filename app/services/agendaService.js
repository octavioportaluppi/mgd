'use strict';
app.factory('agendaService', ['$http', 'ngAuthSettings',function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var agendaServiceFactory = {};

    var _createTaskItems = function (eventId , task) {
        return $http.post(serviceBase + 'api/Events/' + eventId + '/TaskItems', task);
    };

    var _getTaskItems = function(eventId, filters){
        if(!filters) { filters = {} };
        return $http.get(serviceBase + 'api/events/' + eventId + '/taskItems', filters);
    };

    var _deleteTaskItems = function (eventId,id) {
        return $http.delete(serviceBase + 'api/Events/' + eventId + '/TaskItems/' + id );
    };

    var _putTaskItems = function (eventId , id, task) {
        return $http.put(serviceBase + 'api/Events/' + eventId + '/TaskItems/' + id, task);
    };

    var _completeTask = function (eventId, id) {
        return $http.post(serviceBase + 'api/Events/' + eventId + '/TaskItems/' + id + '/Completed', {});
    };

    agendaServiceFactory.createTaskItems = _createTaskItems;
    agendaServiceFactory.getTaskItems = _getTaskItems;
    agendaServiceFactory.deletTaskItems = _deleteTaskItems;
    agendaServiceFactory.putTaskItems = _putTaskItems;
    agendaServiceFactory.completeTask = _completeTask;

    return agendaServiceFactory;
}]);