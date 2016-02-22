function HeaderController( authService, $state, $rootScope ) {
    this.authService = authService;
    this.$state = $state;
    this.$rootScope = $rootScope;
}

HeaderController.prototype.toggle = function ( toggleEvent ) {
    this.$rootScope.$emit( toggleEvent );
};

HeaderController.prototype.logout = function () {
    this.authService.removeUser();
    this.$state.go('login');
};

module.exports = [ 'authService', '$state', '$rootScope', HeaderController ];
