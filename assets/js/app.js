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
		growlProvider.globalTimeToLive({success: 4000, info: 6000, warning: 10000, error: 20000});
	}])
	.controller('AppController', ['$scope', 'growl', function($scope, growl) {
		'use strict';
		$scope.ui = {
			sidenavActive: false,
		};
		$scope.addNotifications = function() {
			growl.success('success notification');
			growl.info('info notification');
			growl.warning('warning notification');
			growl.error('error notification');
		}
	}]);
