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
        edit: '',
        exist: '',
        create: ''
    };

    $rootScope.$on('room-edited', function () {
        this.editedRoom = null;
    }.bind( this ));

    $rootScope.$on('error', function ( event, errorData ) {
        switch ( errorData.code ) {
            case 20:
                return this.errors.create = errorData.message;
            case 21:
                return this.errors.exist = errorData.message;
            case 25:
                return this.errors.edit = errorData.message;
        }
    }.bind( this ));
}

RoomsListController.prototype.addRoom = function ( room ) {
    this.roomService.addRoom( room );
    this.clearErrors();
    this.newRoom = '';
};

RoomsListController.prototype.clearErrors = function () {
    this.errors.exist = '';
    this.errors.edit = '';
    this.errors.create = '';
};

RoomsListController.prototype.switchEditMode = function ( room ) {
    var currentModeIsEdit = room.isEditMode;
    this.clearErrors();

    this._.each( this.list, function ( listRoom ) {
        listRoom.isEditMode = false;
    });

    if ( !currentModeIsEdit ) {
        room.isEditMode = true;
        this.editedRoom = angular.copy( room );
    }
};

RoomsListController.prototype.editRoom = function ( room ) {
    this.roomService.editRoom(room, false);
};

RoomsListController.prototype.deleteRoom = function ( room ) {
    this.roomService.editRoom( room, true );
};

module.exports = [ 'roomService', '_', 'userService', '$rootScope', RoomsListController ];