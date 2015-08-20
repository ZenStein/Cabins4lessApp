<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HousekeepingAssignmentsLogModel extends Model
{
    protected $table = 'log_housekeeping_assignments';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['assigned_from','first_name','housekeeper_id', 'cabin_number', 'status','linens'];
}
