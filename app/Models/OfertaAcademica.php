<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OfertaAcademica extends Model
{
  protected $table = 'ofertas_academicas';

  public function asignatura(){

    return $this->belongsTo('App\Models\Pensum', 'id_asignatura');

  }

  public function seccion(){

    return $this->belongsTo('App\Models\Seccion', 'id_seccion');

  }

}
