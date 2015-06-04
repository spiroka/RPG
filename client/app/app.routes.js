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
		});

	$locationProvider.html5Mode(true);

});