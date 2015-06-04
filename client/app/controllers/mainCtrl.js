angular.module('mainCtrl', [])

.controller('mainController', ['$scope', '$rootScope', '$location', 'Auth', 'Game', function($scope, $rootScope, $location, Auth, Game) {

	var vm = this;

	vm.loggedIn = Auth.isLoggedIn();
	vm.fighting = false;

	$rootScope.$on('$routeChangeStart', function(event, next, current) {
		vm.loggedIn = Auth.isLoggedIn();	

		if(!vm.loggedIn && next.loginRequired) $location.path('/login');

		Auth.getPlayer()
			.then(function(data) {
				$scope.player = data.data;
				$scope.player.dead = $scope.player.hp <= 0 ? true : false;
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
	
	vm.hitEnemy = function () {
		$scope.player.damage = 2;
		$scope.enemy.hp -= $scope.player.damage;
		$scope.player.hp -= $scope.enemy.damage;
		
		if($scope.player.hp <= 0 || $scope.enemy.hp <= 0){
			$scope.enemy = {};
			if($scope.player.hp <= 0) $scope.player.dead = true;
			Game.updatePlayer($scope.player._id, { 'hp': $scope.player.hp.toString() });
			vm.fighting = false;
		}
	};
	
	vm.revive = function () {
		$scope.player.hp = $scope.player.maxhp;
		Game.updatePlayer($scope.player._id, { 'hp': $scope.player.maxhp });
		$scope.player.dead = false;
	};

}]);