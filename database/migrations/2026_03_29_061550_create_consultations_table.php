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
        Schema::create('consultations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->index();
            $table->string('phone')->nullable();
            $table->string('company')->nullable();
            $table->foreignId('service_id')->nullable()->constrained('services'); // better than string
            $table->decimal('budget', 12, 2)->nullable();
            $table->text('message');
            $table->string('status')->default('new'); // new, contacted, qualified, converted_to_booking, closed
            $table->foreignId('assigned_to')->nullable()->constrained('users'); // which team member handles this lead
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultations');
    }
};
