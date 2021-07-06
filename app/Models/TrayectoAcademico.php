<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrayectoAcademico extends Model{

    protected $table = 'trayecto_academico';

    public function carrera(){
        return $this->belongsTo('App\Models\Carrera', 'id_carrera', 'id');
    }

    public function asignaturas(){
    	return $this->hasMany('App\Models\Pensum', 'id_trayecto_academico');
    }

}
