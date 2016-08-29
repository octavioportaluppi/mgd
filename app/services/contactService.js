'use strict';
app.factory('contactService',
    ['$http', '$q', 'ngAuthSettings', 'authService', function ($http, $q, ngAuthSettings, authService) {

      var contactServiceFactory = {},
          serviceBase = ngAuthSettings.apiServiceBaseUri;
          ;

      var _sendContactInfo = function (props) {
        return $http.post(serviceBase + 'api/contact', props);
      };

      contactServiceFactory.sendContactInfo = _sendContactInfo;

      return contactServiceFactory;
  }]);
