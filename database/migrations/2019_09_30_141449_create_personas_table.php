<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePersonasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('personas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nacionalidad', 5);
            $table->string('cedula', 9);
            $table->string('sexo', 10);
            $table->string('nombre_uno', 50);
            $table->string('nombre_dos', 50);
            $table->string('apellido_uno', 50);
            $table->string('apellido_dos', 50);
            $table->string('email',100)->unique();
            $table->date('fecha_nac');
            $table->string('local_direccion', 50);
            $table->unsignedBigInteger('id_parroquia');
            $table->foreign('id_parroquia')->references('id')->onDelete('cascade')->on('parroquias');
            $table->unsignedBigInteger('id_provincia_nac');
            $table->foreign('id_provincia_nac')->references('id')->onDelete('cascade')->on('provincias');
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
        Schema::dropIfExists('personas');
    }
}
