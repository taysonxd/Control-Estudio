<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon as DateTime;
use App\Models\Instalacion;

class InstalacionesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $instalaciones = [
          ['cede' => "CIEPE", 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
          ['cede' => "CEOTUR", 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
        ];

        Instalacion::insert($instalaciones);
    }
}
