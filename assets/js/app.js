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
		growlProvider.globalTimeToLive({success: 2000, info: 3000, warning: 5000, error: 10000});
	}])
	.controller('AppController', ['$scope', 'growl', function($scope, growl) {
		'use strict';
		$scope.ui = {
			sidenavActive: false,
		};
		growl.success('success notification');
		growl.info('info notification');
		growl.warning('warning notification');
		growl.error('error notification');
	}]);
