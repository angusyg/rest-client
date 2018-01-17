(function(angular) {
    'use strict';

    angular.module('#ANGULAR_APP_MODULE#')
        .factory('HttpErrorInterceptor', HttpErrorInterceptor);

    HttpErrorInterceptor.$inject = ['$q', '$log'];

    function HttpErrorInterceptor($q, $log) {
        return {
            responseError: responseError
        };

        function responseError(error) {
            if (error.status > 400 && error.status < 600) {
                $log.error('Received ' + error.status + ' on request ' + error.data.reqId + ': ' + JSON.stringify(error.config));
            }
            return $q.reject(error);
        }
    }
})(angular);