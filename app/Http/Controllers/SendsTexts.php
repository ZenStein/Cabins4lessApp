<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use \Services_Twilio;
class SendsTexts extends Controller
{

	protected $model;
	protected $token;
	protected $sid;
	protected $number;
	protected $client;

	/**
	 * @param $assocNumNames
	 * @internal param $ 1 :  array of objects with properties [ { toNumber: message:  } ] ]
	 */
	public function __construct($textableObj)
	{
		//$unwrap = $request->all();
		$this->model = $textableObj;//$request->all();//$unwrap['data'];
		$this->token = env('TWILIO_TOKEN');
		$this->sid = env('TWILIO_SID');
		$this->number = env('TWILIO_NUMBER_FORMATTED');
		$this->client = new Services_Twilio($this->sid, $this->token);
	}

	private function client()
	{

		return $this->client;
	}

	public function sendHelper($to, $message)
	{
		//return true;
		$message .= '%0a';
		$message .= 'If this were a real text, the number would have gone to' . $to . '%0a';
		$message .= 'This should Show cabins 38, 17 and 39 as assignments. %0a';
		$mockMessage =
		$client = $this->client();
		$sms = $client->account->messages->sendMessage($this->number, '+19098007845', $mockMessage);
		return (gettype($sms) == 'object') ? true : false;

	}

	public function send()
	{
		//return response()->json(['$feedback'=>'thefuck']);

		$feedback = [];
		foreach ($this->model as $k => $v) {
			   $sentTo = $v['housekeeper'];
			$feedback[$k] = [
					'id'      =>$sentTo['id'],
					 'name'     =>$sentTo['first_name'] .' '. $sentTo['last_name'],
                 'phone'     =>$sentTo['phone'],
						 'message'   =>$v['message'],
					     'sent_status'=>true];

			if (!$this->sendHelper($v['to'], $v['message'])) {

				$feedback[$k]['sent_status'] = false;
			}
		}
			$collection = collect([$feedback]);
			return $collection;
	}
}



















