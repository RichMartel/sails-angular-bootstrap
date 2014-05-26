angular
	.module('app', [
		'ngRoute',
		'ngAnimate',
		'ngResource',
		'ngSails',
		'angular-growl',
		'app.home',
		'app.login',
		'app.test',
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
			.when('/login', {
				controller: 'LoginController',
				templateUrl: 'components/login/login.html',
			})
			.when('/test', {
				controller: 'TestController',
				templateUrl: 'components/test/test.html',
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
			loaderImage: true,
		}
	}]);
