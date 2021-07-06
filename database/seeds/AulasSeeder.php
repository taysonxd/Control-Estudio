<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon as DateTime;
use App\Models\Aula;

class AulasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $aulas = [
          ['name' => "A01",	'id_instalacion' => 1, 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
          ['name' => "A02", 'id_instalacion' => 1, 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
        ];

        Aula::insert($aulas);
    }
}
