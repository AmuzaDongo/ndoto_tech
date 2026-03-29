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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('professional_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('service_id')->constrained('services')->onDelete('cascade');

            $table->dateTime('start_time');
            $table->dateTime('end_time');

            $table->string('status')->default('pending'); // pending, confirmed, completed, cancelled, no_show

            $table->decimal('price', 10, 2)->nullable();
            $table->string('currency')->default('USD');

            // Guest info (for non-registered users)
            $table->string('guest_name')->nullable();
            $table->string('guest_email')->nullable();
            $table->string('guest_company')->nullable();

            $table->text('client_notes')->nullable();
            $table->text('internal_notes')->nullable();

            $table->string('meeting_link')->nullable();
            $table->string('meeting_password')->nullable();

            $table->timestamp('cancelled_at')->nullable();
            $table->text('cancellation_reason')->nullable();

            $table->timestamps();

            // Important indexes
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
        Schema::dropIfExists('bookings');
    }
};
