angular.module('adminService', ['authService'])

	.factory('Admin', function($http, $q) {
		var adminFactory = {};
		
		adminFactory.getPlayers = function () {
			return $http.get('/player');
		};
		
		adminFactory.getCreatures = function () {
			return $http.get('/creature');
		};
		
		adminFactory.getItems = function () {
			return $http.get('/item');
		};
		
		adminFactory.newPlayer = function (data) {
			return $http.post('/player', data);
		};
		
		adminFactory.newCreature = function (data) {
			return $http.post('/creature', data);
		};
		
		adminFactory.newItem = function (data) {
			return $http.post('/item', data);
		};
		
		adminFactory.deletePlayer = function (player_id) {
			return $http.delete('/player/' + player_id);
		};
		
		adminFactory.deleteCreature = function (creature_id) {
			return $http.delete('/creature/' + creature_id);
		};
		
		adminFactory.deleteItem = function (item_id) {
			return $http.delete('/item/' + item_id);
		};
		
		return adminFactory;
	});