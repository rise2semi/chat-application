function RoomService( _ ) {
    this._ = _;
    this.rooms = [];
}

RoomService.prototype.storeRooms = function ( rooms ) {
    this.rooms = rooms;
};

RoomService.prototype.getDefault = function () {
    return this._.find( this.rooms, { default: true } );
};


module.exports = [ '_', RoomService ];
