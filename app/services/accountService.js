'use strict';
app.factory('accountService', ['$http', 'ngAuthSettings',
    function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var accountServiceFactory = {};

    var _forgotPassword = function (email) {
        return $http
            .post(serviceBase + 'api/account/forgotpassword', {email: email});
    };

    accountServiceFactory.forgotPassword = _forgotPassword;

    return accountServiceFactory;
}]);