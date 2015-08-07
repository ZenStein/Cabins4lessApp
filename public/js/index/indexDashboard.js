/**
 * Created by C-Styles on 8/3/15.
 */

angular.module("indexDashboard", [])

	.controller("indexDashboardController", [ 'auth', function (auth) {
		auth.all().then(function(res){
			console.log ('index dash ctrl result');console.log ( res ); //marker
		});
	//alert('indexDashboardController');

console.log ('indexDashboardController has been loaded!');//console.log ( indexDashboardController ); //marker


	//userService.currentUser().then(function success(r){
	//	console.log ('r');console.log ( r );
	//	//$rootScope.currentUser = r.data;
	//},function error(e){console.log ('e');console.log ( e ); });
}]);
