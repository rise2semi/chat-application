function AuthService() {
    this.localStorage = localStorage;
}

AuthService.prototype.saveUser = function ( user ) {
    this.localStorage.setItem('user', user );
};

AuthService.prototype.getUser = function () {
    this.localStorage.getItem('user');
};

AuthService.prototype.isLoggedIn = function () {
    return !!this.localStorage.getItem('user');
};

module.exports = [ AuthService ];