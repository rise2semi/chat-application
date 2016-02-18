var angular = require('angular');
var angularRouter = require('angular-ui-router');
var io = require('socket.io-client');
var constants = require('./config/const');
var routes = require('./config/route.config');
var authConfig = require('./config/auth.config');
var AuthService = require('./services/auth');
var SocketService = require('./services/socket');
var templates = require('./templates/templates');

/**
 * Application module
 */
var app = angular.module('app', [ angularRouter, 'templates' ])
    .config( routes )
    .run( authConfig )
    .constant('CONST', constants )
    .constant('io', io )
    .service('authService', AuthService )
    .service('socketService', SocketService );

module.exports = app;