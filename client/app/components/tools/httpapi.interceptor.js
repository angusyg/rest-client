(function(angular) {
    'use strict';

    angular.module('#ANGULAR_APP_MODULE#')
        .factory('HttpBaseUrlInterceptor', HttpBaseUrlInterceptor);

    HttpBaseUrlInterceptor.$inject = ['$injector'];

    function HttpBaseUrlInterceptor($injector) {
        return {
            request: request
        };

        function request(config) {
            var CONFIG = $injector.get('CONFIG');
            if (!config.url.startsWith('http') && config.url.indexOf('/api') > -1) {
                config.url = CONFIG.API_SERVER + config.url;
            }
            return config;
        }
    }
})(angular);