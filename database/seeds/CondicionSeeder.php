<?php

use Illuminate\Database\Seeder;
use App\Models\Condicion;
use Carbon\Carbon as DateTime;

class CondicionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $condiciones = [ 
        		['id' => 1,'condicion' => 'REG','created_at' => DateTime::now(),'updated_at' => DateTime::now()],
        		['id' => 2,'condicion' => 'NRE','created_at' => DateTime::now(),'updated_at' => DateTime::now()],
        		['id' => 3,'condicion' => 'PAR','created_at' => DateTime::now(),'updated_at' => DateTime::now()]
    	    ];
    
        Condicion::insert($condiciones);
    }
}

