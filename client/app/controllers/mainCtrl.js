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
		$scope.player.damage = $scope.player.weapon ? $scope.player.weapon.damage : 1;
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
		Game.updatePlayer($scope.player._id, { 'hp': $scope.player.maxhp.toString() });
		$scope.player.dead = false;
	};

}])

.filter('item', function () {
	return function (input, weapon) {
		input = input || '';
		var out = [];
		
		for (var i = 0; i < input.length; i++) {
	        if(input[i].type == "weapon" && weapon){
	            out.push(input[i]);
	        } else if(input[i].type == "potion" && !weapon) {
				out.push(input[i]);
			}
	    }
		
		return out;
	};
});