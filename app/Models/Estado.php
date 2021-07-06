<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Estado extends Model
{
    protected $table = 'estados';

    public function municipio(){

        return $this->hasMany('App\Models\Municipio', 'id_estado');

    }
}
