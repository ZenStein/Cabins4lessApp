<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use \Services_Twilio;

class TextMessageController extends Controller
{

	protected $sid;
	protected $primaryToken;
	protected $secondaryToken;


	    public function __construct()
    {
       $this->sid = 'AC2af87bd237bb23944bc873bb62c075a1';
	    $this->primaryToken = '1233cce6cec6474cdfc156c315980ddf';
	    $this->secondaryToken = '6924fc00d0aa0fd851151c5b00dff4a8';
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
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function text(Request $request)
    {
//$r = get_class_methods($request);
	    return response()->json(['$r' => $request->all()]);
//		$client = new Services_Twilio($this->sid, $this->primaryToken);
//
//		$message = $client->
//					   account->
//					    messages->
//					     create ( array (
//				         "From" => "415-319-6596",
//					       "To"   => "909-281-5750",
//				           "Body" => "Test message!"  ) ) ;
//	    if($message->error_message == null){
//		    //message sent successfully
//		   return response()->json(['message'=>$message->body]);
//	    }
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
