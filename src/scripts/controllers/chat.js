function ChatController( chatURL, roomService ) {
    this.roomService = roomService;
    console.log( chatURL );
}

module.exports = ['chatURL', 'roomService', ChatController];
