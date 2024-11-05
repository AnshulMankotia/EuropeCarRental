<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\VendorDashboardController;
use App\Http\Controllers\VendorProductController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VendorAuthController;
use App\Http\Controllers\VendorOrderController;
use App\Http\Controllers\CarsController;
use App\Http\Controllers\DashboardController;

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
    return Inertia::render('Welcome');
})->name('welcome');

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/about-us', function () {
    return Inertia::render('About');
});

Route::get('/register', [RegisteredUserController::class, 'create'])
    ->name('register')
    ->middleware('guest');

Route::get('/vendor/register', function () {
    return Inertia::render('Auth/VendorRegister');
})->name('vendor.register');

Route::post('/vendor/register', [VendorController::class, 'register'])->name('vendor.register.store');

Route::middleware(['auth:vendor'])->group(function () {
    Route::get('/vendor/dashboard', [VendorController::class, 'dashboard'])->name('vendor.dashboard');
    Route::post('/vendor/cars', [CarController::class, 'store'])->name('vendor.cars.store');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    
    Route::get('/orders', [OrderController::class, 'index'])->name('orders');
    // ... other user routes
});

Route::middleware(['auth', 'vendor'])->prefix('vendor')->group(function () {
    Route::get('/dashboard', [VendorDashboardController::class, 'index'])->name('vendor.dashboard');
    Route::post('/cars', [CarController::class, 'store'])->name('vendor.cars.store');
    Route::get('/products', [VendorProductController::class, 'index'])->name('vendor.products');
    Route::get('/orders', [VendorOrderController::class, 'index'])->name('vendor.orders');
    Route::put('/cars/{car}', [CarController::class, 'update'])->name('vendor.cars.update');
    Route::delete('/cars/{car}', [CarController::class, 'destroy'])->name('vendor.cars.delete');
    // ... other vendor routes
});

// Public routes
Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('vendor/register', function () {
        return Inertia::render('Vendor/Register');
    })->name('vendor.register');
    
    Route::post('/vendor/register', [VendorController::class, 'store'])
        ->name('vendor.register.store');
});

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->name('logout');

require __DIR__.'/auth.php';

// Debug route list
Route::get('/debug-routes', function () {
    $routes = Route::getRoutes();
    foreach ($routes as $route) {
        echo $route->uri() . ' - ' . $route->getName() . '<br>';
    }
});

// Vendor Routes
Route::middleware(['guest'])->group(function () {
    Route::get('/vendor/register', function () {
        return Inertia::render('Vendor/Register');
    })->name('vendor.register');
    
    Route::post('/vendor/register', [VendorController::class, 'store'])
        ->name('vendor.register.store');
});

Route::middleware(['auth:vendor'])->prefix('vendor')->group(function () {
    Route::get('/dashboard', [VendorDashboardController::class, 'index'])
        ->name('vendor.dashboard');
    Route::post('/logout', [VendorAuthController::class, 'logout'])
        ->name('vendor.logout');
    Route::post('/cars', [CarController::class, 'store'])
        ->name('vendor.cars.store');
    Route::put('/cars/{car}', [CarController::class, 'update'])->name('vendor.cars.update');
    Route::delete('/cars/{car}', [CarController::class, 'destroy'])->name('vendor.cars.destroy');
});

Route::get('/cars', [CarController::class, 'index'])->name('cars.index');
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
Route::get('/vendor/register', [VendorController::class, 'register'])->name('vendor.register');
// ... other routes ...
