'use strict';
app.factory('wpService',
    ['$http', '$q', 'ngAuthSettings', 'authService', function ($http, $q, ngAuthSettings, authService) {

      var wpServiceFactory = {},
          serviceBase = "http://blog.migrandia.mx/";
          ;

      var _getPosts = function (props) {
        return $http.get(serviceBase + 'wp-json/wp/v2/posts');
      };

      wpServiceFactory.getPosts = _getPosts;

      return wpServiceFactory;
  }]);
