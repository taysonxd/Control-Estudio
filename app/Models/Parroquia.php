<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Parroquia extends Model
{
    protected $table = 'parroquias';

    public function municipio(){

    	return $this->belongsTo('App\Models\Municipio', 'id_municipio');

    }

    public function persona(){

        return $this->hasMany('App\Models\Persona', 'id_parroquia');

    }

}
