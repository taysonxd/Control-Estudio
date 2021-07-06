<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAsignaturasAgendadasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clases', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('codigo', 20);
            $table->string('dia', 20);
            $table->time('inicio');
            $table->time('final');
            $table->integer('bloques');
            $table->unsignedBigInteger('id_aula');
            $table->foreign('id_aula')->references('id')->onDelete('cascade')->on('aulas');
            $table->unsignedBigInteger('id_horario');
            $table->foreign('id_horario')->references('id')->onDelete('cascade')->on('horarios');
            $table->unsignedBigInteger('id_oferta_academica');
            $table->foreign('id_oferta_academica')->references('id')->onDelete('cascade')->on('ofertas_academicas');
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
        Schema::dropIfExists('asignaturas_agendadas');
    }
}
