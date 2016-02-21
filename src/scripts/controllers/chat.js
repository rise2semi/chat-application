function ChatController( roomService ) {
    this.roomService = roomService;
}

module.exports = [ 'roomService', ChatController];
