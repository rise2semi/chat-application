function SocketService( CONST, $rootScope, io ) {
    this.$rootScope = $rootScope;
    this.socket = io( CONST.server );

    console.log( io( CONST.server ) );
    this.socket.on('appError', this.onError.bind( this ) );
    this.socket.on('setup', this.onSetup.bind( this ) );

    this.socket.on('room created', this.onRoomCreated.bind( this ) );
    this.socket.on('room updated', this.onRoomUpdated.bind( this ) );
    this.socket.on('room removed', this.onRoomRemoved.bind( this ) );
    this.socket.on('room switched', this.onRoomSwitched.bind( this ) );

    this.socket.on('user joined', this.onUserJoined.bind( this ) );
    this.socket.on('user left', this.onUserLeft.bind( this ) );

    this.socket.on('message created', this.onMessageCreated.bind( this ));

    this.socket.on('connect', this.onConnect.bind( this ) );
    this.socket.on('error', this.onError.bind( this ) );
    this.socket.on('disconnect', this.onDisconnect.bind( this ) );
}

SocketService.prototype.onError = function ( event, data ) { console.log( event, data ); };
SocketService.prototype.onSetup = function () { console.log( arguments ); };
SocketService.prototype.onRoomCreated = function () {};
SocketService.prototype.onRoomUpdated = function () {};
SocketService.prototype.onRoomRemoved = function () {};
SocketService.prototype.onRoomSwitched = function () {};
SocketService.prototype.onUserJoined = function () {};
SocketService.prototype.onUserLeft = function () {};
SocketService.prototype.onMessageCreated = function () {};
SocketService.prototype.onConnect = function () { console.log( arguments ); };
SocketService.prototype.onDisconnect = function () { console.log( arguments ); };
SocketService.prototype.onError = function () { console.log( arguments ); };

SocketService.prototype.login = function ( userName ) {
    this.socket.emit('login', { username: userName });
};

module.exports = ['CONST', '$rootScope', 'io', SocketService ];