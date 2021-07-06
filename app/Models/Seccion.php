<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seccion extends Model
{

	protected $table = 'secciones';

  public function carga_academica(){

    return $this->belongsToMany('App\Models\Pensum', 'ofertas_academicas', 'id_seccion', 'id_asignatura')
								->withPivot('id as id_oferta_academica');

  }

	public function clases_agendadas(){

		return $this->hasManyThrough(
            'App\Models\Clase',
            'App\Models\OfertaAcademica',
            'id_seccion',
            'id_oferta_academica'
	        );

  }

}
