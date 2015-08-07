/**
 * Created by C-Styles on 7/31/15.
 */

'use strict';

(function(){

		angular

	.module('servicesUserService', [])

	.provider('userService', [function(){

		var req = {};

		this.req = function(request){

			req = request;
		}

		this.$get = [ '$log', '$http', 'SweetAlert', '$state', 'AuthTokenFactory','$rootScope', function($log, $http, SweetAlert, $state, AuthTokenFactory, $rootScope){

			return new userService(req, $log, $http, SweetAlert, $state, AuthTokenFactory, $rootScope);

		}];
	}])

	.config(['userServiceProvider', function(userServiceProvider){

		userServiceProvider.req({method:'GET', url:'/Users'});

	}])


		function userService(request,  log, http, SweetAlert, $state, AuthTokenFactory, $rootScope ) {
			this.req = request;
			//this.log = log;
			//this.http = http;
			//this.SweetAlert = SweetAlert;
			//this.$state = $state;
			this.allUsers = function () {

				return http(this.req).then(function success(response) {

						AuthTokenFactory.setToken(response.headers().authorization);

						return response;

				}, function error(response_error) {

						SweetAlert.error('unable to access!', response_error);

						$state.go('employee.login');

				});
			};

			this.currentUser = function () {

				return http({method: 'GET', url:'/currentUser'})

				.then(function success(response) {

						AuthTokenFactory.setToken(response.headers().authorization);

						$rootScope.$emit('login', response.data);

						return response;

			   }, function error(response_error) {

						SweetAlert.error('unable to access!', response_error);

						$state.go('employee.login');

				});
			};
			this.createNewEmployee = function(i){
				return http({method:'post', url:'/createNewEmployee', data:i})

				.then(function(success){
					console.log ('success');console.log ( success ); //marker
				},function(err){
					console.log ('err');console.log ( err ); //marker
				})
			};
			this.alertTest = function () {
				return http(this.req).then(function(succ){console.log ('succ');console.log ( succ ); return;},
				function(err){console.log ('err');console.log ( err ); return;})
			}
		}


})()