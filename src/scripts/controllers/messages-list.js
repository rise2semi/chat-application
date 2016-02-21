function MessagesListController( messageService, userService ) {
    this.messageService = messageService;
    this.userService = userService;

    this.list = this.messageService.messages;
    this.currentUser = this.userService.currentUser;
    this.newMessage = '';
}

MessagesListController.prototype.addMessage = function ( message ) {
    this.messageService.sendMessage( message );
    this.newMessage = '';
};

module.exports = [ 'messageService', 'userService', MessagesListController ];