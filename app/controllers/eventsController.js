'use strict';
app.controller('eventsController', ['$scope', function ($scope) {

    $scope.eventItems = [
        {
            id: 1,
            name:"Bodas",
        }, {
            id: 2,
            name:"Cumpleaños",
        }, {
            id: 3,
            name:"Quinceañeras",
        }, {
            id: 4,
            name:"Graduaciones",
        }, {
            id: 7,
            name:"Bautizos",
        }, {
            id: 8,
            name:"Conferencias",
        }, {
            id: 9,
            name:"Showers",
        }, {
            id: 10,
            name:"Otros",
        }
    ];

    var eventIcons= [
        {
            id: 1,
            icon:"bodas",
        }, {
            id: 2,
            icon:"cumpleanos",
        }, {
            id: 3,
            icon:"quinceaneras",
        }, {
            id: 4,
            icon:"graduaciones",
        }, {
            id: 7,
            icon:"bautizo",
        }, {
            id: 8,
            icon:"conferencias",
        }, {
            id: 9,
            icon:"showers",
        }, {
            id: 10,
            icon:"icon_otros",
        }
    ];

    $scope.icon = function(eventId) {
        function findIcon(id){
            for (var i = 0; i < eventIcons.length; i++){
                if (eventIcons[i].id === id)
                    return eventIcons[i].icon;
            }
        }
        return "icon-"+findIcon(eventId);
    }    
}]);