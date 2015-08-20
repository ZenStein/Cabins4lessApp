<?php

namespace App\Http\Controllers;

use Faker\Provider\zh_TW\DateTime;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\HousekeepingAssignmentsLogModel;
use App\User;
use App\Http\Controllers\SendsTexts;
class PrepareAssignmentSMS extends Controller
{
    /**
     * @class : prepares and serves  assignment messages to employees
     *
     * @return Response
     */

    public function allHousekeepersAssignments(HousekeepingAssignmentsLogModel $logs, User $user)
    {
       $assignments     = $logs::where('created_at', '>=', new \DateTime('today'))->get();
	    // dd($assignments);
	     $housekeepers    = $user->where('department', 'housekeeping')->get();
	    $grouped         = $assignments->groupBy('housekeeper_id');
	    $addMessage      = $this->stringifyMessage($grouped);
	    $textableObj     = $this->addTo($addMessage, $housekeepers);
	    $prepareToLaunch = new SendsTexts($textableObj);
	    $sendIt = $prepareToLaunch->send();
	    $return = $sendIt->collapse();
       return response()->json($return);

    }
	public function addTo($model, $housekeepers){
		$preparedTextObj = [];
		$x = 0;
		foreach($model as $housekeeperId=>$value){
			$preparedTextObj[$x] = [];
			$getSingleHousekeeper = $housekeepers->find($housekeeperId);
			$preparedTextObj[$x]['to'] = $getSingleHousekeeper->phone;
			$preparedTextObj[$x]['message'] = $value['message'];
			$preparedTextObj[$x]['housekeeper'] = $getSingleHousekeeper;
			$x++;
		}
		return $preparedTextObj;
	}

	public function stringifyMessage($model){
		$newModel = array();
		foreach($model as $index=>$val){
			$newModel[$index] = array();
			$newModel[$index]['message']  = '';
			$x = 0;
			foreach($val as $k=>$v){
				$c =$v['cabin_number'];
				$s = $v['status'];
				$l = $v['linens'];
				$newModel[$index]['message'] .= " _______________   %0a ";
				$newModel[$index]['message'] .= "   $c | $s | $l    %0a ";
				$x++;
			}
		}
		return $newModel;
	}





}
