<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePensumTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pensum', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('codigo', 50);
            $table->string('desc_asignatura', 50)->nullable();
            $table->string('anio', 4);
            $table->integer('hps');
            $table->integer('ht')->nullable();
            $table->string('N', 2);
            $table->integer('UC');
            $table->string('prelacion', 6)->nullable();
            $table->integer('minimo_aprob')->nullable();
            $table->integer('maximo_aprob')->nullable();
            $table->unsignedBigInteger('id_materia');
            $table->foreign('id_materia')->references('id')->onDelete('cascade')->on('materias');
            $table->unsignedBigInteger('id_trayecto_academico');
            $table->foreign('id_trayecto_academico')->references('id')->onDelete('cascade')->on('trayecto_academico');
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
        Schema::dropIfExists('pensum');
    }
}
