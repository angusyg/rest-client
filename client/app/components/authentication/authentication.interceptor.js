(function(angular) {
    'use strict';

    angular.module('#ANGULAR_APP_MODULE#')
        .factory('AuthenticationInterceptor', AuthenticationInterceptor);

    AuthenticationInterceptor.$inject = ['$q', '$rootScope', '$injector'];

    function AuthenticationInterceptor($q, $rootScope, $injector) {
        var refreshRequestLoading = false;
        return {
            request: request,
            responseError: responseError
        };

        function request(config) {
            var AuthenticationService = $injector.get('AuthenticationService');
            if (config.url.indexOf('/api/secure/') > -1) {
                if (!AuthenticationService.isLoggedIn()) {
                    $injector.get('$state').go('app.login');
                    return $q.reject();
                } else {
                    config.headers.authorization = 'Bearer ' + AuthenticationService.getToken();
                    config.headers.refreshToken = AuthenticationService.getRefreshToken();
                }
            }
            return config;
        }

        function responseError(error) {
            if (error.status === 401) {
                if (error.data.error === 'TokenExpiredError') {
                    var AuthenticationService = $injector.get('AuthenticationService');
                    if (!refreshRequestLoading) {
                        refreshRequestLoading = true;
                        return AuthenticationService.refreshToken()
                            .then(function(response) {
                                refreshRequestLoading = false;
                                error.config.headers.authorization = 'Bearer ' + AuthenticationService.getToken();
                                return $injector.get('$http')(error.config)
                                    .then(function(response) {
                                        $q.resolve(response);
                                    }, function(error) {
                                        $q.reject(error);
                                    });
                            })
                            .catch(function(error) {
                                refreshRequestLoading = false;
                                return $q.reject(error);
                            });
                    }
                } else {
                    $injector.get('$state').go('app.login');
                    return $q.reject(error);
                }
            } else return $q.reject(error);
        }
    }
})(angular);