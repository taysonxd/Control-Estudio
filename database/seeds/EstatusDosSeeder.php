<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon as DateTime;
use App\Models\EstatusDos;

class EstatusDosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
   
        $estatus = [
                ['id' => '1','estatus2' => 'Nuevo Ingreso', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
                ['id' => '2','estatus2' => 'Egresado', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()]
        ];

        EstatusDos::insert($estatus);
    }
}
