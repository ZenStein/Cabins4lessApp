/**
 * Created by C-Styles on 8/7/15.
 */



(function(){

angular.module('phone')
	.controller('phone.make_callController', ['$scope','$http', function ($scope, $http) {
console.log ('twilio');console.log ( Twilio ); //marker
 //   $scope.data = {};
	var req = {
		method:'get',
		url:'/make_call'
	};
	$http(req).then(function(res){
		console.log ('res');console.log ( res ); //marker
		 Twilio.Device.setup(res.data.token, {debug:true, warnings:true});
	},function(err){
		console.log ('err');console.log ( err ); //marker
	})


      //Twilio.Device.setup(function(device){
      //});

      Twilio.Device.ready(function (device) {
	    console.log ('device is now ready');console.log ( 'device is now ready '); //marker
        $("#log").text("Ready");
      });

      Twilio.Device.error(function (error) {
        $("#log").text("Error: " + error.message);
      });

      Twilio.Device.connect(function (conn) {
        $("#log").text("Successfully established call");
      });

      function call() {
        Twilio.Device.connect();
      }



}])

})();
