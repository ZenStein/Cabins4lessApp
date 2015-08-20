/**
 * Created by C-Styles on 7/30/15.
 */

(function(){

	angular

	.module('employee',[])




.controller("LoginController", ['$http', '$scope', 'loginService', function ($http, $scope, loginService) {

		$scope.data = {};

		$scope.login = function(email , password){

			loginService.credentials({ email: email, password: password });

			loginService.login();

		};

		$scope.logout = function () {

			loginService.logout();

			$scope.user = null;

		};

}])
.controller('employeesViewController', [ 'userService','$scope', function(userService, $scope){
$scope.data = {'data':'employeesViewController view'};
	$scope.employees = {};
		$scope.tester = {};

	userService.allUsers().then(function success(response){

		$scope.employees = response.data;
	} , function(error){
		console.log ('error');console.log ( error ); //marker
	});

}])
.controller('employeesCreateController', ['auth', 'userService', '$scope','SweetAlert','$http', function (auth, userService, $scope, SweetAlert, $http) {

		console.log ('auth');console.log ( auth ); //marker
		auth.all().then(function(res){
			console.log ('res');console.log ( res ); //marker
		});
	$scope.addresses = {};
	$scope.i = {
		address:{
		 asString:'default',
		  street:'default',
		   city:'default',
		    zip:'default',
		     state:'default',
		      Country:'default'
		},
		first_name:'chris',
		 last_name:'shahin',
		  job_title:'boss',
		   department:'housekeeping',
		    hourly_rate:'35.00',
		     start_date:'11/01/2015',
		      birthday:'11/01/2015',
		       SSN:'333333333',
			     email:'shaneenterprises@gmail.com',
					phone:'9092801180',
					 phone2:'9092801180'

	};
	$scope.getLocation = function(val) {console.log ('val');console.log ( val ); //marker

			var req = {

				method: 'get',

							url: 'http://maps.googleapis.com/maps/api/geocode/json',


						params: {

							address: val,

								sensor : false
						}
		   };

		return $http(req).then(function(response){
			$scope.tester = response;
console.log ('1stresponse');console.log ( response ); //marker
			return response.data.results.map(function(item){
console.log ('2ndresponse');console.log ( item ); //marker
$scope.addresses = item;//.formatted_address;
				return item.formatted_address;

			});

		});

	};

		$scope.createNewEmployee = function (i){
			console.log ('employee create new object');console.log ( i ); //marker
			userService.createNewEmployee(i).then(function(sess){
				console.log ('sess');console.log ( sess ); //marker
			}, function(err){
				console.log ('err');console.log ( err ); //marker
			});
		};
}]);


function appendTransform(defaults, transform){
	console.log ('defaults')//;console.log ( appendTransform ); //marker
	console.log (defaults)//;console.log ( appendTransform ); //marker
	console.log ('transform')//;console.log ( appendTransform ); //marker
	console.log (transform)//;console.log ( appendTransform ); //marker
	  // We can't guarantee that the default transformation is an array
  defaults = angular.isArray(defaults) ? defaults : [defaults];

  // Append the new transformation to the defaults
  return defaults.concat(transform);
}
})()


