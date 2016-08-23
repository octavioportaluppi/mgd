'use strict';
app.factory('stateService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var stateServiceFactory = {};

    var _getStates = function () {
        return $http.get(serviceBase + 'api/States');
    };

    var _getCities = function (stateId) {
        return $http.get(serviceBase + 'api/States/' + stateId + '/Cities');
    };

    var _getAllCities = function () {
        return $http.get(serviceBase + 'api/cities');
    };

    stateServiceFactory.getStates = _getStates;
    stateServiceFactory.getCities = _getCities;
    stateServiceFactory.getAllCities = _getAllCities;

    return stateServiceFactory;
}]);