/// <reference path="../../typings/angularjs/angular.d.ts"/>
angular.module('RPG', ['ngAnimate', 'app.routes', 'mainCtrl', 'authService', 'gameService', 'rpgDirectives'])

.config(function($httpProvider) {

	$httpProvider.interceptors.push('AuthInterceptor');

});