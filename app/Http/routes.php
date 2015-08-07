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

	Route::get('/make_call', 'phoneController@make_call');

Route::group(['middleware' => ['before'=>'jwt.auth','after'=>'jwt.refresh']], function () {

	// prootected ....  //

	Route::get('/authTokenCheck', 'LoginController@authTokenCheck');


	Route::get('currentUser', 'EmployeeController@getUser');

	Route::get('/Users', 'EmployeeController@allUsers');

	Route::get('/housekeeping_assignments', 'AssignmentsController@housekeepingAssignments');

	Route::get('/housekeepers', 'EmployeeController@housekeepers');





	Route::post('/createNewEmployee', 'EmployeeController@createNewEmployee');

});
	// shared resources
	Route::get('/googlePlaces', 'EmployeeController@googlePlaces');