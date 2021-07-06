<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEstudiantesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('estudiantes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('discapacidad');
            $table->string('nivel_discapacidad', 100)->nullable();
            $table->string('des_discapacidad', 200)->nullable();
            $table->string('opsu', 10);
            $table->string('inst_bachillerato', 200);
            $table->integer('anio_egreso');
            $table->string('cohorte', 20);
            $table->unsignedBigInteger('id_estatus1')->nullable();
            $table->foreign('id_estatus1')->references('id')->onDelete('cascade')->on('estatus1');
            $table->unsignedBigInteger('id_estatus2')->nullable();
            $table->foreign('id_estatus2')->references('id')->onDelete('cascade')->on('estatus2');
            $table->unsignedBigInteger('id_persona');
            $table->foreign('id_persona')->references('id')->onDelete('cascade')->on('personas');
            $table->unsignedBigInteger('id_carrera');
            $table->foreign('id_carrera')->references('id')->onDelete('cascade')->on('carreras');
            $table->unsignedBigInteger('id_mencion')->nullable();
            $table->foreign('id_mencion')->references('id')->onDelete('cascade')->on('menciones');
            $table->unsignedBigInteger('id_condicion')->nullable();
            $table->foreign('id_condicion')->references('id')->onDelete('cascade')->on('condiciones');
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
        Schema::dropIfExists('estudiantes');
    }
}
