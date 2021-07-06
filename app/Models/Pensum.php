<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Pensum extends Model
{

	protected $table = "pensum";

	/**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'codigo', 'desc_asignatura', 'anio', 'hps', 'ht', 'N', 'UC', 'prelacion', 'id_materia', 'id_trayecto', 'id_trayecto_academico'
    ];


    public function trayectoAcademico(){
        return $this->belongsTo('App\Models\TrayectoAcademico', 'id_trayecto_academico', 'id');
    }

    public function materia(){
        return $this->belongsTo('App\Models\Materia', 'id_materia', 'id');
    }

    public function prelaciones(){

        return $this->hasMany('App\Models\Prelacion', 'id_preled');
    }

		public function ofertas_academicas(){

        return $this->hasMany('App\Models\OfertaAcademica', 'id_asignatura');
    }

		public function docentes_disponibles(){

    	return $this->belongsToMany('App\Models\Profesor', 'profesores_pensum', 'id_pensum', 'id_profesor');

    }

}
