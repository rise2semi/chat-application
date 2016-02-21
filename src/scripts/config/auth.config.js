function authConfig( $rootScope, $state, authService, loginService ) {

    /**
     * Stop the current state transition and redirect to the specified state
     * @param event {object}
     * @param state {string}
     */
    function changeState( event, state ) {
        event.preventDefault();
        $state.go( state );
    }

    /**
     * Login user on the server automatically if he is logged in on the client
     */
    if ( authService.isLoggedIn() && !loginService.isSetup ) {
        loginService.login( authService.getUser() );
    }

    $rootScope.$on('$stateChangeStart', function ( event, toState ) {

        /**
         * Checks if user authenticated.
         * @type {boolean}
         */
        var isLoggedIn = authService.isLoggedIn();

        /**
         * Checks if user tries to navigate to login page
         * @type {boolean}
         */
        var isChangeToLoginState = ( toState.name.indexOf('login') !== -1 );


        if ( isLoggedIn && isChangeToLoginState ) {
            return changeState( event, 'chat' );
        }

        if ( !isLoggedIn && !isChangeToLoginState ) {
            return changeState( event, 'login' );
        }

    });
}

module.exports = ['$rootScope', '$state', 'authService', 'loginService', authConfig ];