<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pais extends Model
{

	protected $table = 'paises';

    public function provincias(){
        return $this->hasMany('App\Models\Provincia','id_pais');
 	}
}
