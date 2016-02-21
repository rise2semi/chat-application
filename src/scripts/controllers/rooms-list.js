function RoomsListController( roomService, _ , userService, $rootScope ) {
    this.roomService = roomService;
    this.userService = userService;
    this._ = _;

    this.list = this.roomService.rooms;
    this.newRoom = '';
    this.editedRoom = null;

    this.currentRoom = this.roomService.currentRoom;
    this.currentUser = this.userService.currentUser;
    this.changeRoom = this.roomService.changeRoom.bind( this.roomService );

    this.errors = {
        empty: '',
        edit: ''
    };

    $rootScope.$on('error', function ( event, errorData ) {
        if ( errorData.code === 20 ) {
            this.errors.empty = errorData.message;
        }

        if ( errorData.code === 25 ) {
            this.errors.edit = errorData.message;
        }

    }.bind( this ));
}

RoomsListController.prototype.addRoom = function ( room ) {
    this.roomService.addRoom( room );
    this.newRoom = '';
};

RoomsListController.prototype.switchEditMode = function ( room ) {
    var currentModeIsEdit = room.isEditMode;
    this.errors.edit = '';

    this._.each( this.list, function ( listRoom ) {
        listRoom.isEditMode = false;
    });

    if ( !currentModeIsEdit ) {
        room.isEditMode = true;
        this.editedRoom = angular.copy( room );
    }
};

RoomsListController.prototype.editRoom = function ( room ) {
    //var originRoom = this._.find( this.list, { _id: room._id });

    this.roomService.editRoom( room, false );
    //this.editedRoom = null;
    //originRoom.isEditMode = false;
};

RoomsListController.prototype.deleteRoom = function ( room ) {
    this.roomService.editRoom( room, true );
};

module.exports = [ 'roomService', '_', 'userService', '$rootScope', RoomsListController ];