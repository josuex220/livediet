<?php

use App\Http\Controllers\DietController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use App\Jobs\NutriAssistantJob;
use App\Models\Diet;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    //Diet

    Route::get('/dashboard', function () {

        return Inertia::render('Dashboard',  [
            'flash' => [
                'success' => Session::get('success')
            ]
        ]);
    })->name('dashboard');


    Route::get('/mydiet', [DietController::class, 'index'])->name('diet.index');
    Route::get('/mydiet/list', [DietController::class, 'list'])->name('diet.list');
    Route::post('/diet/submit', [DietController::class,'store'])->name('diet.submit');


    // Route::get('/generatePayment', [PaymentController::class,'store'])->name('payment.store');
    Route::get('/mydiet/{id}', [DietController::class, 'view'])->name('diet.view');
    Route::get('/mydiet/{id}/details', [DietController::class, 'details'])->name('diet.detail');
});

require __DIR__.'/auth.php';
