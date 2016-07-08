'use strict';
app.factory('supplierService',
    ['$http', '$q', 'ngAuthSettings', 'authService', function ($http, $q, ngAuthSettings, authService) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var supplierServiceFactory = {};

    var _eventTypes = {};

    var _serviceTypes = {};

    var _suppliers = [];
    
    var _getDashboard = function () {
        var deferred = $q.defer();

        $http.get(serviceBase + 'api/suppliers/dashboard').then(function (res) {
            deferred.resolve(res.data);
        }, function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;        
    }

    var _getServices = function () {

        var deferred = $q.defer();
        $http.get(serviceBase + 'api/servicetypes').success(function (res) {
            _serviceTypes = res;
            deferred.resolve(res);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _getEventServices = function (event) {
        //console.log(event);
        var deferred = $q.defer();
        $http.get(serviceBase + 'api/eventtypes/'+event+'/servicetypes').success(function (res) {
            //console.log(res);
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
    var updateSupplierProfile = function(details){
        var promises = [];
        promises.push($http.put(serviceBase + 'api/suppliers', details));
        if(details.profilePic) {
            promises.push(authService.uploadLogo(details.profilePic, true));
        }
        /*
        if(supplier.photos.length > 0) {
            supplier.photos.forEach(function(photo){
                _uploadLogo(photo, false);
            })
        }
        */
        return $q.all(promises);
    };

    var updateSuppliersService = function (services) {
        return $http
            .put(serviceBase + 'api/suppliers/servicetypes', services)
    };

    var getSuppliersByEvent = function (eventId, max, offset) {
        return $http
            .get(serviceBase + 'api/eventtypes/' + eventId + '/suppliers',
                {
                    params: {
                        size: max, offset: offset
                    }
                });
    };

    var getAllSuppliers = function (max, offset) {
        return $http
            .get(serviceBase + 'api/suppliers',
                {
                    params: {
                        size: max, offset: offset
                    }
                });
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

    supplierServiceFactory.getDashboard = _getDashboard;
    supplierServiceFactory.eventTypes = _eventTypes;
    supplierServiceFactory.serviceTypes = _serviceTypes;
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
    supplierServiceFactory.saveQuestions = saveQuestions;

    return supplierServiceFactory;
}]);