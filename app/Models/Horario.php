<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Horario extends Model
{
    protected $table = 'horarios';

    public function clases(){
    	return $this->hasMany('App\Models\Clase', 'id_horario');
    }

}
