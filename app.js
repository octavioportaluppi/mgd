var app = angular.module('AngularFunctions', ['ngRoute','ngResource',
        'ngAnimate',
        'LocalStorageModule',
        'multiStepForm',
        'checklist-model',
        'ui.bootstrap',
        'flow',
        'angular-progress-arc',
        'angular-loading-bar',
        'ngFileUpload',
        'infinite-scroll']);

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
        controller: "signupPlannerController",
        templateUrl: "/app/views/signup-planner.html"
    });

    $routeProvider.when("/signup-supplier", {
        controller: "signupController",
        templateUrl: "/app/views/signup-supplier.html"
    });

    $routeProvider.when("/suppliers", {
        templateUrl: "/app/views/suppliers.html"
    });

    $routeProvider.when("/suppliers/:supplierId",{
        controller: "suppliersController",
        templateUrl: "/app/views/supplier-detail.html"
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


    $routeProvider.when("/events/:eventId/detail",{
        controller: "eventDetailController",
        templateUrl: "/app/views/event-detail.html"
    });

    $routeProvider.otherwise({ redirectTo: "/" });

});

app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = false;
    cfpLoadingBarProvider.spinnerTemplate =
    '<div id="loading-bar-spinner">' +
        '<div class="spinner-icon">' +
            '<span></span>' +
            '<span></span>' +
            '<span></span>' +
        '</div>' +
    '</div>';
}]);

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
            { id:'á', replace: 'a' },
            { id:'é', replace: 'e' },
            { id:'í', replace: 'i' },
            { id:'ó', replace: 'o' },
            { id:'ú', replace: 'u' },
            { id:'ñ', replace: 'n' },
            { id:' ', replace: '-' }
        ];

        values.forEach(function(value){
           source = source.split(value.id).join(value.replace);
        });

        return 'icon-' + source;
    };
})

.filter('background', function(){
    return function (source) {
        if(!angular.isDefined(source)){
            return;
        }

        source = source.toLowerCase();

        var values = [
            { id:'á', replace: 'a' },
            { id:'é', replace: 'e' },
            { id:'í', replace: 'i' },
            { id:'ó', replace: 'o' },
            { id:'ú', replace: 'u' },
            { id:'ñ', replace: 'n' },
            { id:' ', replace: '-' }
        ];

        values.forEach(function(value){
            source = source.split(value.id).join(value.replace);
        });

        return source;
    };
})

.filter('day', function(){
    return function (source) {
        if(!angular.isDefined(source)){
            return;
        }

        var values = [
            { id: 0, name: 'Domingo' },
            { id: 1, name: 'Lunes' },
            { id: 2, name: 'Martes' },
            { id: 3, name: 'Miercoles' },
            { id: 4, name: 'Jueves' },
            { id: 5, name: 'Viernes' },
            { id: 6, name: 'Sabado' }
        ];

        var result = values.find(function (it){return it.id == source});
        if (!result){
            return source;
        }
        return result.name;
    };
})

.filter('filterKey', function(){
    return function (source) {
        if(!angular.isDefined(source)){
            return;
        }

        var values = [
            { id: 'CityFilter', key: 'Estado' },
            { id: 'EventTypeFilter', key: 'Tipo de Evento' },
            { id: 'ServiceTypeFilter', key: 'Tipo de Servicio' }
        ];

        var result = values.find(function (it){return it.id == source});
        if (!result){
            return source;
        }
        return result.key;
    };
})

.filter('firstLetter', function() {
    return function(input) {
        if(input){
            return input[0].toUpperCase() + input.slice(1);
        }
    }
});

var serviceBase = 'http://randallcanezr-001-site2.ftempurl.com/';

app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngAuthApp'
});

app.config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.run(['authService', function(authService) {
    authService.fillAuthData();
}]);