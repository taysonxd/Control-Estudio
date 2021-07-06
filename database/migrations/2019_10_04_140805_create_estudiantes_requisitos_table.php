<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEstudiantesRequisitosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('estudiantes_requisitos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('id_estudiante_preinscrito');
            $table->foreign('id_estudiante_preinscrito')->references('id')->onDelete('cascade')->on('estudiantes_preinscritos');
            $table->unsignedBigInteger('id_requisito');
            $table->foreign('id_requisito')->references('id')->onDelete('cascade')->on('requisitos');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('estudiantes_requisitos');
    }
}
