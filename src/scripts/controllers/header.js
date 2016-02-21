function HeaderController( authService, $state ) {
    this.authService = authService;
    this.$state = $state;
}

HeaderController.prototype.logout = function () {
    this.authService.removeUser();
    this.$state.go('login');
};

module.exports = [ 'authService', '$state', HeaderController ];
