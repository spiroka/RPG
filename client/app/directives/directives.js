angular.module('rpgDirectives', [])
	.directive('cardPlayer', function () {
		return {
	        templateUrl: 'app/directives/player.html'
		};
	})
	
	.directive('cardEnemy', function () {
		return {
	        templateUrl: 'app/directives/enemy.html'
		};
	});