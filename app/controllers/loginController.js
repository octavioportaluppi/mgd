'use strict';
app.controller('loginController', ['$scope', '$interval', '$location', 'authService', 'ngAuthSettings', 'supplierService', function ($scope, $interval, $location, authService, ngAuthSettings, supplierService) {

    $scope.loginData = {
        Email: "",
        Password: "",
    };

    $scope.message = "";

    $scope.login = function (userType) {
        console.log(userType);
        authService.login($scope.loginData, userType).then(function (response) {
            supplierService.getDashboard().then(function(res){
                if (userType == 'planner') {
                    authService.logOut();
                    $scope.message = 'Tu cuenta es de Organizador, por favor inicia sesión <a href="/login-planner">aquí</a>';  
                } else {
                    $location.path('/'); 
                }
            }, function(err) {
                if (userType == 'supplier') {
                    authService.logOut();
                    $scope.message = 'Tu cuenta es de Proveedor, por favor inicia sesión <a href="/login-supplier">aquí</a>';  
                } else {
                    $location.path('/');         
                }
            });
                


            $location.path('/');

        },
         function (err) {
             $scope.message = err.error_description;
         });
    };

    $scope.authExternalProvider = function (provider) {

        var redirectUri = location.protocol + '//' + location.host + '/authcomplete.html';

        var externalProviderUrl = ngAuthSettings.apiServiceBaseUri + "api/Account/ExternalLogin?provider=" + provider
                                                                    + "&response_type=token&client_id=" + ngAuthSettings.clientId
                                                                    + "&redirect_uri=" + redirectUri;
        window.$windowScope = $scope;

        var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
    };

    $scope.authCompletedCB = function (fragment) {

        $scope.$apply(function () {

            if (fragment.haslocalaccount == 'False') {

                authService.logOut();

                authService.externalAuthData = {
                    provider: fragment.provider,
                    Email: fragment.external_user_name,
                    externalAccessToken: fragment.external_access_token
                };

                $location.path('/associate');

            }
            else {
                //Obtain access token and redirect to orders
                var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
                authService.obtainAccessToken(externalData).then(function (response) {

                    $location.path('/orders');

                },
             function (err) {
                 $scope.message = err.error_description;
             });
            }

        });
    }

    // check for fragment every 100ms
    var _interval = $interval(_checkForFragment, 100);

    function _checkForFragment() {
        var fragment = localStorage.getItem("auth_fragment");
        if(fragment && (fragment = JSON.parse(fragment))) {

            // clear the fragment from the storage
            localStorage.removeItem("auth_fragment");

            // continue as usual
            $scope.authCompletedCB(fragment);

            // stop looking for fragmet
            _clearInterval();
        }
    }

    function _clearInterval() {
        $interval.cancel(_interval);
    }

    $scope.$on("$destroy", function() {
        // clear the interval when $scope is destroyed
        _clearInterval();
    });

}]);
