'use strict';
app.factory('accountService', ['$http', 'ngAuthSettings',
    function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var accountServiceFactory = {};

    var _accountInfo = function () {
      return $http.get(serviceBase + 'api/account/userinfo');
    };

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

    var _confirmMail = function (code, userid) {
        return $http.post(serviceBase + 'api/account/confirmemail', {code: code, userid: userid});
    };

    var _getSubscriptionTypes = function() {
        return $http.get(serviceBase + 'api/SubscriptionTypes');
    };

    var _getCurrentSubscription = function() {
        return $http.get(serviceBase + 'api/suppliers/SubscriptionType');
    };

    var _updateSubscription = function (subscriptionId) {
        return $http.put(serviceBase + 'api/suppliers/subscriptiontype',{SubscriptionTypeId: subscriptionId});
    };

    var _sendConfirmationCode = function () {
        return $http.post(serviceBase + 'api/account/SendConfirmationCode');
    };


    accountServiceFactory.accountInfo = _accountInfo;
    accountServiceFactory.forgotPassword = _forgotPassword;
    accountServiceFactory.activatePassword = _activatePassword;
    accountServiceFactory.changePassword = _changePassword;
    accountServiceFactory.confirmEmail = _confirmMail;
    accountServiceFactory.getSubscriptionTypes = _getSubscriptionTypes;
    accountServiceFactory.getCurrentSubscription = _getCurrentSubscription;
    accountServiceFactory.updateSubscription = _updateSubscription;
    accountServiceFactory.sendConfirmationCode = _sendConfirmationCode;

    return accountServiceFactory;
}]);
