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
    };

    var _changePassword = function (account) {
        return $http.post(serviceBase + 'api/account/changepassword', account);
    };

    var _confirmMail = function (code) {
        return $http.post(serviceBase + 'api/account/confirmmail', {code: code});
    }

    accountServiceFactory.forgotPassword = _forgotPassword;
    accountServiceFactory.activatePassword = _activatePassword;
    accountServiceFactory.changePassword = _changePassword;
    accountServiceFactory.confirmMail = _confirmMail;

    return accountServiceFactory;
}]);