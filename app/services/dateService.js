'use strict';
app.factory('dateService', [function () {

    var dateServiceFactory = {};

    var days = [
        { id: 0, name: 'Domingo'},
        { id: 1, name: 'Lunes' },
        { id: 2, name: 'Martes' },
        { id: 3, name: 'Miercoles' },
        { id: 4, name: 'Jueves' },
        { id: 5, name: 'Viernes' },
        { id: 5, name: 'Sabado' }
    ];

    var _getDays = function () {
        return days;
    };

    dateServiceFactory.getDays = _getDays;

    return dateServiceFactory;
}]);