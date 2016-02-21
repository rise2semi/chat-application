function MessageService( socketService, $rootScope ) {
    this.$rootScope = $rootScope;
    this.socketService = socketService;

    this.messages = [];

    this.socketService.on('message created', this.onMessageCreated.bind( this ) );
}

MessageService.prototype.storeMessages = function ( messages ) {
    this.messages = messages;
};

MessageService.prototype.onMessageCreated = function ( message ) {
    this.messages.push( message );
};

MessageService.prototype.sendMessage = function ( message ) {
    this.socketService.socket.emit('new message', { message: message } );
};

module.exports = [ 'socketService', '$rootScope', MessageService ];
