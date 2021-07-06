<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class EstudiantePreinscrito extends Model
{
	protected $table = 'estudiantes_preinscritos';

	public function requisitos_pendientes(){
	  return $this->belongsToMany('App\Models\Requisito', 'estudiantes_requisitos', 'id_estudiante_preinscrito', 'id_requisito')
	              ->using('App\Models\EstudianteRequisitos');
  }
}
