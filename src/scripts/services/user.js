function UserService( _, socketService, $rootScope ) {
    this._ = _;
    this.$rootScope = $rootScope;
    this.socketService = socketService;

    this.users = [];
    this.currentUser = {};

    this.socketService.on('user joined', this.onUserJoined.bind( this ) );
    this.socketService.on('user left', this.onUserLeft.bind( this ) );
}

UserService.prototype.storeUsers = function ( users ) {
    var uniqueUsers = this._.differenceBy( users, this.users, '_id' );
    this.users.push.apply( this.users, uniqueUsers );
};

UserService.prototype.onUserJoined = function ( users ) {
    console.log('User joined', users );

    if ( !this.currentUser.name ) {
        this._.extend( this.currentUser, users[0] );
    }

    var uniqueUsers = this._.differenceBy( users, this.users, '_id' );
    this.users.push.apply( this.users, uniqueUsers );
};

UserService.prototype.onUserLeft = function ( users ) {
    console.log('User left', users );
    this._.each( users, function ( user ) {
        this._.remove( this.users, { '_id': user._id } );
    }.bind( this ));
};

module.exports = [ '_', 'socketService', '$rootScope', UserService ];
