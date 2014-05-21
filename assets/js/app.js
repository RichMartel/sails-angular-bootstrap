angular
	.module('myApp', [
		'ngRoute',
		'ngSails',
		'myApp.home',
	])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		'use strict';
		//$locationProvider.html5Mode(true);
		$routeProvider
			.when('/', {
				controller: 'HomeController',
				templateUrl: 'components/home/home.html',
			})
			.otherwise({
				redirectTo: '/',
			});
	}])
	.controller('AppController', ['$scope', function($scope) {
		'use strict';
		$scope.ui = {
			sidenavActive: false,
		}
	}]);
