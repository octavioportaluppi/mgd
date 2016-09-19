app.directive('owlCarousel', function () {
  return {
      restrict: 'E',
      transclude: false,
      link: function (scope) {
          scope.initCarousel = function(element) {
            // provide any default options you want
              var defaultOptions = {
                  loop:true,
                  margin:20,
                  responsiveClass:true,
                  responsive:{
                      0:{
                          items:1,
                          nav:false,
                      },
                      760:{
                          items:3,
                          nav:true,
                          loop:false,
                          navText:['<','>']
                      },
                      992:{
                          items:5,
                          nav:true,
                          loop:false,
                          navText:['<','>']
                      }
                  }
              };
              var customOptions = scope.$eval($(element).attr('data-options'));
              // combine the two options objects
              for(var key in customOptions) {
                  defaultOptions[key] = customOptions[key];
              }
              // init carousel
              $(element).owlCarousel(defaultOptions);
          };
      }
  };
});

app.directive('owlCarouselItem', [function() {
    return {
        restrict: 'A',
        transclude: false,
        link: function(scope, element) {
          // wait for the last item in the ng-repeat then call init
            if(scope.$last) {
                scope.initCarousel(element.parent());
            }
        }
    };
}]);
