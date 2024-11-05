<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Vendor;

class RegisterController extends Controller
{
    public function create(string $type)
    {
        return Inertia::render('Auth/Register', [
            'userType' => $type
        ]);
    }

    public function store(Request $request, string $type)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.($type === 'vendor' ? 'vendors' : 'users'),
            'password' => 'required|string|min:8|confirmed',
            // Add any type-specific validation rules
        ]);

        $model = $type === 'vendor' ? Vendor::class : User::class;
        
        $user = $model::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            // Add any type-specific fields
        ]);

        Auth::guard($type)->login($user);

        return redirect()->route($type.'.dashboard');
    }
} 