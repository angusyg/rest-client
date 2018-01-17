(function(angular) {
    'use strict';

    angular.module('#ANGULAR_APP_MODULE#')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', 'store', '$q', 'API'];

    function AuthenticationService($http, store, $q, API) {
        const ACCESS_TOKEN = 'JWTToken';
        const REFRESH_TOKEN = 'RefreshToken';

        return {
            getToken: getToken,
            getRefreshToken: getRefreshToken,
            isLoggedIn: isLoggedIn,
            login: login,
            logout: logout,
            refreshToken: refreshToken
        };

        function getToken() {
            return store.get(ACCESS_TOKEN);
        }

        function getRefreshToken() {
            return store.get(REFRESH_TOKEN);
        }

        function isLoggedIn() {
            return store.get(ACCESS_TOKEN) !== null;
        }

        function login(user) {
            return $http.post(API.LOGIN.PATH, user)
                .then(function(response) {
                    store.set(ACCESS_TOKEN, response.data.accessToken);
                    store.set(REFRESH_TOKEN, response.data.refreshToken);
                    $q.resolve();
                });
        }

        function logout() {
            return $http.get(API.LOGOUT.PATH)
                .then(function(response) {
                    store.remove(ACCESS_TOKEN);
                    store.remove(REFRESH_TOKEN);
                    $q.resolve();
                });
        }

        function refreshToken() {
            return $http.get(API.REFRESHTOKEN.PATH)
                .then(function(response) {
                    store.set(ACCESS_TOKEN, response.data.accessToken);
                    $q.resolve();
                });
        }
    }
})(angular);