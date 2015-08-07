<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Queue\Capsule\Manager;
use JWTAuth;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User;
use Psy\Util\Json;

class LoginController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function login(Request $request, User $users, JWTAuth $auth)
    {
        $inputs = $request->only('email', 'password');

        $user = $this->matchUser($inputs, $users);

        if(!$user){return response()->json(['access_denied'=>'invalid']);}

       $customClaims = ['foo' => 'bar', 'baz' => 'bob'];

        $token = $auth::fromUser($user, $customClaims);


        return response()->json(compact('user'))->header('Authorization', $token);
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
 private function matchUser(array $loginInputs, User $users)
    {
       $email = $loginInputs['email']; $password = md5($loginInputs['password']);
       $user = $users::where('email', $email)->where('password', $password)->first();
       return ($user != null) ? $user:false;
//       if($user){return $user;}
//       return false;
    }
    /**
     *
     *
     * @return Response
     */
    public function authTokenCheck()
    {
        return response()->json(['all'=>'good']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
