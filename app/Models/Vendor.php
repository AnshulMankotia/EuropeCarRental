<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Vendor extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'company',
        'phone',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function cars()
    {
        return $this->hasMany(Car::class);
    }
}
