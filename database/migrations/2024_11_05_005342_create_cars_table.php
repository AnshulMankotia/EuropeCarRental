<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('vendor_id');
            $table->string('brand');
            $table->string('model');
            $table->string('transmission');
            $table->integer('seats');
            $table->integer('airbags');
            $table->decimal('rating', 2, 1);
            $table->decimal('price_per_day', 10, 2);
            $table->string('image_url')->nullable();
            $table->timestamps();

            $table->foreign('vendor_id')
                  ->references('id')
                  ->on('vendors')
                  ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('cars');
    }
};