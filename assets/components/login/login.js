/**
 * login-controllers.js
 */

angular.module('app.login', [])
	.controller('LoginController', ['$scope', '$location', function($scope, $location) {
		'use strict';
		$scope.form = {
			email: '',
			password: '',
			remember: false,
		}
		$scope.login = function() {
		}
	}]);
