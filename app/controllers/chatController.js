app.controller('chatController',
        ['$scope', 'supplierService', 'Pubnub', 'authService', '$location', '$filter', 'localStorageService',
            function ($scope, supplierService, Pubnub, authService, $location, $filter, localStorageService) {

                $scope.authData = localStorageService.get('authorizationData');
                $scope.search = "";
                $scope.rooms = [];
                $scope.activeRoom = {};
                $scope.channel = undefined;
                $scope.messages = [];
                $scope.messageContent = "";
                $scope.historyUsers = [];
                $scope.objUsers = [];
                $scope.today = new Date();
                var month = '';
                if ($scope.today.getUTCMonth() >= 10) {
                    month = $scope.today.getUTCMonth() + 1;
                } else {
                    month = '0' + ($scope.today.getUTCMonth() + 1);
                }
                var day = $scope.today.getUTCDate();
                var year = $scope.today.getUTCFullYear();

                $scope.today = day + "/" + month + "/" + year;

                if ($scope.authData != null) {
                    if ($location.path() == '/planner/chat') {
                        $scope.planner = true;
                        authService
                                .getPlanner()
                                .then(function (response) {
                                    $scope.loggedUser = response.data;
                                    $scope.uuid = $scope.loggedUser.Id;
                                    $scope.init();
                                    $scope.getPremiumSuppliers();
                                });
                    } else if ($location.path() == '/supplier/chat') {
                        $scope.planner = false;
                        supplierService
                                .getDashboard()
                                .then(function (res) {
                                    $scope.loggedUser = res;
                                    $scope.uuid = $scope.loggedUser.Id;
                                    $scope.init();
                                    $scope.history();
                                });
                    } else {
                        $scope.planner = true;
                        authService
                                .getPlanner()
                                .then(function (response) {
                                    $scope.loggedUser = response.data;
                                    $scope.uuid = $scope.loggedUser.Id;
                                    $scope.init();
                                    $scope.getPremiumSuppliers();
                                });
                    }
                } else {
                    var params = $location.path().split('/');
                    window.location = '/#/login-planner?path=' + $location.path()
                }


                $scope.init = function () {

                    Pubnub.init({
                        publish_key: 'pub-c-3e575060-6e2d-4f49-a3fc-f1357464a582',
                        subscribe_key: 'sub-c-4fe1edee-6dd3-11e6-83fa-0619f8945a4f',
                        uuid: $scope.uuid
                    });
                    Pubnub.where_now({
                        uuid: $scope.uuid,
                        callback: function (m) {
                            $scope.mysubscriptions = m.channels;
                        },
                        error: function (m) {
                            //console.log(m);
                        }
                    });
                };

                $scope.subscribe = function (channel, saveMessages) {

                    Pubnub.subscribe({
                        channel: channel,
                        triggerEvents: ['callback']
                    });


                    $scope.$on(Pubnub.getMessageEventNameFor(channel), function (ngEvent, m) {
                        $scope.$apply(function () {
                            if (saveMessages) {
                                $scope.messages.push(m);

                                var i = 0;
                                angular.forEach($scope.objUsers, function (value, key) {
                                    if (value.Id == m.sender_uuid) {
                                        $scope.objUsers[i].Date = new Date(m.date);
                                        $scope.objUsers[i].Message = m.content;
                                        $scope.objUsers[i].DateFilter = $filter('date')($scope.objUsers[i].Date, "dd/MM/yyyy");
                                    }
                                    i++;
                                });

                            }
                        });
                    });
                };

                $scope.getPremiumSuppliers = function (eventTypeId) {

                    supplierService
                            .getPremiumSuppliers(eventTypeId)
                            .then(function (response) {
                                $scope.premiumSuppliers = response.data;
                                $scope.rooms = response.data;
                                var i;
                                var activeRoom = undefined;

                                for (i = 0; i < $scope.rooms.length; i++) {

                                    (function (ii) {
                                        activeRoom = $scope.rooms[ii];
                                        $scope.getChannelName(activeRoom);
                                        if ($scope.planner) {
                                            $scope.subscribe(activeRoom.Id, false);
                                        }
                                        $scope.subscribe($scope.channel, true);
                                    })(i);

                                }

                                if ($scope.rooms.length > 0) {

                                    activeRoom = $scope.rooms[0];

                                    $scope.getChannelName(activeRoom);
                                    $scope.history();
                                }

                                if ($location.path() == '/planner/chat' || $location.path() == '/supplier/chat') {
                                } else {

                                    var params = $location.path().split('/');
                                    supplierService
                                            .getSupplier(params[3])
                                            .then(function (response) {
                                                $scope.changeRoom(response.data);
                                            });
                                }
                            });

                };

                $scope.sendMessage = function () {

                    if (!$scope.messageContent || $scope.messageContent === '') {
                        return;
                    }
                    var date = new Date();
                    var message = $scope.messageContent;

                    //insertar mensaje en el canal
                    Pubnub.publish({
                        channel: $scope.channel,
                        message: {
                            content: $scope.messageContent,
                            sender_uuid: $scope.uuid,
                            date: date
                        },
                        callback: function (m) {

                            if ($scope.planner) {
                                //inserta un mensaje en el id del proveedor o cliente
                                Pubnub.publish({
                                    channel: $scope.activeRoom.Id,
                                    message: {
                                        content: $scope.channel,
                                        sender_uuid: $scope.uuid,
                                        username: $scope.loggedUser.FirstName,
                                        date: new Date(),
                                        message: message,
                                    },
                                    callback: function (m) {

                                    }
                                });
                                //inserta mensaje en el id del usuario loggeado
                                Pubnub.publish({
                                    channel: $scope.loggedUser.Id,
                                    message: {
                                        content: $scope.activeRoom.Id,
                                        sender_uuid: $scope.uuid,
                                        username: $scope.activeRoom.Name,
                                        date: new Date(),
                                        message: message,
                                    },
                                    callback: function (m) {

                                    }
                                });
                            }
                        }
                    });

                    var i = 0;
                    var entro = false;
                    angular.forEach($scope.objUsers, function (value, key) {
                        if (value.Id == $scope.activeRoom.Id) {
                            $scope.objUsers[i].Date = new Date();
                            $scope.objUsers[i].Message = message;
                            $scope.objUsers[i].DateFilter = $filter('date')($scope.objUsers[i].Date, "dd/MM/yyyy");
                            entro = true;
                        }
                        i++;
                    });

                    if (!entro) {
                        $scope.objUsers[i] = {};
                        $scope.objUsers[i].Id = $scope.activeRoom.Id;
                        $scope.objUsers[i].Username = $scope.activeRoom.Name;
                        $scope.objUsers[i].Date = new Date();
                        $scope.objUsers[i].Message = message;
                        $scope.objUsers[i].DateFilter = $filter('date')($scope.objUsers[i].Date, "dd/MM/yyyy");
                    }

                    $scope.messageContent = '';
                };


                $scope.history = function (change) {

                    if ($scope.channel !== undefined) {
                        if (change === undefined || change == false) {
                            Pubnub.history({
                                channel: $scope.loggedUser.Id,
                                callback: function (m) {
                                    if ($scope.objUsers.length <= 0) {
                                        var filtrado = [];
                                        var cont = 0;
                                        m[0].reverse();
                                        $.each(m[0], function (i, el) {
                                            if ($.inArray(el.content, filtrado) === -1) {
                                                if (el.content !== undefined) {
                                                    var content = el.content.toString();
                                                    filtrado.push(el.content);

                                                    if (el.hasOwnProperty('message')) {
                                                        $scope.objUsers[cont] = {};
                                                        $scope.objUsers[cont].Id = el.content;
                                                        $scope.objUsers[cont].Username = el.username;
                                                        $scope.objUsers[cont].Date = new Date(el.date);
                                                        $scope.objUsers[cont].Message = el.message;
                                                        $scope.objUsers[cont].DateFilter = $filter('date')($scope.objUsers[cont].Date, "dd/MM/yyyy");
                                                    }
                                                    cont++;
                                                }
                                            }
                                        });

                                        if ($scope.objUsers.length > 0) {
                                            $scope.activeRoom.Id = $scope.objUsers[0].Id;
                                            $scope.activeRoom.Name = $scope.objUsers[0].Username;
                                            $scope.getChannelName($scope.activeRoom);
                                        }

                                        $scope.$apply();
                                    }
                                    $scope.historyActiveChannel();
                                },
                                count: 100,
                                reverse: false
                            });
                        } else {
                            $scope.historyActiveChannel();
                        }
                    } else {
                        if (!$scope.planner) {
                            $scope.historyConversacion();
                        }
                    }
                };

                $scope.historyActiveChannel = function () {
                    Pubnub.history({
                        channel: $scope.channel,
                        callback: function (m) {
                            $scope.messages = [];
                            angular.forEach(m[0], function (value, key) {
                                $scope.messages.push(value);
                            });
                            $scope.$apply();
                        },
                        count: 100,
                        reverse: false
                    });
                }

                $scope.historyConversacion = function () {
                    Pubnub.history({
                        channel: $scope.loggedUser.Id,
                        callback: function (m) {
                            var filtrado = [];
                            var cont = 0;
                            m[0].reverse();
                            $.each(m[0], function (i, el) {
                                if ($.inArray(el.content, filtrado) === -1) {
                                    if (el.content !== undefined) {
                                        var content = el.content.toString();
                                        if (content.includes($scope.loggedUser.Id) && content.includes('-')) {
                                            filtrado.push(el.content);
                                            $scope.historyUsers.push(el.sender_uuid);
                                            if (el.hasOwnProperty('message')) {
                                                $scope.objUsers[cont] = {};
                                                $scope.objUsers[cont].Id = el.sender_uuid;
                                                $scope.objUsers[cont].Username = el.username;
                                                $scope.objUsers[cont].Date = new Date(el.date);
                                                $scope.objUsers[cont].Message = el.message;
                                                $scope.objUsers[cont].DateFilter = $filter('date')($scope.objUsers[cont].Date, "dd/MM/yyyy");
                                            }
                                            cont++;
                                        }
                                    }
                                }
                            });

                            var i = 0;
                            angular.forEach(filtrado, function (value, key) {
                                $scope.subscribe(value, true);
                                $scope.channel = value;
                                if (i == 0) {
                                    $scope.history();
                                    $scope.activeRoom = {};
                                    $scope.activeRoom.Name = $scope.objUsers[0].Username;
                                    $scope.activeRoom.Id = $scope.objUsers[0].Id;
                                }
                                i++;
                            });
                            $scope.$apply();
                        },
                        count: 100,
                        reverse: false
                    });
                };

                $scope.getChannelName = function (activeRoom) {

                    $scope.channel = "";

                    if (activeRoom.Id > $scope.loggedUser.Id) {
                        $scope.channel = $scope.loggedUser.Id + '-' + activeRoom.Id;
                    } else {
                        $scope.channel = activeRoom.Id + '-' + $scope.loggedUser.Id;
                    }

                };

                $scope.changeRoom = function (room) {
                    $scope.activeRoom = room;
                    $scope.getChannelName(room);
                    $scope.history(true);
                };

                $scope.changeUser = function (user) {
                    $scope.activeRoom.Id = user.Id;
                    $scope.activeRoom.Name = user.Username;
                    $scope.getChannelName(user);
                    $scope.history(true);
                };
            }]);