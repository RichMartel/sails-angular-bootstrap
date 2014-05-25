angular
	.module('app', [
		'ngRoute',
		'ngAnimate',
		'ngResource',
		'ngSails',
		'angular-growl',
		'app.home',
	])
	.config(['$provide', '$locationProvider', '$routeProvider', 'growlProvider', function($provide, $locationProvider, $routeProvider, growlProvider) {
		'use strict';
		$provide.decorator('$log', ['$delegate', 'logHttpService', function($delegate, logHttpService) {
			var logError = $delegate.error;
			var logWarn = $delegate.warn;
			$delegate.error = function(message) {
				logError(message);
				logHttpService.postLog(message);
			}
			$delegate.warn = function(message) {
				logWarn(message);
				logHttpService.postLog(message);
			}
			return $delegate;
		}]);
		$locationProvider.html5Mode(true);
		$routeProvider
			.when('/', {
				controller: 'HomeController',
				templateUrl: 'components/home/home.html',
			})
			.otherwise({
				redirectTo: '/',
			});
		growlProvider.globalTimeToLive({success: 5000, info: 5000, warning: 10000, error: 10000});
	}])
	.factory('logHttpService', ['$window', function($window) {
		return {
			postLog: function(message) {
				try {
					var httpReq = new XMLHttpRequest();
					var data = {
						url: $window.location.href,
						message: message,
						// stacktrace: printStackTrace({e: exception}),
					}
					console.log(data);
					httpReq.onreadystatechange = function() {
						if (httpReq.readyState === 4) {
							if (httpReq.status === 200) {
								// return console.info(httpReq.status, httpReq.responseText);
							}
							else {
								return console.error(httpReq.status, httpReq.responseText);
							}
						}
					}
					httpReq.open('POST', '/clientlogger', true);
					httpReq.send(data);
				}
				catch (e) {
					console.error(e);
				}
			}
		}
	}])
	.factory('$exceptionHandler', ['$log', function($log) {
		return function(exception, cause) {
			var args = Array.prototype.slice.call(arguments);
			args.push(printStackTrace({e: exception}));
			$log.error.apply($log, args);
		};
	}])
	.controller('AppController', ['$scope', '$log', 'growl', function($scope, $log, growl) {
		'use strict';
		$scope.ui = {
			sidenav: false,
			dimPage: true,
			loaderImage: false,
		}
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
	}]);
