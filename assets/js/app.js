angular
	.module('app', [
		'ngRoute',
		'ngAnimate',
		'ngSails',
		'angular-growl',
		'app.home',
	])
	.config(['$routeProvider', '$locationProvider', 'growlProvider', function($routeProvider, $locationProvider, growlProvider) {
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
		growlProvider.globalTimeToLive({success: 4000, info: 4000, warning: 10000, error: 10000});
	}])
	.controller('AppController', ['$scope', 'growl', function($scope, growl) {
		'use strict';
		$scope.ui = {
			sidenavActive: false,
		};
		$scope.addNotification = function() {
			switch (Math.floor(Math.random() * 4)) {
				case 0:
					growl.success('Data has been saved', {title: 'SUCCESS:'});
					break;
				case 1:
					growl.info('John Smith is requesting a chat', {title: 'NOTICE:'});
					break;
				case 2:
					growl.warning('Your session is about to expire', {title: 'WARNING:'});
					break;
				case 3:
					growl.error('No data found', {title: 'FAILURE:'});
			}
		}
	}]);
