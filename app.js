var app = angular.module('AngularFunctions', ['ngRoute', 'ngResource', 'ngAnimate', 'LocalStorageModule', 'multiStepForm', 'checklist-model', 'ui.bootstrap', 'flow', 'angular-progress-arc']);

app.config(function($routeProvider) {

    $routeProvider.when("/", {
        controller: "homeController",
        templateUrl: "/app/views/home.html"
    });

    $routeProvider.when("/login-planner", {
        controller: "loginController",
        templateUrl: "/app/views/login-planner.html"
    });

    $routeProvider.when("/login-supplier", {
        controller: "loginController",
        templateUrl: "/app/views/login-supplier.html"
    });

    $routeProvider.when("/signup-planner", {
        controller: "signupController",
        templateUrl: "/app/views/signup-planner.html"
    });

    $routeProvider.when("/signup-supplier", {
        controller: "signupController",
        templateUrl: "/app/views/signup-supplier.html"
    });

    $routeProvider.when("/suppliers", {
        controller: "suppliersController",
        templateUrl: "/app/views/suppliers.html"
    });

    $routeProvider.when("/dashboard", {
        controller: "dashboardSupplierController",
        templateUrl: "/app/views/dashboard.html"
    });

    $routeProvider.when("/planner", {
        controller: "plannerController",
        templateUrl: "/app/views/planner.html"
    });    

    $routeProvider.when("/events/:eventId", {
        controller: "eventsController",
        templateUrl: "/app/views/events.html"
    });    

    $routeProvider.when("/welcome", {
        controller: "welcomeController",
        templateUrl: "/app/views/signup-welcome.html"
    });

    $routeProvider.otherwise({ redirectTo: "/" });

});

app.filter('tel', function () {
    return function (tel) {
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
                country = 1;
                city = value.slice(0, 3);
                number = value.slice(3);
                break;

            case 11: // +CPPP####### -> CCC (PP) ###-####
                country = value[0];
                city = value.slice(1, 4);
                number = value.slice(4);
                break;

            case 12: // +CCCPP####### -> CCC (PP) ###-####
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;

            default:
                return tel;
        }

        if (country == 1) {
            country = "";
        }

        number = number.slice(0, 3) + '-' + number.slice(3);

        return (country + " (" + city + ") " + number).trim();
    };
})



.filter('icon', function(){
    return function (source) {
        if(!angular.isDefined(source)){
            return;
        }

        source = source.toLowerCase();

        var values = [
            {
                id:'á',
                replace: 'a'
            },
            {
                id:'é',
                replace: 'e'
            },
            {
                id:'í',
                replace: 'i'
            },
            {
                id:'ó',
                replace: 'o'
            },
            {
                id:'ú',
                replace: 'u'
            },
            {
                id:'ñ',
                replace: 'n'
            },
            {
                id:' ',
                replace: '-'
            }
        ];

        values.forEach(function(value){
           source = source.split(value.id).join(value.replace);
        });

        return 'icon-' + source;
    };
});



var serviceBase = 'http://randallcanezr-001-site2.ftempurl.com/';

app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngAuthApp'
});

app.config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.directive("compareTo", function() {
    return {
      require: "ngModel",
      scope: {
        otherModelValue: "=compareTo"
      },
      link: function(scope, element, attributes, ngModel) {

        ngModel.$validators.compareTo = function(modelValue) {
          return modelValue == scope.otherModelValue;
        };

        scope.$watch("otherModelValue", function() {
          ngModel.$validate();
        });
      }
    };
  }
);

app.run(['authService', function(authService) {
    authService.fillAuthData();
}]);