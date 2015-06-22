angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider

		.when('/', {
			templateUrl:  'app/views/pages/home.html',
			controller:   'mainController',
			controllerAs: 'game',
			loginRequired: true
		})
		
		.when('/login', {
			templateUrl:  'app/views/pages/login.html',
   			controller:   'mainController',
    		controllerAs: 'login'
		})
		
		.when('/registration', {
			templateUrl:  'app/views/pages/registration.html',
   			controller:   'mainController',
    		controllerAs: 'signup'
		})
		
		.when('/admin', {
			templateUrl:   'app/views/pages/admin.html',
   			controller:    'adminController',
    		controllerAs:  'admin',
			loginRequired: true
		})
		
		.when('/adminlogin', {
			templateUrl:   'app/views/pages/adminlogin.html',
   			controller:    'adminController',
    		controllerAs:  'admin'
		})
		
		.when('/admin/additem', {
			templateUrl:   'app/views/pages/additem.html',
   			controller:    'addItemController',
    		controllerAs:  'admin',
			loginRequired: true
		})
		
		.when('/admin/addcreature', {
			templateUrl:   'app/views/pages/addcreature.html',
   			controller:    'addCreatureController',
    		controllerAs:  'admin',
			loginRequired: true
		})
		
	$locationProvider.html5Mode(true);

});