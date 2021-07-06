<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePrelacionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prelaciones', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('id_preler')->nullable();
            $table->foreign('id_preler')->references('id')->onDelete('cascade')->on('pensum');
            $table->unsignedBigInteger('id_preled')->nullable();
            $table->foreign('id_preled')->references('id')->onDelete('cascade')->on('pensum');
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
        Schema::dropIfExists('prelaciones');
    }
}
