'use strict';
app.factory('authService', ['$http', '$q', 'localStorageService', 'ngAuthSettings', 'Upload',
    function ($http, $q, localStorageService, ngAuthSettings, Upload) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        Email: "",
        userType: ""
    };

    var _externalAuthData = {
        provider: "",
        Email: "",
        externalAccessToken: ""
    };

    var _saveRegistration = function (registration) {

        _logOut();

        var deferred = $q.defer();

        $http.post(serviceBase + 'api/account/register', registration ).then(function (response) {

            deferred.resolve(response);
        }, function (err) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    var _savePlanner = function (planner) {
        return $http.post(serviceBase + 'api/planners', planner);
    };

    var _updatePlanner = function (planner) {
        return $http.put(serviceBase + 'api/planners', planner );
    };

    var _saveSupplier = function (supplier) {
        var promises = [];
        promises.push($http.post(serviceBase + 'api/suppliers', supplier));
        if(supplier.profilePic) {
            promises.push(_uploadLogo(supplier.profilePic, true));
        }

        if(supplier.photos.length > 0) {
            supplier.photos.forEach(function(photo){
                promises.push(_uploadLogo(photo, false));
            })
        }
        return $q.all(promises);
    };

    var _updateSupplier = function (supplier) {
        var promises = [];
        promises.push($http.put(serviceBase + 'api/suppliers', supplier));
        if(supplier.profilePic) {
            if(supplier.LogoId){
                _deletePicture(supplier.LogoId)
                    .then(function (){
                        promises.push(_uploadLogo(supplier.profilePic, true));
                })

            } else {
                promises.push(_uploadLogo(supplier.profilePic, true));
            }
        }

        if(supplier.photos.length > 0) {
            supplier.photos.forEach(function(photo){
                _uploadLogo(photo, false);
            })
        }
        return $q.all(promises);
    };

    var _login = function (loginData, type) {

        var data = "grant_type=password&username=" + loginData.Email + "&password=" + loginData.Password;
        var deferred = $q.defer();

        $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
            console.log(response);
            localStorageService.set('authorizationData', { token: response.access_token, Email: loginData.Email, userType: type });
            _authentication.isAuth = true;
            _authentication.Email = loginData.Email;
            _authentication.userType = type;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            console.log(err);
            console.log(status);
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function () {

        localStorageService.remove('authorizationData');

        _authentication.isAuth = false;
        _authentication.Email = "";
        _authentication.userType = "";

    };

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.Email = authData.Email;
            _authentication.userType = authData.userType;
        }

    };

    var _registerExternal = function (registerExternalData) {

        var deferred = $q.defer();

        $http.post(serviceBase + 'api/account/registerexternal', registerExternalData).success(function (response) {

            localStorageService.set('authorizationData', { token: response.access_token, Email: response.Email, refreshToken: "", useRefreshTokens: false });

            _authentication.isAuth = true;
            _authentication.Email = response.Email;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _deletePicture = function (picId) {
        return $http.delete( serviceBase + '/api/Pictures/' + picId);
    };

    var _uploadLogo = function (picFile, isLogo) {
        return Upload.upload({
            url: serviceBase +'/api/Pictures',
            data: {Title: '', Description: '', IsLogo: isLogo, file: picFile}
        });
    };

    authServiceFactory.saveRegistration = _saveRegistration;

    authServiceFactory.savePlanner = _savePlanner;
    authServiceFactory.saveSupplier = _saveSupplier;

    authServiceFactory.updatePlanner = _updatePlanner;
    authServiceFactory.updateSupplier = _updateSupplier;

    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;

    authServiceFactory.externalAuthData = _externalAuthData;
    authServiceFactory.registerExternal = _registerExternal;

    authServiceFactory.uploadLogo = _uploadLogo;
    authServiceFactory.deletePicture = _deletePicture;

    return authServiceFactory;
}]);