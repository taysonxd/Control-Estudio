<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon as DateTime;
use App\Models\Materia;

class MateriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
    	$materias = [
        	['materia' => "Ingles", 'created_at' => DateTime::now(),'updated_at' => DateTime::now()]
        ];
        	
    	Materia::insert($materias);

    }
}
