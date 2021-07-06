<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon as DateTime;
use App\Models\Mencion;

class MencionesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        $menciones = [
        	['id_carrera' => '6', 'mencion' => 'Alojamiento','created_at' => DateTime::now(),'updated_at' => DateTime::now()],
			['id_carrera' => '6', 'mencion' => 'Gastronomia' ,'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
			['id_carrera' => '6', 'mencion' => 'Gestión Turística','created_at' => DateTime::now(),'updated_at' => DateTime::now()],
			['id_carrera' => '6', 'mencion' => 'Guiatura de Turismo', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()]
		];
        	
    	Mencion::insert($menciones);
    }
}
