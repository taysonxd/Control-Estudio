<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon as DateTime;
use App\Models\Carrera;

class CarrerasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(){

        $carreras = [
        	['carrera' => "Instrumentación y Control",		'codcarrera' => '', 'tipo' => 'N', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
			['carrera' => "Ciencias de la Alimentación", 	'codcarrera' => "0101", 'tipo' => 'N', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
			['carrera' => "Ciencias del Deporte",			'codcarrera' => "0102", 'tipo' => 'N', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
			['carrera' => "Diseño Integral",				'codcarrera' => "0103", 'tipo' => 'N', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
			['carrera' => "Diseño Integral Comunitario",	'codcarrera' => "0104-01", 'tipo' => 'PNF', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
			['carrera' => "PNF en Turismo",					'codcarrera' => "0105-01", 'tipo' => 'PNF', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
			['carrera' => "PNF Instrumentación y Control",	'codcarrera' => "0106-01", 'tipo' => 'PNF', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()]
        ];
        	
    	Carrera::insert($carreras);

    }

}
