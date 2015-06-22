angular.module('adminCtrl', [])

.controller('adminController', ['$scope', '$rootScope', '$location', 'Auth', 'Admin', function($scope, $rootScope, $location, Auth, Admin) {

	var vm = this;

	vm.loggedIn = Auth.isLoggedIn();

	$rootScope.$on('$routeChangeStart', function(event, next, current) {
		vm.loggedIn = Auth.isLoggedIn();	

		if(!vm.loggedIn && next.loginRequired) $location.path('/login');

	});
	
	vm.doAdminlogin = function () {
		Auth.adminlogin(vm.name, vm.password)
			.success(function(data) {		
				if (data.success) $location.path('/admin');
			});
	};
	
	if(vm.loggedIn) {
		Admin.getPlayers()
			.then(function (data) {
				$scope.players = data.data;
			});
			
		Admin.getItems()
			.then(function (data) {
				$scope.items = data.data;
			});
			
		Admin.getCreatures()
			.then(function (data) {
				$scope.creatures = data.data;
			});
	}
	
	vm.deletePlayer = function (player_id) {
		Admin.deletePlayer(player_id);
		Admin.getPlayers()
			.then(function (data) {
				$scope.players = data.data;
			});
	};
	
	vm.deleteItem = function (item_id) {
		Admin.deleteItem(item_id);
		Admin.getItems()
			.then(function (data) {
				$scope.items = data.data;
			});
	};
	
	vm.deleteCreature = function (creature_id) {
		Admin.deleteCreature(creature_id);
		Admin.getCreatures()
			.then(function (data) {
				$scope.creatures = data.data;
			});
	};
	
}])

.controller('addItemController', ['$location', 'Admin', function ($location, Admin) {
	var vm = this;
	
	vm.item = {};
	
	vm.item.type = 'weapon';
	
	vm.addItem = function () {
		if(vm.item.damage) {
			vm.item.damage = Number(vm.item.damage);
		}
		if(vm.item.healing) {
			vm.item.healing = Number(vm.item.healing);
		}
		Admin.newItem(vm.item)
			.then(function () {
				$location.path('/admin');
			});
	};
}])

.controller('addCreatureController', ['$location', 'Admin', function ($location, Admin) {
	var vm = this;
	
	vm.creature = {};
	
	vm.addCreature = function () {
		if(vm.creature.damage) {
			vm.creature.damage = Number(vm.creature.damage);
		}
		if(vm.creature.maxhp) {
			vm.creature.maxhp = Number(vm.creature.maxhp);
		}
		Admin.newCreature(vm.creature)
			.then(function () {
				$location.path('/admin');
			});
	};
}]);