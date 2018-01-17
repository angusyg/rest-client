(function(angular) {
    'use strict';

    angular.module('#ANGULAR_APP_MODULE#')
        .config(Config);

    Config.$inject = ['$urlRouterProvider', '$httpProvider', '$mdAriaProvider'];

    function Config($urlRouterProvider, $httpProvider, $mdAriaProvider) {
        $urlRouterProvider.otherwise('/#ANGULAR_BASE_ROUTE#/login');
        $httpProvider.interceptors.push('HttpBaseUrlInterceptor');
        $httpProvider.interceptors.push('HttpErrorInterceptor');
        $httpProvider.interceptors.push('AuthenticationInterceptor');
        $mdAriaProvider.disableWarnings();
    }
})(angular);