<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class VendorProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Vendor/Products/Index');
    }
}
