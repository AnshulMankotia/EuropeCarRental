<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    public function handleGoogleCallback()
    {
        $googleUser = Socialite::driver('google')->user();
        
        $user = User::updateOrCreate([
            'email' => $googleUser->email,
        ], [
            'name' => $googleUser->name,
            'password' => bcrypt(str_random(24)),
        ]);
        
        Auth::login($user);
        
        return redirect('/dashboard');
    }

    public function handleFacebookCallback()
    {
        $facebookUser = Socialite::driver('facebook')->user();
        
        $user = User::updateOrCreate([
            'email' => $facebookUser->email,
        ], [
            'name' => $facebookUser->name,
            'password' => bcrypt(str_random(24)),
        ]);
        
        Auth::login($user);
        
        return redirect('/dashboard');
    }
}
