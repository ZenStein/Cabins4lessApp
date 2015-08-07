/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider, $httpProvider) {

    $urlRouterProvider.otherwise("/employee/login");

    // Configure Idle settings
    IdleProvider.idle(5); // in seconds
    IdleProvider.timeout(120); // in seconds
	//$httpProvider.defaults.headers.get = { 'Access-Control-Allow-Origin' : '*'};
	$httpProvider.interceptors.push('AuthInterceptor');
    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: true
    });

    $stateProvider


	     .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content.html",
	    resolve:{
		    loadPlugin: function($ocLazyLoad){
			    return $ocLazyLoad.load([
				    {
					    serie:true,
					    name:'oitozero.ngSweetAlert',
					    files:['css/plugins/sweetalert/sweetalert.css','js/plugins/sweetalert/sweetalert.min.js','js/plugins/sweetalert/angular-sweetalert.min.js']
				    },
				    {
					    files:['js/services/servicesUserService.js', 'js/services/servicesLoginService.js']
				    },
				    {
					    name:'indexDashboard',
					    files:['js/index/indexDashboard.js']
				    }
			    ]);
		    }
	    }
	     })
        .state('index.dashboard', {
            url: "/dashboard",
            templateUrl: "views/dashboard_3.html",
	    controller:'indexDashboardController',
	    resolve:{
		    authcheck : function(auth){
			   return  auth.all();
		    }
	    }
	     })
        .state('employee', {
            abstract: true,
            url: "/employee",
            templateUrl: "views/common/content.html",
		      resolve: {
			    loadPlugin: function ($ocLazyLoad) {
			    return $ocLazyLoad.load([
				    {
					    serie:true,
					    name:'oitozero.ngSweetAlert',
					    files:['css/plugins/sweetalert/sweetalert.css','js/plugins/sweetalert/sweetalert.min.js','js/plugins/sweetalert/angular-sweetalert.min.js']
				    },
				    {
					    name:'servicesUserService',
					    files:['js/services/servicesUserService.js']
				    },
				    {
					    name:'servicesLoginService',
					    files:['js/services/servicesLoginService.js']
				    },
				    {
					    name:'employee',
					    files: [ 'js/employee/employee.js']
				    }
			    ]);
		    }
	    }
        })
        .state('employee.view_all', {
	       url        : "/view_all",
	       templateUrl: "views/employee/view_all.html",
	       controller:'employeesViewController'
	    })
	    .state('employee.create_new', {
		    url        : "/create_new",
		    templateUrl: "views/employee/create_new.html",
	       controller:'employeesCreateController',
	    resolve:{
		    loadPlugin:function($ocLazyLoad){
			    return $ocLazyLoad.load([
                        {
                            name: 'datePicker',
                            files: ['css/plugins/datapicker/angular-datapicker.css','js/plugins/datapicker/angular-datepicker.js']
                        },
                        {
                            files: ['js/plugins/jasny/jasny-bootstrap.min.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css','js/plugins/chosen/chosen.jquery.js','js/plugins/chosen/chosen.js']
                        },
                        {
                            name: 'ui.switchery',
                            files: ['css/plugins/switchery/switchery.css','js/plugins/switchery/switchery.js','js/plugins/switchery/ng-switchery.js']
                        },
                        {
                            files: ['css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css']
                        }
			    ]);
		    }
	    }

	    })
	    .state('employee.login', {
		    url        : "/login",
		    templateUrl: "views/lockscreen.html",
	       controller:'LoginController'

	    })
    .state('schedule', {
            abstract: true,
            url: "/schedule",
            templateUrl: "views/common/content.html",
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
	                     {
		                     name:'schedule',
		                     files:['js/schedule/controllers.js', 'js/schedule/schedule.js']
	                     }
                    ]);
                }
            }
        })
    .state('schedule.housekeepers',{
          url        : "/housekeepers",
		    templateUrl: "views/schedule/schedule.housekeepers.html",
	       controller :'schedule.housekeepersController'
    })
    .state('schedule.office',{
          url        : "/office",
		    templateUrl: "views/schedule/schedule.office.html",
	       controller :'schedule.officeController'
    })
    .state('schedule.maintenance',{
          url        : "/maintenance",
		    templateUrl: "views/schedule/schedule.maintenance.html",
	       controller :'schedule.maintenanceController'
    })
    .state('assignment', {
            abstract: true,
            url: "/assignment",
            templateUrl: "views/common/content.html",
		      resolve: {
			      loadPlugin: function ($ocLazyLoad) {
				      return $ocLazyLoad.load([
					      {
						      insertBefore: '#loadBefore',
						      files:['js/plugins/angular-ui-grid/ui-grid.min.css']
					      },
					      {
						      name:'assignment',
						      files: ['js/assignment/assignment.js','js/assignment/controllers.js']
					      }
				      ]);
			      }
		      }
		      })
    .state('assignment.daily_housekeeping',{
          url        : "/daily_housekeeping",
		    templateUrl: "views/assignment/assignment.daily_housekeeping.html",
	       controller :'assignment.daily_housekeepingController'
    })
    .state('assignment.office',{
          url        : "/office",
		    templateUrl: "views/assignment/assignment.office.html",
	       controller :'assignment.officeController'
    })
    .state('clockin', {
            abstract: true,
            url: "/clockin",
            templateUrl: "views/common/content.html",
		      resolve: {
			      loadPlugin: function ($ocLazyLoad) {
				      return $ocLazyLoad.load([
                        {
                            files: ['js/plugins/footable/footable.all.min.js', 'css/plugins/footable/footable.core.css']
                        },
                        {
                            name: 'ui.footable',
                            files: ['js/plugins/footable/angular-footable.js']
                        },
	                     {
		                     name:'clockin',
		                     files:['js/clockin/controllers.js', 'js/clockin/clockin.js']
	                     }
				      ]);
			      }
		      }
		      })
    .state('clockin.hours_tracking',{
          url        : "/hours_tracking",
		    templateUrl: "views/clockin/hours_tracking.html",
	       controller :'clockin.hours_trackingController',
	       data       : { pageTitle: 'Hours Tracking' }
    })//************************
    .state('phone', {
            abstract: true,
            url: "/phone",
            templateUrl: "views/common/content.html",
		      resolve: {
			      loadPlugin: function ($ocLazyLoad) {
				      return $ocLazyLoad.load([
					      {
						      insertBefore: '#loadBefore',
						      files        : ['http://static0.twilio.com/bundles/quickstart/client.css']
					      },
					      {
						      serie : true,
						      name : 'phone',
						      files : ['js/phone/phone.js','js/phone/controllers.js','http://static.twilio.com/libs/twiliojs/1.2/twilio.min.js']
					      }
				      ]);
			      }
		      }
		      })
    .state('phone.make_call',{
          url        : "/make_call",
		    templateUrl: "views/phone/make_call.html",
	       controller :'phone.make_callController',
	       data       : { pageTitle: 'Make A Call' }
    })



}
angular
    .module('inspinia')
    .config(config)
.factory('AuthTokenFactory', ['$window', function ($window) {
console.log ('$window');console.log ( $window ); //marker
	var store = $window.localStorage;

	var key = 'auth-token';

	return {
		getToken: getToken,
		setToken: setToken
	};

	function getToken() {

		return store.getItem(key);
	}

	function setToken(token) {

		if (token) {

			store.setItem(key, token);
			return true;

		}

		store.removeItem(key);
		return false;
	}

}])
  .service('auth', ['$http',function($http){
    var baseUrl = '/authTokenCheck'

    var getAll = function() {
      return $http
            .get('authTokenCheck')
            .then(function(response){
              return response.data;
            });
    };

    return {
      all: getAll
    }
  }])


.factory('AuthInterceptor',['AuthTokenFactory', '$location', function (AuthTokenFactory , $location) {
console.log ('Auth inter this $ocLazyLoadProvider');console.log ($location ); //marker
	var mylocation = $location;
	return {
		request: request,
		requestError:requestError,
		response:response,
		responseError:responseError
	};

	function request(config){

		var route = config.url;

		if(tokenRequired(route)){
			addToken(config);
		}
		return config;
	}

	function tokenRequired(route){
		var required = true, tokenNotNeeded = /.*googleapi.*/i;

		if(route.match(tokenNotNeeded)){
			return !required;
		}

		return required;
	}

	function addToken(config) {

		//console.log('CHECK'); console.log(config.headers);
		var token = AuthTokenFactory.getToken();

		if (token) {

			config.headers = config.headers || {};

			config.headers.authorization =  'bearer ' + token;
		}

		return config;
	}

	function requestError(one, two){
		console.log ('one');console.log ( one ); //marker
		console.log ('two');console.log ( two ); //marker

		return one;
	}
	function response(response){
		console.log ('interceptor response');console.log ( response ); //marker

		return response;
	}
	function responseError(responseError){
		$location.path('employee/login');
		//console.log ('interceptor responseError ');console.log ( $location ); //marker
		//console.log ('interceptor responseError myloca ');console.log ( mylocation ); //marker
		//console.log ('interceptor responseError this');console.log ( this ); //marker
		return responseError;
	}

}])

    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });

