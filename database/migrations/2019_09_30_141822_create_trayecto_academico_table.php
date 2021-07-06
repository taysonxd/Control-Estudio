<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTrayectoAcademicoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('trayecto_academico', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('trayecto',100);
            $table->boolean('ti')->default(false);
            $table->unsignedBigInteger('id_carrera');
            $table->foreign('id_carrera')->references('id')->onDelete('cascade')->on('carreras');
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
        Schema::dropIfExists('trayecto_academico');
    }
}
