<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $fillable = [
        'vendor_id',
        'brand',
        'model',
        'transmission',
        'seats',
        'airbags',
        'rating',
        'price_per_day',
        'image_url',
        'doors',
        'luggage_capacity',
        'fuel_type',
        'co2_emission',
        'minimum_age',
        'unlimited_mileage',
        'basic_protection',
        'excess_amount'
    ];

    protected $casts = [
        'unlimited_mileage' => 'boolean',
        'basic_protection' => 'boolean',
    ];

    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }
}
