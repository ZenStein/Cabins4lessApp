<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('/login', 'LoginController@login');

	Route::post('/make_call', 'phoneController@make_call');
	Route::post('/phone_call', 'phoneController@phone_call');
	Route::post('/Capabilities', 'phoneController@Capabilities');
	Route::post('/SendsTexts', 'SendsTexts@send');

	Route::post('/deploy_housekeeper_assignments', 'PrepareAssignmentSMS@allHousekeepersAssignments');
	Route::get('/text', 'TextMessageController@text');

Route::group(['middleware' => ['before'=>'jwt.auth','after'=>'jwt.refresh']], function () {

	// prootected ....  //

	Route::get('/authTokenCheck', 'LoginController@authTokenCheck');

//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzY29wZSI6InNjb3BlOmNsaWVudDpvdXRnb2luZz9hcHBTaWQ9QVAxOGJhNmFiOTg4ZmQ0YjJmOTgyYTcyNmFlYzU5NDZlNiZhcHBQYXJhbXM9JmNsaWVudE5hbWU9YWxpY2Ugc2NvcGU6Y2xpZW50OmluY29taW5nP2NsaWVudE5hbWU9YWxpY2UiLCJpc3MiOiJBQzJhZjg3YmQyMzdiYjIzOTQ0YmM4NzNiYjYyYzA3NWExIiwiZXhwIjoxNDM5MDAzNTA1fQ.SJqZooW3hAe4gOUuDqsHDcg37QwJS4WtO8jzYQqglpE

	//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzY29wZSI6InNjb3BlOmNsaWVudDpvdXRnb2luZz9hcHBTaWQ9QVAxOGJhNmFiOTg4ZmQ0YjJmOTgyYTcyNmFlYzU5NDZlNiZhcHBQYXJhbXM9JmNsaWVudE5hbWU9YmlsbHkgc2NvcGU6Y2xpZW50OmluY29taW5nP2NsaWVudE5hbWU9YmlsbHkiLCJpc3MiOiJBQzJhZjg3YmQyMzdiYjIzOTQ0YmM4NzNiYjYyYzA3NWExIiwiZXhwIjoxNDM5MDAzNzYyfQ.Wp3M4vuzD7ucqVnUg2lxMjhBjykQNekmHRA3LAxewqM"
	Route::get('currentUser', 'EmployeeController@getUser');

	Route::get('/Users', 'EmployeeController@allUsers');

	Route::get('/housekeeping_assignments', 'AssignmentsController@housekeepingAssignments');
	Route::post('/save_housekeeping_assignments', 'AssignmentsController@saveHousekeepingAssignments');

	Route::get('/housekeepers', 'EmployeeController@housekeepers');





	Route::post('/createNewEmployee', 'EmployeeController@createNewEmployee');

});
	// shared resources
	Route::get('/googlePlaces', 'EmployeeController@googlePlaces');