/**
 * Created by C-Styles on 8/2/15.
 */

/**
 *
 * Created by C-Styles on 7/30/15.
 *
 * pseudoCode:
 *
 *  All outgoing requests will have an auth token attached to the header.
 *
 *  If a response comes in with a new auth token, 'Authintercepter' will
 *  store the token.
 *
 * */

'use strict';

(function(){

	angular

.module('servicesLoginService', [])

.provider("loginService", [function () {

	var req = {};

	this.req = function (request){
		req = request;
	};

	this.$get = ['$http', 'AuthTokenFactory', 'SweetAlert', '$state', '$rootScope', function($http, AuthTokenFactory, SweetAlert, $state, $rootScope){

		return new loginService(req, $http, AuthTokenFactory, SweetAlert, $state, $rootScope);

	}];

}])

.config(['loginServiceProvider', function( loginServiceProvider) {

	loginServiceProvider.req({method:'POST',url:'/login'});

}])

	function loginService(request, Http, AuthTokenFactory, SweetAlert, $state, $rootScope) {
		this.alertTest = function () {
			alert('worked');
		}

			this.req = request;

			this.req.data = { email   : '', password: '' };


			this.credentials = function (creds) {

				this.req.data.email = creds['email'];

				this.req.data.password = creds['password'];
			};

			this.login = function () {

				return Http(this.req).then(function success(response) {

					(storeTokenOrFail(response)) == true ? logInSuccessRedirect(response) : logInFailedNotice();

				}, function (err) {
					console.log('err');console.log(err);
				});

			};

			this.logout = function(){
				AuthTokenFactory.setToken();
				 $rootScope.$emit('logout');

				$state.go('employee.login');
			};

			function storeTokenOrFail (HeaderObj){
console.log ('HeaderObj');console.log ( HeaderObj ); //marker
				return AuthTokenFactory.setToken(HeaderObj.headers().authorization);

			}

		   function logInSuccessRedirect(response) {

			   $rootScope.$emit('login',response.data);

				SweetAlert.success("LogIn Success!", "You are signed in!");

				$state.go('index.dashboard');

			}

			function logInFailedNotice() {

				SweetAlert.error('Ooops...', 'Invalid Credentials!');

			}
		}

})()
