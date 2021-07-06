<?php

use Illuminate\Database\Seeder;
use App\Models\Estado;

class EstadosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(){

    	$estados = [
        	"Amazonas",
			"Anzoátegui",
			"Apure",
			"Aragua",
			"Barinas",
			"Bolívar",
			"Carabobo",
			"Cojedes",
			"Delta Amacuro",
			"Falcón",
			"Guárico",
			"Lara",
			"Mérida",
			"Miranda",
			"Monagas",
			"Nueva Esparta",
			"Portuguesa",
			"Sucre",
			"Táchira",
			"Trujillo",
			"Vargas",
			"Yaracuy",
			"Zulia",
			"Distrito Capital",
			"Dependencias Federales"
        ];

        for($i = 0; $i < count($estados); $i++){
        	
        	Estado::create([
        		'estado' => $estados[$i]
        	]);
        }

    }

}
