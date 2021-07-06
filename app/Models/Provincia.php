<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Provincia extends Model
{

	protected $table = 'provincias';

    public function pais(){
      return $this->belongsTo('App\Models\Pais', 'id', 'id_pais');
   	}

     public function persona(){
        return $this->hasMany('App\Models\Persona', 'id_provincia_nac');
 		}
}
