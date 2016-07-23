'use strict';
app.factory('supplierService',
    ['$http', '$q', 'ngAuthSettings', 'authService', function ($http, $q, ngAuthSettings, authService) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var supplierServiceFactory = {};

    var _suppliers = [];
    
    var _getDashboard = function () {
        var deferred = $q.defer();

        $http.get(serviceBase + 'api/suppliers/dashboard').then(function (res) {
            deferred.resolve(res.data);
        }, function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;        
    };

    var _getServices = function () {
        return $http.get(serviceBase + 'api/servicetypes');
    };

    var _getEventServices = function (event) {
        var deferred = $q.defer();
        $http.get(serviceBase + 'api/eventtypes/'+event+'/servicetypes')
            .success(function (res) {
            deferred.resolve(res);
        }).error(function (err, status) {
            console.log('error');
            deferred.reject(err);
        });
        return deferred.promise;
    };

    var _getSuppliers = function () {
        var deferred = $q.defer();
        _getEvents().then(function (events) {
            console.log(events);
            for (var i = 0; i < events.length; i++) {
                _getEventServices(events[i].Id).then(function(services) {
                    console.log(services);
                    var temp = {'services': services};
                    _suppliers.push(temp);
                }, function(err) {
                });
            };
            deferred.resolve(events);
        },  function (err, status) {
            console.log('error');
            deferred.reject(err);
        });

        return deferred.promise;

    };

    //britez
    var updateSupplierProfile = function(details, callback){
        $http.put(serviceBase + 'api/suppliers', details).then(function (){
            if(details.profilePic) {
                if(details.LogoId){
                    authService.deletePicture(details.LogoId)
                        .then(function (){
                            authService
                                .uploadLogo(details.profilePic, true)
                                .then(function (){
                                    callback();
                            });
                        })
                } else {
                    authService
                        .uploadLogo(details.profilePic, true)
                        .then(function (){
                            callback();
                        });
                }
            }
            if(details.photos && details.photos.length > 0) {
                details.photos.forEach(function(photo){
                    authService.uploadLogo(photo, false);
                })
            }
        });
    };

    var updateSuppliersService = function (services) {
        return $http
            .put(serviceBase + 'api/suppliers/servicetypes', services)
    };

    var getSuppliersByEvent = function (eventId, max, page) {
        return $http
            .get(serviceBase + 'api/suppliers',
                {
                    params: {
                        size: max, page: page, EventTypeId: eventId
                    }
                });
    };

    var getAllSuppliers = function (max, page, filter, query, cityId) {

        var params = createFilters(max, page, filter, query, cityId);

        return $http
            .get(serviceBase + 'api/suppliers',
                { params: params });
    };

    var getSuppliersById = function(id){
        return $http
            .get(serviceBase + 'api/suppliers/' + id)
    };

    var createFilters = function(max, page, filter, query, cityId){
        var params = {};
        params.size = max;
        params.page = page;
        if(filter)
            params[filter.name] = filter.value;
        if(query)
            params.query = query;
        if(cityId)
            params.CityId = cityId;
        return params;
    };

    var getAnswers = function () {
        return $http.get(serviceBase + 'api/suppliers/answers');
    };

    var getQuestions = function (serviceId) {
      return $http
          .get(serviceBase + 'api/servicetypes/' + serviceId + '/questions');
    };

    var saveQuestions = function (questions) {
        return $http
            .put(serviceBase + 'api/suppliers/answers', questions);
    };

    var _getEvents = function () {
        return $http.get(serviceBase + 'api/eventtypes');
    };

    var _getPremiumSuppliers = function () {
        return $http.get(serviceBase + 'api/suppliers/premium', {params: {max: 10}});
    };

    supplierServiceFactory.getDashboard = _getDashboard;
    supplierServiceFactory.getEvents = _getEvents;
    supplierServiceFactory.getServices = _getServices;    
    supplierServiceFactory.getEventServices = _getEventServices; 
    supplierServiceFactory.getSuppliers = _getSuppliers;   
    supplierServiceFactory.suppliers = _suppliers;   
    supplierServiceFactory.getSuppliersByEvent = getSuppliersByEvent;
    supplierServiceFactory.getAllSuppliers = getAllSuppliers;
    supplierServiceFactory.updateSuppliersService = updateSuppliersService;
    supplierServiceFactory.updateSupplierProfile = updateSupplierProfile;
    supplierServiceFactory.getQuestions = getQuestions;
    supplierServiceFactory.getAnswers = getAnswers;
    supplierServiceFactory.saveQuestions = saveQuestions;
    supplierServiceFactory.getSuppliersById = getSuppliersById;

    supplierServiceFactory.getPremiumSuppliers = _getPremiumSuppliers;

    return supplierServiceFactory;
}]);