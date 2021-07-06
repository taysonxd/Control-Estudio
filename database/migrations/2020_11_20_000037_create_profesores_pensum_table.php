<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfesoresPensumTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profesores_pensum', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('id_profesor');
            $table->foreign('id_profesor')->references('id')->onDelete('cascade')->on('profesores');
            $table->unsignedBigInteger('id_pensum');
            $table->foreign('id_pensum')->references('id')->onDelete('cascade')->on('pensum');
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
        Schema::dropIfExists('profesores_pensum');
    }
}
