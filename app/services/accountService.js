﻿'use strict';
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
    };

    var _getSubscriptionTypes = function() {
        return $http.get(serviceBase + 'api/SubscriptionTypes');
    };

    var _getCurrentSubscription = function() {
        return $http.get(serviceBase + 'api/suppliers/SubscriptionType');
    };

    var _updateSubscription = function (subscriptionId) {
        return $http.put(serviceBase + 'api/suppliers/subscriptiontype',{Id: subscriptionId});
    };

    accountServiceFactory.forgotPassword = _forgotPassword;
    accountServiceFactory.activatePassword = _activatePassword;
    accountServiceFactory.changePassword = _changePassword;
    accountServiceFactory.confirmEmail = _confirmMail;
    accountServiceFactory.getSubscriptionTypes = _getSubscriptionTypes;
    accountServiceFactory.getCurrentSubscription = _getCurrentSubscription;
    accountServiceFactory.updateSubscription = _updateSubscription;

    return accountServiceFactory;
}]);