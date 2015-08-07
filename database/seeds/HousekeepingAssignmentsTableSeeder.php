<?php

use Illuminate\Database\Seeder;

class HousekeepingAssignmentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('housekeeping_assignments')->truncate();
        //$table->truncate();
        factory('App\HousekeepingAssignment', 30)->create();
    }
}
