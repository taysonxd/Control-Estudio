<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon as DateTime;
use Illuminate\Support\Facades\Hash;
use App\Models\Profesor;

class ProfesoresSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $profesores  = [
        	[
          	'id_persona' => '1',
	          'created_at' => DateTime::now(),
		       'updated_at' => DateTime::now()
       		],
       		[
        	   'id_persona' => '2',
             'created_at' => DateTime::now(),
             'updated_at' => DateTime::now()
       		]
       	];

   		Profesor::insert($profesores);
    }
}
