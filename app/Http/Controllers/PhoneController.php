<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use \Services_Twilio;
use \Services_Twilio_Capability;


class PhoneController extends Controller
{

	protected $sid;
	protected $primaryToken;
	protected $secondaryToken;
	protected $phonenumber;
	protected $capabilityTokenAllowIncoming;
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function make_call()
    {
//			$capability = new Services_Twilio_Capability($this->sid, $this->primaryToken);
//			$capability->allowClientOutgoing('APabe7650f654fc34655fc81ae71caa3ff');
//			$token = $capability->generateToken();
//         return response()->json(['token'=>$token]);
$client = new Services_Twilio($this->sid, $this->primaryToken);
$message = $client->account->messages->create(array(
    "From" => "415-319-6596",
    "To" => "909-281-5750",
    "Body" => "Test message!",
));
//	    $dir = '../../../vendor/twilio/Services/Twilio.php';
	    //return response()->json(['message'=>$message]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function __construct()
    {//AP18ba6ab988fd4b2f982a726aec5946e6
       $this->sid = 'AC2af87bd237bb23944bc873bb62c075a1';
	    $this->primaryToken = '1233cce6cec6474cdfc156c315980ddf';
	    $this->secondaryToken = '6924fc00d0aa0fd851151c5b00dff4a8';
	    $this->phonenumber = '4153196596';
	    $this->capabilityTokenAllowIncoming =  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzY29wZSI6InNjb3BlOmNsaWVudDpvdXRnb2luZz9hcHBTaWQ9QVAxOGJhNmFiOTg4ZmQ0YjJmOTgyYTcyNmFlYzU5NDZlNiZhcHBQYXJhbXM9JmNsaWVudE5hbWU9YWxpY2Ugc2NvcGU6Y2xpZW50OmluY29taW5nP2NsaWVudE5hbWU9YWxpY2UiLCJpc3MiOiJBQzJhZjg3YmQyMzdiYjIzOTQ0YmM4NzNiYjYyYzA3NWExIiwiZXhwIjoxNDM5MDAzNTA1fQ.SJqZooW3hAe4gOUuDqsHDcg37QwJS4WtO8jzYQqglpE';
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function phone_call()
    {


    // Twilio REST API version
    $version = "2010-04-01";

    // Set our Account SID and AuthToken
    $sid = $this->sid;
    $token =$this->primaryToken;

    // A phone number you have previously validated with Twilio
    $phonenumber = $this->phonenumber;

    // Instantiate a new Twilio Rest Client
    $client = new Services_Twilio($sid, $token, $version);

    try {
        // Initiate a new outbound call
        $call = $client->account->calls->create(
            $phonenumber, // The number of the phone initiating the call
            '9092815750', // The number of the phone receiving call
            'http://demo.twilio.com/welcome/voice/' // The URL Twilio will request when the call is answered
        );
        echo 'Started call: ' . $call->sid;
    } catch (Exception $e) {
        echo 'Error: ' . $e->getMessage();
    }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function Capabilities()
    {

    $sid = $this->sid;
    $token =$this->primaryToken;

		$token = new Services_Twilio_Capability($sid, $token);
		$token->allowClientOutgoing('AP18ba6ab988fd4b2f982a726aec5946e6');
		$token->allowClientIncoming("billy");
		$theToken = $token->generateToken();
	    return response()->json(['allow_incoming_token'=>$theToken]);
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
