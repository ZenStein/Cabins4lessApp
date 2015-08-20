<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User;
use JWTAuth;
use Tymon\JWTAuth\Exceptions as Error;
class EmployeeController extends Controller
{

	public function createNewEmployee(Request $request, User $user)
	{	$input = $request->all();
	return response()->json($input);
		$newUser = $user::create([
		 'first_name'  => $request['first_name'],  'last_name' => $request['last_name'],
		  'job_title'   => $request['job_title'],   'department' => $request['department'],
		   'birthday'    => $request['birthday'],    'start_date' => $request['start_date'],
		    'SSN'         => $request['SSN'],         'hourly_rate' => $request['hourly_rate'],
		     'phone'       => $request['phone'],       'phone2'      => $request['phone2'],
		      'email'       => $request['email'
		      ]]);
		$newUser->save();
		return response()->json($newUser);
	}

	public function allUsers(){
		$users = User::all();

		return response()->json($users);
	}

	public function getUser(Request $request)
    {
    try {

        if (! $user = JWTAuth::parseToken()->authenticate()) {
            return response()->json(['user_not_found'], 404);
        }

    } catch (Error\TokenExpiredException $e) {

        return response()->json(['token_expired'], $e->getStatusCode());

    } catch (Error\TokenInvalidException $e) {

        return response()->json(['token_invalid'], $e->getStatusCode());

    } catch (Error\JWTException $e) {

        return response()->json(['token_absent'], $e->getStatusCode());

    }

    // the token is valid and we have found the user via the sub claim
    return response()->json(compact('user'));


    }

	public function checkToken(){

	}
	public function googlePlaces(){


       $address = '742 tulip ln big';
		$url = urlencode ('http://maps.googleapis.com/maps/api/geocode/json?address=' . $address . '&sensor=false' );

    $json = json_decode(file_get_contents($url), true);

     return response()->json($json);
   // return response()->json($url);
	}
	public function housekeepers(User $user){
		$housekeepers = $user->where('department','housekeeping')->get();

		return response()->json($housekeepers);
		//return response()->json(['test'=>'one']);
	}

}
