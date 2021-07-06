<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOfertaAcademicaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ofertas_academicas', function (Blueprint $table) {
          $table->bigIncrements('id');
          $table->string('periodo_academico', 20);
          $table->unsignedBigInteger('id_asignatura');
          $table->foreign('id_asignatura')->references('id')->onDelete('cascade')->on('pensum');
          $table->unsignedBigInteger('id_seccion');
          $table->foreign('id_seccion')->references('id')->onDelete('cascade')->on('secciones');
          $table->unsignedBigInteger('id_mencion')->nullable();
          $table->foreign('id_mencion')->references('id')->onDelete('cascade')->on('menciones');
          $table->string('descripcion')->nullable();
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
        Schema::dropIfExists('oferta_academica');
    }
}
