<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAsigsEnCursoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('asigs_en_curso', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('id_oferta_academica');
            $table->foreign('id_oferta_academica')->references('id')->onDelete('cascade')->on('ofertas_academicas');
            $table->unsignedBigInteger('id_estudiante');
            $table->foreign('id_estudiante')->references('id')->onDelete('cascade')->on('estudiantes');
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
        Schema::dropIfExists('asigs_en_curso');
    }
}
