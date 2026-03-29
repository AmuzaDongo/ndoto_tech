<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

// Import Controllers
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\IndustryController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ConsultationController;

// Admin Controllers
use App\Http\Controllers\Admin\AdminProjectController;
use App\Http\Controllers\Admin\AdminServiceController;
use App\Http\Controllers\Admin\AdminClientController;
use App\Http\Controllers\Admin\AdminConsultationController;
use App\Http\Controllers\Admin\ConsultationSlotController;
use App\Http\Controllers\Admin\AdminDashboardController;



Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/industries', [IndustryController::class, 'index'])->name('industries');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');
Route::get('/consultation', [ConsultationController::class, 'index'])->name('consultation');
Route::post('/consultations', [ConsultationController::class, 'store'])->name('consultations.store');
Route::get('/consultation/slots', [ConsultationController::class, 'availableSlots'])->name('consultation.slots');
Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');


Route::middleware(['auth', 'verified'])
    ->prefix('admin')
    ->as('admin.')
    ->group(function () {

        Route::resource('slots', ConsultationSlotController::class)
            ->only(['index', 'store', 'destroy']);

        Route::resource('projects', AdminProjectController::class)
            ->names('projects');

        Route::resource('services', AdminServiceController::class)
            ->names('services');

        Route::resource('clients', AdminClientController::class)
            ->names('clients');

        
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])
            ->name('dashboard');

        Route::resource('consultations', AdminConsultationController::class)->names('consultations');
    });



require __DIR__ . '/settings.php';