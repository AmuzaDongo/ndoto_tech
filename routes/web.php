<?php


use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\IndustryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Admin\ConsultationController as AdminConsultationController;
use App\Http\Controllers\Admin\ConsultationSlotController;
use App\Http\Controllers\ConsultationController;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::prefix('admin')->group(function () {
        Route::get('/slots', [ConsultationSlotController::class,'index']);
        Route::post('/slots', [ConsultationSlotController::class,'store']);
        Route::delete('/slots/{id}', [ConsultationSlotController::class,'destroy']);

        Route::get('/consultations', [AdminConsultationController::class, 'index'])->name('admin.consultations.index');
    });
});


Route::get('/services', [ServiceController::class, 'index'])->name('services');
Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/projects', [ProjectController::class, 'index'])->name('projects');
Route::get('/industries', [IndustryController::class, 'index'])->name('industries');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('contact', [ContactController::class, 'send'])->name('contact.send');
Route::get('/consultation', [ConsultationController::class, 'index'])->name('consultation');
Route::post('/consultations', [ConsultationController::class, 'store']);
Route::get('/consultation/slots', [ConsultationController::class, 'availableSlots']);

require __DIR__.'/settings.php';
