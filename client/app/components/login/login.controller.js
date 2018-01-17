(function(angular) {
    'use strict';

    angular.module('#ANGULAR_APP_MODULE#')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', 'ToastService', 'AuthenticationService'];

    function LoginController($state, ToastService, AuthenticationService) {
        var vm = this;

        vm.user = {
            login: '',
            password: ''
        };
        vm.doLogin = doLogin;
        vm.doLogout = doLogout;

        function doLogin() {
            AuthenticationService.login(vm.user)
                .then(function() {
                    ToastService.success('Bienvenue ' + vm.user.login + ' !');
                    $state.go('app.secure');
                })
                .catch(function(error) {
                    if (error.status === 401) {
                        ToastService.error('Combinaison login / mot de passe incorrect');
                    } else {
                        ToastService.error('Erreur lors de l\'authentification');
                    }
                });
        }

        function doLogout() {
            AuthenticationService.logout()
                .then(function() {
                    ToastService.success('Au revoir !');
                    $state.go('app.login');
                })
                .catch(function(error) {
                    ToastService.error('Erreur lors de la déconnexion');
                });
        }
    }
})(angular);