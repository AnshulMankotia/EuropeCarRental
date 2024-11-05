<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class VendorDashboardController extends Controller
{
    public function index()
    {
        $vendor = Auth::guard('vendor')->user();
        $cars = $vendor->cars()->latest()->get();
        
        return Inertia::render('Vendor/Dashboard', [
            'cars' => $cars,
            'stats' => [
                'totalCars' => $cars->count(),
                'activeRentals' => 0, // You can implement this later
                'totalEarnings' => 0, // You can implement this later
            ]
        ]);
    }
}
