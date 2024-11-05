<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CarController extends Controller
{
    public function store(Request $request)
    {
        // Check if user is authenticated
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        $validated = $request->validate([
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'transmission' => 'required|in:automatic,manual',
            'seats' => 'required|integer|min:1',
            'airbags' => 'required|integer|min:0',
            'rating' => 'required|numeric|min:0|max:5',
            'price_per_day' => 'required|numeric|min:0',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        try {
            // Handle image upload
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('cars', 'public');
            }

            $car = Car::create([
                'brand' => $validated['brand'],
                'model' => $validated['model'],
                'transmission' => $validated['transmission'],
                'seats' => $validated['seats'],
                'airbags' => $validated['airbags'],
                'rating' => $validated['rating'],
                'price_per_day' => $validated['price_per_day'],
                'image_url' => $imagePath ?? null,
                'vendor_id' => auth()->id()
            ]);

            return redirect()->route('vendor.dashboard')
                ->with('success', 'Car added successfully');

        } catch (\Exception $e) {
            // If there was an upload, remove the file
            if (isset($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }
            
            return back()
                ->withErrors(['error' => 'Failed to create car. ' . $e->getMessage()])
                ->withInput();
        }
    }
}
