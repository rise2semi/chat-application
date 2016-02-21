var angular = require('angular');
var angularRouter = require('angular-ui-router');
var io = require('socket.io-client');
var _ = require('lodash');
var constants = require('./config/const');
var routes = require('./config/route.config');
var authConfig = require('./config/auth.config');
var AuthService = require('./services/auth');
var RoomService = require('./services/room');
var SocketService = require('./services/socket');
var LoginService = require('./services/login');
var UserService = require('./services/user');
var MessageService = require('./services/message');
var templates = require('./templates/templates');

/**
 * Application module
 */
var app = angular.module('app', [ angularRouter, 'templates' ])
    .config( routes )
    .run( authConfig )
    .constant('CONST', constants )
    .constant('io', io )
    .constant('_', _ )
    .service('authService', AuthService )
    .service('socketService', SocketService )
    .service('roomService', RoomService )
    .service('loginService', LoginService )
    .service('userService', UserService )
    .service('messageService', MessageService );

module.exports = app;
