<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Instalacion extends Model
{
    protected $table = 'instalaciones';

    public function aulas(){

        return $this->hasMany('App\Models\Aula', 'id_instalacion');

    }
}
