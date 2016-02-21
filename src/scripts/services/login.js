function LoginService( socketService, authService, roomService ) {
    this.socketService = socketService;
    this.authService = authService;
    this.roomService = roomService;

    this.isSetup = false;
    this.socketService.socket.on('setup', this.onSetup.bind( this ) );
}

/**
 * Initial state of application
 * @param {object} chatState
 */
LoginService.prototype.onSetup = function ( chatState ) {
    this.isSetup = true;
    this.authService.saveUser( chatState.username );
    this.roomService.storeRooms( chatState.rooms );
};

/**
 * Login user
 * @param {{string}} username
 */
LoginService.prototype.login = function ( username ) {
    this.socketService.socket.emit('login', { username: username });
};

module.exports = [ 'socketService', 'authService', 'roomService', LoginService ];
