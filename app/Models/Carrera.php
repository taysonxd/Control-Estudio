<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Carrera extends Model{

    protected $table = 'carreras';

	public function trayectosAcademicos(){

        return $this->hasMany('App\Models\TrayectoAcademico', 'id_carrera');

  }

}
