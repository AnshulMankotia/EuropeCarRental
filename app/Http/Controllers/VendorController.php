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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:vendors',
            'password' => 'required|string|min:8',
            'company' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
        ]);

        // Add debug logging
        \Log::info('Registering vendor', ['email' => $validated['email']]);

        $vendor = \App\Models\Vendor::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']), // Make sure password is hashed
            'company' => $validated['company'],
            'phone' => $validated['phone'],
        ]);

        \Log::info('Vendor registered successfully', ['id' => $vendor->id]);

        return redirect()->route('login')->with('success', 'Registration successful! Please login.');
    }
}
