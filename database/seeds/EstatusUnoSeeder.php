<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon as DateTime;
use App\Models\EstatusUno;

class EstatusUnoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
   
        $estatus = [
                ['id' => '1','estatus1' => 'Activo', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
                ['id' => '2','estatus1' =>'Inactivo', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
                ['id' => '3','estatus1' =>'Retirado', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
                ['id' => '4','estatus1' => 'Congelado' ,'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
        ];

        EstatusUno::insert($estatus);
    }
}
