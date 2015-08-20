/**
 * Created by C-Styles on 8/7/15.
 */



(function(){

angular.module('phone')
	.controller('phone.make_callController', ['$scope','$http', function ($scope, $http) {




	$scope.callConnected = false;
	$scope.dialPadBtns=[
		{number:1,text:''},
		{number:2,text:'ABC'},
		{number:3,text:'DEF'},
		{number:4,text:'GHI'},
		{number:5,text:'JKL'},
		{number:6,text:'MNO'},
		{number:7,text:'PQRS'},
		{number:8,text:'TUV'},
		{number:9,text:'WXYZ'},
		{number:'*', text:''},
		{number:0,   text:'+'},
		{number:'#', text:''}
	];



$scope.actions = {
callNumber: '',
	pushNumber : pushNumber
};

	function pushNumber(number){
$scope.actions.callNumber = number;

return $scope.actions.callNumber;


}
	var req = {
		method:'post',
		url:'/Capabilities'
	};
	$http(req).then(function(res){
		console.log ('res');console.log ( res ); //marker
		 Twilio.Device.setup(res.data.allow_incoming_token, {debug:true, warnings:true});
	},function(err){
		console.log ('err');console.log ( err ); //marker
	});

	$scope.call = function (input) {
		if(input.match(/^\d{10}/g)){
			alert('matches!');
		}
	Twilio.Device.connect({ // Connect our call.
	   CallerId:'+14153196596', // Your Twilio number (Format: +15556667777).
	   PhoneNumber:'+1'+ input // Number to call (Format: +15556667777).
	});
		$scope.callConnected = true;
	   console.log ('input from call buton');console.log ( input ); //marker
	}
	// Hang up a Twilio call.
	$scope.hangUp = function () {
		//Twilio.Device.disconnectAll(); // Disconnect our call.
		$scope.callConnected = false;
		console.log ('hang up called!');
	}
// or handle an incoming connection event
Twilio.Device.incoming(function(conn) {
      if (confirm('Accept incoming call from ' + conn.parameters.From + '?')){
            connection=conn;
            conn.accept();
        }
});
	$scope.tester = function () {
			var req = {
		method:'post',
		url:'/deploy_housekeeper_assignments'
	//	data:[{to:'+19092815750', message:'this is sent from ajax angulaer !!'},{to:'+19092815750', message:'this is sent from ajax angulaer !!'}]
	};
	$http(req).then(function(succ){
		console.log ('succ');console.log ( succ ); //marker
	},function(err){
		console.log ('err');console.log ( err ); //marker
	})
	}

}])
.controller('phone.tasksController', ['$scope', '$http','$sce', function ($scope, $http, $sce) {


	$scope.tasks = [
		{name: 'Text Housekeeper Assignments',  type:'company',taskFn:textHouseKeeperAssignments},
		{name: 'Text Weekly Schedule',  type:'company',taskFn:function(){ alert('Fired off TaskFn!');}},
		{name: 'Road Reports',  type:'Guest Services',taskFn:function(){ alert('Fired off TaskFn!');}},
		{name: 'Departure Info', type:'Guest Services',taskFn:function(){ alert('Fired off TaskFn!');}},
		{name: 'Alert Todays Arrivals', type:'Guest Services',taskFn:function(){ alert('Fired off TaskFn!');}},
		{name: 'Text Our Location', type:'Guest Services',taskFn:function(){ alert('Fired off TaskFn!');}},
		{name: 'Thank You Text', type:'Guest Services', taskFn:function(){ return'Fired off TaskFn!';}}

	];
	$scope.task = $scope.tasks[2];
	$scope.people = [
		{name: 'All Employees',  type:'Employee'},
		{name: 'Housekeepers',  type:'Employee'},
		{name: 'Todays Arrivals', type:'Client'},
		{name: 'Todays Departures', type:'Client'},
		{name: 'All Active Guests', type:'Client'},
		{name: 'Guest This Month', type:'Client'},
		{name: 'Guest Who Came In July', type:'Client'},

	];
	$scope.person = $scope.people[2];

$scope.doTask = function () {
	$scope.task.taskFn();
}
  $scope.myHTML = '';
     //'I am an <code>HTML</code>string with ' +
     //'<a href="#">links!</a> and other <em>stuff</em>';;
$scope.chatbox = [];

function textHouseKeeperAssignments(){
		var req = {
		method:'post',
		url:'/deploy_housekeeper_assignments'
	};

	$http(req).then(function(succ){
		console.log ('succ');console.log ( succ );
		console.log ('succ');console.log ( succ ); //marker//marker
		angular.forEach(succ['data'],function(val,key){
			this.push(val);
		},$scope.chatbox);
		$scope.myHTML = succ['data'][0]['message'];
		//$sce.trustAsHtml(succ['data'][0]['message']);
		//$scope.message =$sce.getTrustedHtml(succ['data'][0]['message']);
		//console.log ('$scope.message');console.log ( $scope.message ); //marker
	},function(err){
		console.log ('err');console.log ( err ); //marker
	})
}


}])

})();
