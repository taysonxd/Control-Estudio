<?php

use Illuminate\Database\Seeder;
use App\Models\Requisito;

class RequisitosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(){
        
        $requisitos = [
        	'Dos (02) fotografías de frente tipo carnet - reciente',
			'Copia legible de Constancia de Participación en el Sistema Nacional de Ingreso (SNI - OPSU) (INDISPENSABLE)',
			'Copia legible de la cédula de identidad vigente',
			'Copia legible de la partida de nacimiento',
			'Copia legible del Título de Bachiller',
			'Copia legible de Notas certificadas de Bachillerato Básico',
			'Copia legible de Notas certificadas de Bachillerato Diversificado',
			'Copia legible del Comprobante de Grupo Sanguíneo',
        ];

        for($i = 0; $i < count($requisitos); $i++){
        	
        	Requisito::create([
        		'requisito' => $requisitos[$i]
        	]);
        }

    }
}
