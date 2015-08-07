<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\User::class, function (Faker\Generator $faker) {
    return [
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'email' => $faker->email,
        'phone' => $faker->phoneNumber,
        'phone2' => $faker->phoneNumber,
        'SSN' => $faker->numerify('##########'),
        'department' => $faker->randomElement(['housekeeping','office','maintenance']),
        'birthday' => $faker->dateTimeBetween('-60 years','-18 years'),
        'start_date' => $faker->date(),
        'hourly_rate' => $faker->randomFloat(2,10,30)
    ];
});
$factory->define(App\HousekeepingAssignment::class, function (Faker\Generator $faker) {
    return [
        'location' => $faker->randomElement(['tulip','lakefront','holiday haven','village']),
        'cabin_number' => $faker->numberBetween($min = 0, $max = 50),
        'status' => $faker->randomElement(['Arr','Dep','T.O.']),
        'linens' => $faker->numberBetween($min = 0, $max = 4)
    ];
});
