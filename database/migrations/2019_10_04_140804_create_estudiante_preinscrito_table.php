<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEstudiantePreinscritoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('estudiantes_preinscritos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('discapacidad');
            $table->string('nivel_discapacidad', 100)->nullable();
            $table->string('des_discapacidad', 200)->nullable();
            $table->string('opsu', 10);
            $table->string('inst_bachillerato', 200);
            $table->integer('anio_egreso');
            $table->unsignedBigInteger('id_persona');
            $table->unsignedBigInteger('id_carrera');
            $table->foreign('id_persona')->references('id')->onDelete('cascade')->on('personas');
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
        Schema::dropIfExists('estudiante_preinscrito');
    }
}
