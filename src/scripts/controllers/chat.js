function ChatController( $rootScope, roomService, loginService, authService ) {
    this.connectionStatus = { isLost: false };
    this.roomsOpen = false;
    this.usersOpen = false;

    $rootScope.$on('toggle-rooms', function () {
        this.roomsOpen = !this.roomsOpen;
        console.log('this.roomsOpen', this.roomsOpen);
    }.bind( this ));

    $rootScope.$on('toggle-users', function () {
        this.usersOpen = !this.usersOpen;
    }.bind( this ));

    $rootScope.$on('disconnect', function () {
        console.log('DISCONNECT');
        this.connectionStatus.isLost = true;
    }.bind( this ));

    $rootScope.$on('reconnect', function () {
        console.log('RECONNECT');
        this.connectionStatus.isLost = false;

        roomService.reconnectRoom = roomService.currentRoom;
        loginService.login( authService.getUser() );
    }.bind( this ));

    window.addEventListener('beforeunload', function ( event ) {
        event.returnValue = 'Do you really want to exit?';
    });
}

module.exports = [ '$rootScope', 'roomService', 'loginService', 'authService', ChatController ];
