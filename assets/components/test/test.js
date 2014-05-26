/**
 * home-controllers.js
 */

angular
	.module('app.test', [])
	.controller('TestController', ['$scope', 'growl', '$log', function($scope, growl, $log) {
		'use strict';
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
		$scope.showSpinner = function() {
			$scope.ui.overlay = true;
			setTimeout(function() {
				$scope.$apply(function() {
					$scope.ui.overlay = false;
				});
			}, 3000);
		}
		$scope.createError = function() {
			try {
				throw new Error('This is a non-critical error');
			}
			catch (e) {
				$log.error(e.name + ": " + e.message);
				growl.error(e.message, {title: e.name.toUpperCase() + ':'});
			}
		}
		$scope.createException = function() {
			throw {name: 'Exception', message: 'Critical error!'};
		}
	}]);
