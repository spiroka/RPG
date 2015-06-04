/// <reference path="../../../typings/jquery/jquery.d.ts"/>
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
	})
	
	.directive('hpBar', function () {
		return {
			templateUrl: 'app/directives/hpbar.html',
			scope: {
				hp:    '@hp',
				maxhp: '@maxhp',
				id:    '@id'
			},
			link: function (scope, element, attrs) {
				scope.$watch('hp', function (value) {
					var width = (value / scope.maxhp) * 100;
					var hpbar = document.querySelector('#' + scope.id + ' .determinate');
					$(hpbar).css('width', width + '%');
				});
			}
		};
	});