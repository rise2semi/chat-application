var LoginController = require('../controllers/login');
var ChatController = require('../controllers/chat');
var HeaderController = require('../controllers/header');
var UsersListController = require('../controllers/users-list');
var MessagesListController = require('../controllers/messages-list');
var RoomsListController = require('../controllers/rooms-list');

module.exports = ['$urlRouterProvider', '$stateProvider', function ( $urlRouterProvider, $stateProvider ) {
    $urlRouterProvider.otherwise('/chat/');

    $stateProvider
        .state('chat', {
            url: '/chat/:name',
            resolve: {
                roomURL: ['$stateParams', 'roomService', function ( $stateParams, roomService ) {
                    var currentRoom = ( $stateParams.name )
                        ? roomService.getRoom( $stateParams.name )
                        : roomService.getDefault();

                    roomService.setCurrentRoom( currentRoom );

                    return $stateParams.name;
                }]
            },
            views: {
                '': {
                    templateUrl: 'templates/chat.html',
                    controller: ChatController,
                    controllerAs: 'chat'
                },
                'usersList@chat': {
                    templateUrl: 'templates/users-list.html',
                    controller: UsersListController,
                    controllerAs: 'users'
                },
                'roomsList@chat': {
                    templateUrl: 'templates/rooms-list.html',
                    controller: RoomsListController,
                    controllerAs: 'rooms'
                },
                'messagesList@chat': {
                    templateUrl: 'templates/messages-list.html',
                    controller: MessagesListController,
                    controllerAs: 'messages'
                },
                'header@chat': {
                    templateUrl: 'templates/header.html',
                    controller: HeaderController,
                    controllerAs: 'header'
                }
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: LoginController,
            controllerAs: 'login'
        });
}];
