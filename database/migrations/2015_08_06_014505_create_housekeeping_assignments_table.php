<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHousekeepingAssignmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
	    Schema::create('housekeeping_assignments', function (Blueprint $table) {
	       $table->increments('id');
	       $table->string('location');
	       $table->integer('cabin_number');
	       $table->string('status');
	       $table->integer('linens');
	       $table->timestamps();
	    });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
 Schema::drop('housekeeping_assignments');
    }
}
