'use strict';
app.factory('wpService',
    ['$http', '$q', 'ngAuthSettings', 'authService', function ($http, $q, ngAuthSettings, authService) {

      var wpServiceFactory = {},
          serviceBase = "http://blog.migrandia.mx/wp-json/wp/v2";
          ;

      var _getPosts = function (props) {
        var self = this;
        return $http.get(serviceBase + '/posts').then(function (response) {
          var promises = [];
  				response.data.forEach(function (post) {
  					post.plainContent = String(post.excerpt.rendered).replace(/<[^>]+>/gm, '');
            promises.push(self.getUser(post._links.author[0].href.substring(post._links.author[0].href.lastIndexOf('/') + 1)).then(function (data) {return post.author = data;}));
            if (post._links['wp:featuredmedia']) {
              promises.push(self.getMedia(post._links['wp:featuredmedia'][0].href.substring(post._links['wp:featuredmedia'][0].href.lastIndexOf('/') + 1)).then(function (data) {return post.media = data;}));
            }
  				});

          return $q.all(promises).then(function() {
            return response.data;
          });
        });
      };

      var _getMedia = function (id) {
        return $http.get(serviceBase + '/media/' + id);
      };

      var _getUser = function (id) {
        return $http.get(serviceBase + '/users/' + id);
      } ;

      wpServiceFactory.getPosts = _getPosts;
      wpServiceFactory.getMedia = _getMedia;
      wpServiceFactory.getUser = _getUser;

      return wpServiceFactory;
  }]);
