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
        Schema::create('consultation_slots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('professional_id')
                  ->constrained('users')
                  ->onDelete('cascade');

            $table->dateTime('start_time');
            $table->dateTime('end_time');

            $table->string('status')->default('available'); 
            // available, booked, blocked, completed, cancelled

            // This is safe now because bookings table already exists
            $table->foreignId('booking_id')
                  ->nullable()
                  ->constrained('bookings')
                  ->onDelete('set null');

            $table->integer('duration_minutes')->nullable();

            $table->timestamps();

            // Performance indexes
            $table->index(['professional_id', 'start_time']);
            $table->index(['start_time', 'end_time']);
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultation_slots');
    }
};
