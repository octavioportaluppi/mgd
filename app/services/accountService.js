'use strict';
app.factory('accountService', ['$http', 'ngAuthSettings',
    function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var accountServiceFactory = {};

    var _forgotPassword = function (email) {
        return $http
            .post(serviceBase + 'api/account/forgotpassword', {email: email});
    };

    var _activatePassword = function (activate) {
        return $http
            .post(serviceBase + 'api/account/resetpassword', activate);
    }

    accountServiceFactory.forgotPassword = _forgotPassword;
    accountServiceFactory.activatePassword = _activatePassword;

    return accountServiceFactory;
}]);