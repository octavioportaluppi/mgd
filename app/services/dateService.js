'use strict';
app.factory('dateService', [function () {

    var dateServiceFactory = {};

    var _days = [
        { id: 0, name: 'Domingo'},
        { id: 1, name: 'Lunes' },
        { id: 2, name: 'Martes' },
        { id: 3, name: 'Miercoles' },
        { id: 4, name: 'Jueves' },
        { id: 5, name: 'Viernes' },
        { id: 5, name: 'Sabado' }
    ];

    var _getDays = function () {
        return _days;
    };

    var _isOpen = function (openingHours) {
        var today = new Date();
        var openDay = _isBetweenDays(today.getDay(), openingHours.DayFrom, openingHours.DayTo);
        var openingHour = openingHours.HoursFrom.split(':')[0];
        var openingMinute = openingHours.HoursFrom.split(':')[1];
        var closingHour = openingHours.HoursTo.split(':')[0];
        var closingMinute = openingHours.HoursTo.split(':')[1];
        var openHour = _isBetweenHours(
            today.getHours(), today.getMinutes(),
            openingHour, openingMinute,
            closingHour, closingMinute);
        return openDay && openHour;
    };

    var _isBetweenDays = function(currentDay, fromDay, toDay) {
        return fromDay <= currentDay && toDay >= currentDay;
    };

    var _isBetweenHours = function(currentHours, currentMinutes, fromHours, fromMinutes, toHours, toMinutes) {
      return ((fromHours < currentHours) && (currentHours < toHours))
                || ((fromHours == currentHours) && (fromMinutes <= currentMinutes))
                || ((currentHours == toHours) && (currentMinutes <= toMinutes))
    };



    dateServiceFactory.getDays = _getDays;
    dateServiceFactory.isOpen = _isOpen;

    return dateServiceFactory;
}]);
