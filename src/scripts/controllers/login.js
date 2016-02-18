function LoginController( socketService ) {
    this.socketService = socketService;
}

LoginController.prototype.submitForm = function ( username ) {
    this.socketService.login( username );
};

module.exports = ['socketService', LoginController];