function LoginController( loginService, $rootScope ) {
    this.loginService = loginService;
    this.errors = { empty: '', logged: '' };

    $rootScope.$on('error', function ( event, errorData ) {
        switch ( errorData.code ) {
            case 10:
                return this.errors.empty = errorData.message;
            case 11:
                return this.errors.logged = errorData.message;
        }
    }.bind( this ));
}

/**
 * Login user
 * @param {{string}} username
 */
LoginController.prototype.submitForm = function ( username ) {
    this.errors.empty = '';
    this.errors.logged = '';
    this.loginService.login( username );
};

module.exports = [ 'loginService', '$rootScope', LoginController ];
