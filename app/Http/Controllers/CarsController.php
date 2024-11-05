<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Inertia\Inertia;

class CarsController extends Controller
{
    public function index()
    {
        $cars = Car::latest()->get();

        return Inertia::render('Cars', [
            'cars' => $cars
        ]);
    }
} 