<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

// Import Controllers
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
use App\Http\Controllers\Admin\ConsultationController as AdminConsultationController;
use App\Http\Controllers\Admin\ConsultationSlotController;
use App\Http\Controllers\Admin\AdminDashboardController;

Route::inertia('/', 'Welcome')->name('home');
Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/industries', [IndustryController::class, 'index'])->name('industries');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');
Route::get('/consultation', [ConsultationController::class, 'index'])->name('consultation');
Route::post('/consultations', [ConsultationController::class, 'store'])->name('consultations.store');
Route::get('/consultation/slots', [ConsultationController::class, 'availableSlots'])->name('consultation.slots');
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');


Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('index');
    Route::resource('projects', AdminProjectController::class);
    Route::resource('services', AdminServiceController::class);
    Route::resource('clients', AdminClientController::class);
    Route::get('/consultations', [AdminConsultationController::class, 'index'])->name('consultations.index');
    Route::resource('slots', ConsultationSlotController::class)
            ->only(['index', 'store', 'destroy']);
});

require __DIR__ . '/settings.php';