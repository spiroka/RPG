angular.module('mainCtrl', [])

.controller('mainController', ['$scope', '$rootScope', '$location', 'Auth', 'Game', function($scope, $rootScope, $location, Auth, Game) {

	var vm = this;

	vm.loggedIn = Auth.isLoggedIn();
	vm.fighting = false;

	$rootScope.$on('$routeChangeStart', function() {
		vm.loggedIn = Auth.isLoggedIn();	

		Auth.getPlayer()
			.then(function(data) {
				$scope.player = data.data;
				Game.getPlayeritems($scope.player._id)
					.then(function(data) {
						$scope.player.items = data.data;
					});
			});
	});
	
	vm.doLogin = function () {
		Auth.login(vm.name, vm.password)
			.success(function(data) {		
				if (data.success) $location.path('/');
			});
	};

	vm.doLogout = function () {
		Auth.logout();
		$scope.player = '';
		
		$location.path('/login');
	};
	
	vm.doSignup = function () {
		Auth.signup(vm.name, vm.password)
			.success(function(data) {
				if(data.success) $location.path('/login');
			});
	};
	
	vm.findEnemy = function () {
		Game.getEnemy()
			.then(function(data) {
				vm.fighting = true;
				
				$scope.enemy = data.data;
			});
	};
	
	vm.fightEnemy = function () {
		$scope.enemy = {};
		
		vm.fighting = false;
	};

}]);