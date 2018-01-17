(function(angular) {
    'use strict';

    angular.module('#ANGULAR_APP_MODULE#')
        .config(routing);

    routing.$inject = ['$stateProvider'];

    function routing($stateProvider) {
        var templateState = {
            name: 'app',
            url: '/#ANGULAR_BASE_ROUTE#'
        };

        var authState = {
            name: 'app.login',
            url: '/login',
            views: {
                'content@': {
                    templateUrl: '/client/login',
                    controller: 'LoginController',
                    controllerAs: 'login'
                }
            }
        };

        var homeState = {
            name: 'app.secure',
            url: '/app',
            views: {
                'content@': {
                    templateUrl: '/client/home',
                    controller: 'HomeController',
                    controllerAs: 'home'
                }
            }
        };

        $stateProvider.state(templateState);
        $stateProvider.state(authState);
        $stateProvider.state(homeState);
    }
})(angular);