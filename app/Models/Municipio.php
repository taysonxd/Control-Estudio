<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Municipio extends Model
{
    protected $table = 'municipios';

    public function estado(){

    	return $this->belongsTo('App\Models\Estado', 'id_estado');

    }

    public function parroquia(){

        return $this->hasMany('App\Models\Parroquia', 'id_municipio');

    }

}
