'use strict';
app.controller('loginController',
    ['$scope', '$interval', '$location', 'authService', 'ngAuthSettings', 'accountService',
        function ($scope, $interval, $location, authService, ngAuthSettings, accountService) {

    $scope.loginData = {
        Email: "",
        Password: ""
    };

    $scope.message = "";

    $scope.loginSupplier = function () {
        authService
            .login($scope.loginData, 'supplier')
            .then(
            function () {
                $scope.checkAccount('Supplier', '/dashboard');
            },
            function (err) {
              if (err.error == "invalid_grant"){
                $scope.message = "Nombre de usuario o contraseña incorrecto.";
              }
              else {
                $scope.message = "Oops. Hubo un error al intentar ingresar. Por favor, ponte en contacto con nosotros para solucionarlo."
              }
            });
    };

    $scope.checkAccount = function(accountType, state) {
        console.log(state);
        accountService
            .accountInfo()
            .then(function (response) {
                if(response.data.Role === accountType) {
                    $location.path(state);
                } else {
                    authService.logOut();
                    $scope.message = 'Las datos ingresados no son válidos.'
                }
            });
    };

    $scope.loginPlanner = function () {
        authService
            .login($scope.loginData, 'planner')
            .then(
            function () {
                if($location.$$search.path!==undefined && $location.$$search.path!=''){
                    $scope.checkAccount('Planner', $location.$$search.path);
                }else{
                    $scope.checkAccount('Planner', '/planner');
                }
            },
            function (err) {
                if (err.error == "invalid_grant"){
                  $scope.message = "Nombre de usuario o contraseña incorrecto.";
                }
                else {
                  $scope.message = "Oops. Hubo un error al intentar ingresar. Ponte en contacto con nosotros para solucionarlo."
                }
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
