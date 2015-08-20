<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePersistedHousekeepingAssignmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('persistedHousekeepingAssignments', function (Blueprint $table) {

          $table->increments('id');
	       $table->string('assigned_from');
	       $table->string('housekeeper_id');
	       $table->string('first_name');
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
  Schema::drop('persistedHousekeepingAssignments');       //
    }
}
