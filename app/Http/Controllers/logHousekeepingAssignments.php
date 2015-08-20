<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\HousekeepingAssignmentsLogModel;

class logHousekeepingAssignments extends Controller
{
	protected $assignments = [];
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function __construct($arr)
    {
	    //dd(['$arrwaspassed'=>$arr]);
	   // return response()->json(['die'=>'fucker']);
     foreach($arr as $key=>$val){
		    array_push($this->assignments, $val);
     }

	   // $type = gettype($arr);
	  //  $count = count($arr);
	   // return response()->json(['type'=>$type,'count'=>$count]);
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
    public function storeAll()
    {
	 //   dd($this->assignments);
	//	$assigModel = new HousekeepingAssignmentsLogModel();
        $deleteIfAny = \App\HousekeepingAssignmentsLogModel::where('created_at', '>=', new \DateTime('today'))->delete();
	    for($i = 0; $i< count($this->assignments[0]); $i++){

		    $assigModel = new \App\HousekeepingAssignmentsLogModel;

		    $assigModel->assigned_from  =$this->assignments[0][$i]['assigned_from'];
		    $assigModel->first_name     =$this->assignments[0][$i]['first_name'];
		    $assigModel->housekeeper_id =$this->assignments[0][$i]['housekeeper_id'];
		    $assigModel->cabin_number   =$this->assignments[0][$i]['cabin_number'];
		    $assigModel->status         =$this->assignments[0][$i]['status'];
		    $assigModel->linens         =$this->assignments[0][$i]['linens'];
		    $assigModel->save();
	    }
	   // $assigModel->push();
	    $all = $assigModel::all();
	    return $all->toJson();
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
