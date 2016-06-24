'use strict';
app.controller('plannerController', ['$scope', 'plannerService', function ($scope, plannerService) {
	$scope.message = '';

    $scope.newEvent = {
        Title: '',
        EventTypeId: '',
        CityId: '',
        Date: '',
        Budget: ''
    };

	plannerService.getEvents();

	$scope.events = plannerService.events;
    
    $scope.eventDatepicker = {
        opened: false
    };

    $scope.openEventDatepicker = function() {
        $scope.eventDatepicker.opened = true;
    };

    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.dateOptions = {
        appendToBody: true,
        placement: 'top-right',
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.status = {
	    isCustomHeaderOpen: false,
	    isFirstOpen: true,
	    isFirstDisabled: false
  	};

  	$scope.oneAtATime = true;

	plannerService.getEvents().then(function(res) {
		$scope.events = res.data;
	}, function(err) {
		$scope.message = err;
	});
	
	$scope.save = function(event) {
		plannerService.saveEvent(event).then(function(res) {
			$scope.message = 'Evento guardado';
			$scope.events.push(event);
		}, function(err) {
			$scope.message = err;
		});
	};

	$scope.update = function(event) {
		plannerService.updateEvent(event).then(function(res) {
			$scope.message = 'Actualización realizada';
		}, function(err) {
			$scope.message = err;
		});
	};
}]);