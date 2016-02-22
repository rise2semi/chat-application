function MessageService( socketService, $rootScope, userService ) {
    this.$rootScope = $rootScope;
    this.socketService = socketService;
    this.userService = userService;
    this.sound = new Audio('assets/sounds/alert.mp3');
    this.isNotificationEnabled = ('Notification' in window);
    this.messages = [];

    if ( this.isNotificationEnabled && Notification.permission !== 'granted' ) {
        Notification.requestPermission(function ( permission ) {
            if ( permission === 'granted') {
                new Notification('Thanks!');
            }
        });
    }

    this.socketService.on('message created', this.onMessageCreated.bind( this ) );
}

MessageService.prototype.storeMessages = function ( messages ) {
    this.messages = messages;
};

MessageService.prototype.onMessageCreated = function ( message ) {
    this.messages.push( message );

    if ( message.user._id !== this.userService.currentUser._id ) {
        this.sound.play();
        if ( this.isNotificationEnabled ) {
            this.notify( message );
        }
    }
};

MessageService.prototype.notify = function ( message ) {
    if ( Notification.permission === 'granted' ) {
        new Notification( message.user.name, { body: message.content } );
    } else if ( Notification.permission !== 'denied' ) {
        Notification.requestPermission(function ( permission ) {
            if ( permission === 'granted') {
                new Notification( message.user.name, { body: message.content } );
            }
        });
    }
};


MessageService.prototype.sendMessage = function ( message ) {
    this.socketService.socket.emit('new message', { message: message } );
};

module.exports = [ 'socketService', '$rootScope', 'userService', MessageService ];
