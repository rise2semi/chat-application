function SocketService( CONST, $rootScope, io ) {
    this.$rootScope = $rootScope;
    this.socket = io( CONST.server );

    this.socket.on('appError', this.onAppError.bind( this ) );

    this.socket.on('reconnect', this.onReconnect.bind( this ) );
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
    this.$rootScope.$apply(function() {
        this.$rootScope.$emit('error', errorData);
    }.bind( this ));
};

SocketService.prototype.onReconnect = function () {
    this.$rootScope.$apply(function() {
        this.$rootScope.$emit('reconnect');
    }.bind( this ));
};

SocketService.prototype.onDisconnect = function () {
    this.$rootScope.$apply(function() {
        this.$rootScope.$emit('disconnect');
    }.bind( this ));
};

module.exports = ['CONST', '$rootScope', 'io', SocketService ];
