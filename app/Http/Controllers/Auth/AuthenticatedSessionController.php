<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthenticatedSessionController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/Login');
    }

    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'type' => 'required|in:user,vendor',
        ]);

        $credentials = $request->only('email', 'password');

        if ($request->type === 'vendor') {
            if (Auth::guard('vendor')->attempt($credentials)) {
                $request->session()->regenerate();
                
                return redirect()->intended(route('vendor.dashboard'));
            }
        } else {
            if (Auth::attempt($credentials)) {
                $request->session()->regenerate();
                
                return redirect()->intended(route('dashboard'));
            }
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function destroy(Request $request)
    {
        if (Auth::guard('vendor')->check()) {
            Auth::guard('vendor')->logout();
        } else {
            Auth::guard('web')->logout();
        }

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
