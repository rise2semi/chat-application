function RoomService( _, socketService, userService, messageService, $state ) {
    this._ = _;
    this.localStorage = localStorage;
    this.socketService = socketService;
    this.userService = userService;
    this.messageService = messageService;
    this.$state = $state;

    this.rooms = [];
    this.currentRoom = null;

    this.socketService.on('room created', this.onRoomCreated.bind( this ) );
    this.socketService.on('room updated', this.onRoomUpdated.bind( this ) );
    this.socketService.on('room removed', this.onRoomRemoved.bind( this ) );
    this.socketService.on('room switched', this.onRoomSwitched.bind( this ) );
}

RoomService.prototype.storeRooms = function ( rooms ) {
    this.rooms.push.apply( this.rooms, rooms );
};

RoomService.prototype.setCurrentRoom = function ( room ) {
    this.currentRoom = room;
};

RoomService.prototype.getRoom = function ( roomLink ) {
    return this._.find( this.rooms, function ( room ) {
        return this.getLink( room ) === roomLink;
    }.bind( this ));
};

RoomService.prototype.getDefault = function () {
    return this._.find( this.rooms, { default: true } );
};

RoomService.prototype.getLink = function ( room ) {
    return room.name.replace(/\s/g, '').toLowerCase();
};

RoomService.prototype.changeRoom = function ( room ) {
    this.socketService.socket.emit('switch room', room );
};

RoomService.prototype.addRoom = function ( room ) {
    this.socketService.socket.emit('new room', { name: room } );
};

RoomService.prototype.editRoom = function ( room, isDelete ) {
    this.socketService.socket.emit('edit room', { id: room._id, name: room.name, remove: isDelete } );
};

RoomService.prototype.onRoomCreated = function ( room ) {
    console.log('Room created', room );
    this.rooms.push.apply( this.rooms, [ room ] );
};

RoomService.prototype.onRoomUpdated = function ( room ) {
    console.log('Room updated', room );
    var roomIndex = this._.findIndex( this.rooms, { '_id': room._id });
    this.rooms[ roomIndex ] = room;
};

RoomService.prototype.onRoomRemoved = function ( room ) {
    console.log('Room removed', room );
    this._.remove( this.rooms, { '_id': room._id });
};

RoomService.prototype.onRoomSwitched = function ( eventData ) {
    console.log('Room switched', eventData );

    this.currentRoom = eventData.room;
    this.userService.storeUsers( eventData.users );
    this.messageService.storeMessages( eventData.messages );

    this.$state.go('chat', { name: this.getLink( this.currentRoom ) }, { reload: true });
};

module.exports = [ '_', 'socketService', 'userService', 'messageService', '$state', RoomService ];
