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
        Schema::table('consultations', function (Blueprint $table) {
            $table->foreignId('consultation_slot_id')
                  ->nullable()                          // ← Fixes SQLite error + logical for most apps
                  ->constrained('consultation_slots')
                  ->cascadeOnDelete();                  // or ->onDelete('cascade') — same thing
                  // Optional but useful:
                  // ->index();                         // if you frequently query by slot
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('consultations', function (Blueprint $table) {
            // Drop foreign key constraint first (prevents errors on some DBs)
            $table->dropForeign(['consultation_slot_id']);
            $table->dropColumn('consultation_slot_id');
        });
    }
};