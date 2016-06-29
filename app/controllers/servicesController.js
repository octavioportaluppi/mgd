'use strict';
app.controller('servicesController', ['$scope', function($scope) {

    var icons = [
        "lugares",
        "invitaciones",
        "salon",
        "mobiliario",
        "video",
        "organizadores",
        "fotografia",
        "recuerdos",
        "florerias",
        "transporte",
        "vestidos",
        "regalos",
        "trajes",
        "pinatas",
        "viajes",
        "zapatos",
        "decoracion",
        "catering",
        "musica",
        "entretenimiento",
        "presentadores",
        "dulcerias",
        "pastelerias",
        "trajes_bebe",
        "otros",
        "joyeria"
    ];

    $scope.icon = function(serviceId) {
        return "icon-"+icons[serviceId - 1];
    }
}]);
