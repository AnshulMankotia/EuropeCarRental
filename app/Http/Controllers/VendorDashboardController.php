<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class VendorDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Vendor/Dashboard');
    }
}
