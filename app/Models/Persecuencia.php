<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Persecuencia extends Model
{
    
	protected $table = 'persecuencias';

	/**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'cohorte', 'id_carrera', 'id_trayecto'
    ];

	public function secciones(){

		return $this->hasMany('App\Models\Seccion', 'id_persecuencia');

	}

}
