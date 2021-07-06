<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMencionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menciones', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('id_carrera');
            $table->foreign('id_carrera')->references('id')->onDelete('cascade')->on('carreras');
            $table->string('mencion', 50);
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
        Schema::dropIfExists('menciones');
    }
}
