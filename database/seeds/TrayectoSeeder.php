<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon as DateTime;
use App\Models\Trayecto;

class TrayectoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
    	$trayectos = [
        	['trayecto' => '1', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()]
        ];
        	
    	Trayecto::insert($trayectos);

    }
}
