function LoginController( $rootScope, $state, socketService, authService, roomService ) {
    this.socketService = socketService;
    this.authService = authService;
    this.roomService = roomService;
    this.$state = $state;

    $rootScope.$on('setup', this.onSetup.bind( this ) );
}

LoginController.prototype.submitForm = function ( username ) {
    this.socketService.login( username );
};

LoginController.prototype.onSetup = function ( event, chatState ) {
    this.authService.saveUser( chatState.username );
    this.roomService.storeRooms( chatState.rooms );
    this.$state.go('chat');
};

module.exports = ['$rootScope', '$state', 'socketService', 'authService', 'roomService', LoginController ];
