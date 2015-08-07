<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HousekeepingAssignment extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'housekeeping_assignments';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['location', 'cabin_number', 'status','linens'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
   // protected $hidden = ['password', 'remember_token'];
}
