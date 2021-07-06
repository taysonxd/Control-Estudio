<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Clase extends Model
{
  protected $table = 'clases';

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'codigo', 'dia', 'inicio', 'final', 'bloques', 'id_aula', 'id_horario', 'id_oferta_academica'
  ];

	public function horario(){

	  return $this->belongsTo('App\Models\Horario', 'id_horario');

  }

}
