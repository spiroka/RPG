/// <reference path="../../typings/angularjs/angular.d.ts"/>
angular.module('RPG', ['ngAnimate', 'app.routes', 'mainCtrl', 'adminCtrl', 'authService', 'gameService', 'adminService', 'rpgDirectives'])

.config(function($httpProvider) {

	$httpProvider.interceptors.push('AuthInterceptor');

});