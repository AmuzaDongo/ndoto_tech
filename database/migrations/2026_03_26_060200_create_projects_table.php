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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();

            $table->foreignId('client_id')
                  ->constrained('clients')
                  ->onDelete('cascade');

            $table->foreignId('service_id')                    // ← Linked to Service (as you requested)
                  ->constrained('services')
                  ->onDelete('cascade');

            $table->foreignId('project_owner_id')
                  ->nullable()
                  ->constrained('users')
                  ->onDelete('set null');

            $table->text('description');
            $table->text('challenge');
            $table->text('solution');
            $table->json('results'); 

            $table->json('tags');

            $table->enum('status', [
                'Planning',
                'In Progress',
                'Review',
                'Testing',
                'Deployment',
                'Completed',
                'On Hold',
                'Cancelled'
            ])->default('Planning');

            $table->enum('stage', [
                'Discovery',
                'Design',
                'Development',
                'Testing',
                'Deployment',
                'Maintenance'
            ])->nullable();

            $table->unsignedTinyInteger('progress')->default(0); // 0-100

            $table->string('image')->nullable();
            $table->integer('year')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();

            $table->decimal('budget', 15, 2)->nullable();
            $table->decimal('actual_cost', 15, 2)->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->index(['client_id', 'status']);
            $table->index(['service_id', 'status']);
            $table->index('progress');
            $table->index('project_owner_id');
            $table->index('year');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
