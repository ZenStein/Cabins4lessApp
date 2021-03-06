<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\HousekeepingAssignment;
use Psy\Util\Json;
use App\Http\Controllers\logHousekeepingAssignments;
use Input;

class AssignmentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function housekeepingAssignments(HousekeepingAssignment $assign)
    {
		$assignments = $assign->all();
	    return response()->json($assignments);
    }
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function saveHousekeepingAssignments()
    {
	   $all = Input::all();
	    $logger = new logHousekeepingAssignments($all);
	    $test = $logger->storeAll();
	    return response()->json(['happy'=>$test]);
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
