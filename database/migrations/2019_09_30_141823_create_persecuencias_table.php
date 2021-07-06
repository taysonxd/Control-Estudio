<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePersecuenciasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('persecuencias', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('periodo_academico', 20);
            $table->unsignedBigInteger('id_trayectoAca');
            $table->foreign('id_trayectoAca')->references('id')->onDelete('cascade')->on('trayecto_academico');
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
        Schema::dropIfExists('persecuencias');
    }
}
