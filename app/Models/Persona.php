<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Persona extends Model
{
    //
    protected $table = 'personas';

    public function parroquia(){
    	return $this->belongsTo('App\Models\Parroquia', 'id_parroquia');
    }

    public function provincia(){
        return $this->belongsTo('App\Models\Provincia','id_provincia_nac');
     }

     public function profesor(){
        return $this->hasMany('App\Models\Profesor', 'id_persona');
    }

    public function preinscripcion(){
       return $this->hasOne('App\Models\EstudiantePreinscrito', 'id_persona');
   }
}
