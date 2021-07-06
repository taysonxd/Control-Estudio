<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prelacion extends Model
{
    protected $table = "prelaciones";

    public function prelas(){

        return $this->belongsTo('App\Models\Pensum', 'id_preler', 'id');

    }
}
