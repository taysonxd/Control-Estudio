<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class EstudianteRequisitos extends Pivot
{
    protected $table = 'estudiantes_requisitos';
}
