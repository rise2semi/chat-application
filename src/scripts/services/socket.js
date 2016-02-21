function SocketService( CONST, $rootScope, io ) {
    this.$rootScope = $rootScope;
    this.socket = io( CONST.server );

    this.socket.on('appError', this.onAppError.bind( this ) );

    this.socket.on('connect', this.onConnect.bind( this ) );
    this.socket.on('reconnect', this.onReconnect.bind( this ) );
    this.socket.on('error', this.onError.bind( this ) );
    this.socket.on('disconnect', this.onDisconnect.bind( this ) );
}

SocketService.prototype.on = function ( event, eventHandler ) {
    this.socket.on( event, function ( eventData ) {
        this.$rootScope.$apply(function() {
            eventHandler.call( null, eventData );
        });
    }.bind( this ));
};

SocketService.prototype.onAppError = function ( errorData ) {
    console.log( errorData );

    this.$rootScope.$apply(function() {
        this.$rootScope.$emit('error', errorData);
    }.bind( this ));
};

SocketService.prototype.onConnect = function () { console.log( arguments ); };
SocketService.prototype.onReconnect = function () { console.log( arguments ); };
SocketService.prototype.onDisconnect = function () { console.log( arguments ); };
SocketService.prototype.onError = function () { console.log( arguments ); };

module.exports = ['CONST', '$rootScope', 'io', SocketService ];
