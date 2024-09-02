<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mercadopago', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->string('mp_id');
            $table->float('price');
            $table->integer('diet_id');
            $table->enum('status', ['PENDING', 'CANCELED', 'PAGO'])->default('PENDING');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mercadopago');
    }
};
