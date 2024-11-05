<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendorController extends Controller
{
    public function create()
    {
        return Inertia::render('Vendor/Register');
    }

    public function register()
    {
        return Inertia::render('Vendor/Register');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:vendors',
            'password' => 'required|string|min:8',
            'company' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
        ]);

        // Create vendor
        $vendor = Vendor::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'company' => $validated['company'],
            'phone' => $validated['phone'],
        ]);

        // Log in the vendor immediately after registration
        auth('vendor')->login($vendor);

        return redirect()->route('vendor.dashboard')->with('success', 'Registration successful! Welcome to your dashboard.');
    }
}
