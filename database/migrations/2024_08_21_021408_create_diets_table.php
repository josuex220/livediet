<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDietsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('diets', function (Blueprint $table) {
            $table->id();
            $table->string('peso');
            $table->string('altura');
            $table->string('idade');
            $table->string('objetivo');
            $table->string('calorias_desejadas');
            $table->string('genero');
            $table->json('selected_cafes');
            $table->json('selected_almocos');
            $table->json('selected_lanches');
            $table->json('selected_jantas');
            $table->string('activity_level');
            $table->string('wants_training');
            $table->string('meal_times');
            $table->string('wants_chocolate');
            $table->integer('user_id');
            $table->enum('paid', ['PAGO', 'PENDENTE']);
            $table->enum('pending', ['PENDENTE', 'GERADO']);
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
        Schema::dropIfExists('diets');
    }
}
