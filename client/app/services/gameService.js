angular.module('gameService', ['authService'])

	.factory('Game', function($http, $q) {
		var gameFactory = {};
		
		gameFactory.getPlayeritems = function (player_id) {
			return $http.get('/player/' + player_id + '/items');
		};
		
		gameFactory.getEnemy = function () {
			return $http.get('/creature/random');
		};
		
		gameFactory.updatePlayer = function (player_id, data) {
			return $http.put('/player/' + player_id, data);
		};
		
		return gameFactory;
	});