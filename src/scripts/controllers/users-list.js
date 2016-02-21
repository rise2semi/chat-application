function UsersListController( userService ) {
    this.list = userService.users;
    this.currentUser = userService.currentUser;
}

module.exports = [ 'userService', UsersListController ];