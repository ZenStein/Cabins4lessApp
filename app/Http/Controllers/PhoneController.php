<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use \Services_Twilio;


class PhoneController extends Controller
{

	protected $sid;
	protected $primaryToken;
	protected $secondaryToken;
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function make_call()
    {
			$capability = new Services_Twilio_Capability($this->sid, $this->primaryToken);
			$capability->allowClientOutgoing('APabe7650f654fc34655fc81ae71caa3ff');
			$token = $capability->generateToken();
         return response()->json(['token'=>$token]);
//$client = new Services_Twilio($this->sid, $this->primaryToken);
//$message = $client->account->messages->create(array(
//    "From" => "909-280-1180",
//    "To" => "909-280-1180",
//    "Body" => "Test message!",
//));
//	    $dir = '../../../vendor/twilio/Services/Twilio.php';
	    //return response()->json(['message'=>$message]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function __construct()
    {
       $this->sid = 'AC2af87bd237bb23944bc873bb62c075a1';
	    $this->primaryToken = '1233cce6cec6474cdfc156c315980ddf';
	    $this->secondaryToken = '6924fc00d0aa0fd851151c5b00dff4a8';
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
