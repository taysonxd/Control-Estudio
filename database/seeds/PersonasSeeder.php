<?php

use Illuminate\Database\Seeder;
use App\Models\Persona;
use Carbon\Carbon as DateTime;


class PersonasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $personas = [
            ['nacionalidad' => 'ven','cedula' => '17700717','sexo' => 'M','nombre_uno' => 'Antonio','nombre_dos' => 'Antonio','apellido_uno' => 'Antonio','apellido_dos' => 'Antonio','email'=>'antonio@uney.edu.ve','fecha_nac'=>'1985-11-28','local_direccion'=>'independencia','id_parroquia'=>1,'id_provincia_nac'=>1,'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
            ['nacionalidad' => 'ven','cedula' => '12345676','sexo' => 'M','nombre_uno' => 'Arcadio','nombre_dos' => 'Antonio','apellido_uno' => 'Arcadio','apellido_dos' => 'Arcadio','email'=>'arcadio@uney.edu.ve','fecha_nac'=>'2001-11-28','local_direccion'=>'independencia','id_parroquia'=>1,'id_provincia_nac'=>1,'created_at' => DateTime::now(),'updated_at' => DateTime::now()]
        ];

    Persona::insert($personas);
    }
}
