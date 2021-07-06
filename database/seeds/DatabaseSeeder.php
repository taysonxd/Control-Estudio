<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
    	  $this->truncateTables(['profesores_bd', 'estudiantes_requisitos', 'requisitos', 'paises', 'provincias', 'carreras', 'estados', 'municipios', 'parroquias','cohortes','condiciones','estatus1','estatus2','pensum','trayectos','materias',"menciones","users","profesores","instalaciones","aulas"]);

        $this->call(CarrerasSeeder::class);
        $this->call(CohorteSeeder::class);
        $this->call(CondicionSeeder::class);
        $this->call(EstatusDosSeeder::class);
        $this->call(EstatusUnoSeeder::class);
        $this->call(MencionesSeeder::class);
        $this->call(MateriaSeeder::class);
        $this->call(TrayectoSeeder::class);
        $this->call(PensumSeeder::class);
        $this->call(RequisitosSeeder::class);
        $this->call(PaisesSeeder::class);
        $this->call(ProvinciasSeeder::class);
        $this->call(UsuarioSeeder::class);
        $this->call(EstadosSeeder::class);
        $this->call(MunicipiosSeeder::class);
        $this->call(ParroquiasSeeder::class);
        $this->call(PersonasSeeder::class);
        $this->call(ProfesoresSeeder::class);
        $this->call(ProfesoresBDSeeder::class);
        $this->call(InstalacionesSeeder::class);
        $this->call(AulasSeeder::class);

    }

    protected function truncateTables(array $tables){

    	DB::statement('SET session_replication_role = \'replica\';');
      //DB::statement('SET FOREIGN_KEY_CHECKS=0');
    	foreach($tables as $table){

    		DB::table($table)->truncate();

    	}

    	DB::statement('SET session_replication_role = \'origin\';');
      //DB::statement('SET FOREIGN_KEY_CHECKS=1');
    }

}
