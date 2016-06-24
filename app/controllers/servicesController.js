'use strict';
app.controller('servicesController', ['$scope', function($scope) {
    $scope.serviceItems = [{
        id: 1,
        name: "Lugares",
    }, {
        id: 2,
        name: "Invitaciones",
    }, {
        id: 3,
        name: "Salón",
    }, {
        id: 4,
        name: "Renta de Mobiliario",
    }, {
        id: 5,
        name: "Video",
    }, {
        id: 6,
        name: "Joyería",
    }, {
        id: 7,
        name: "Organizadores",
    }, {
        id: 8,
        name: "Fotografía",
    }, {
        id: 9,
        name: "Recuerdos",
    }, {
        id: 10,
        name: "Florerías",
    }, {
        id: 11,
        name: "Transporte",
    }, {
        id: 12,
        name: "Vestidos",
    }, {
        id: 13,
        name: "Mesa de Regalos",
    }, {
        id: 14,
        name: "Smokings y Trajes",
    }, {
        id: 15,
        name: "Piñatas",
    }, {
        id: 16,
        name: "Agencias de Viaje",
    }, {
        id: 17,
        name: "Zapatos",
    }, {
        id: 18,
        name: "Decoración",
    }, {
        id: 19,
        name: "Catering",
    }, {
        id: 20,
        name: "Música y Sonido",
    }, {
        id: 21,
        name: "Entretenimiento",
    }, {
        id: 22,
        name: "Presentadores",
    }, {
        id: 23,
        name: "Dulcerías",
    }, {
        id: 24,
        name: "Pastelerías",
    }, {
        id: 25,
        name: "Trajes para Bebé",
    }, {
        id: 26,
        name: "Otros",
    }];

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
