<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    protected $table = 'estudiantes';

    public function persona(){

    	return $this->belongsTo('App\Models\Persona', 'id_persona');

    }

	  public function carrera(){

    	return $this->belongsTo('App\Models\Carrera', 'id_carrera');

    }

    public function asignaturas_en_curso(){

    	return $this->belongsToMany('App\Models\OfertaAcademica', 'asigs_en_curso', 'id_estudiante', 'id_oferta_academica')
                  ->with('asignatura');

    }

}
