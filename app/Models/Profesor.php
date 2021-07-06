<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profesor extends Model
{
    //
    protected $table = 'profesores';

    public function persona(){
    	return $this->belongsTo('App\Models\Persona', 'id_persona');
    }

    public function asignaturas_impartidas(){

    	return $this->belongsToMany('App\Models\Pensum', 'profesores_pensum', 'id_profesor', 'id_pensum');

    }

}
