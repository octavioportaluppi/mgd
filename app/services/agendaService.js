'use strict';
app.factory('agendaService', ['$http', 'ngAuthSettings',function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var agendaServiceFactory = {};


    var _createTaskItems = function (task) {
        return $http.post(serviceBase + 'api/TaskItems', task);
    };

    var _getTaskItems = function(eventId){
        return $http.get(serviceBase + 'api/events/' + eventId + '/taskItems');
    };

    var _deleteTaskItems = function (eventId) {
        return $http.delete(serviceBase + 'api/TaskItems/' + eventId);
    };

    var _putTaskItems = function (eventId) {
        return $http.put(serviceBase + 'api/TaskItems/' + eventId);
    };


    agendaServiceFactory.createTaskItems = _createTaskItems;
    agendaServiceFactory.getTaskItems = _getTaskItems;
    agendaServiceFactory.deletTaskItems = _deleteTaskItems;
    agendaServiceFactory.putTaskItems = _putTaskItems;


    return agendaServiceFactory;
}]);