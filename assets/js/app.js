angular
	.module('app', [
		'ngRoute',
		'ngAnimate',
		'ngSails',
		'angular-growl',
		'app.home',
	])
	.config(['$routeProvider', '$locationProvider', '$provide', 'growlProvider', function($routeProvider, $locationProvider, $provide, growlProvider) {
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
		$provide.decorator('$exceptionHandler', function($delegate) {
			return function(exception, cause) {
				$delegate(exception, cause);
				try {
					$http.post('/clientlogger', angular.toJson({
						url: $window.location.href,
						message: exception.toString(),
						stacktrace: printStackTrace({e: exception}),
						cause: (cause || ''),
					}))
					.failure(function(data, status) {
						$log.error('Server responded with an error while pushing client error to server:', status, data);
					});
				}
				catch(e) {
					$log.error('Failed to push client error to server:', e);
				}
			};
		});
		growlProvider.globalTimeToLive({success: 5000, info: 5000, warning: 10000, error: 10000});
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
					growl.info('John Smith is requesting a chat', {title: 'UPDATE:'});
					break;
				case 2:
					growl.warning('Your session is about to expire', {title: 'WARNING:'});
					break;
				case 3:
					growl.error('No data found', {title: 'FAILURE:'});
			}
		}
	}])
