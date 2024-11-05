<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CarController extends Controller
{
    public function index()
    {
        $cars = Car::with('vendor')->latest()->get();
        return Inertia::render('Cars', [
            'cars' => $cars
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'transmission' => 'required|in:automatic,manual',
            'seats' => 'required|integer|min:1',
            'airbags' => 'required|integer|min:0',
            'rating' => 'required|numeric|min:0|max:5',
            'price_per_day' => 'required|numeric|min:0',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'doors' => 'nullable|integer|min:2',
            'luggage_capacity' => 'nullable|integer|min:0',
            'fuel_type' => 'nullable|string',
            'co2_emission' => 'nullable|integer',
            'minimum_age' => 'nullable|integer|min:18',
            'unlimited_mileage' => 'nullable|boolean',
            'basic_protection' => 'nullable|boolean',
            'excess_amount' => 'nullable|numeric|min:0'
        ]);

        try {
            $imagePath = $request->file('image')->store('cars', 'public');
            
            Car::create([
                ...$validated,
                'image_url' => $imagePath,
                'vendor_id' => auth()->guard('vendor')->id(),
                'doors' => $validated['doors'] ?? 4,
                'luggage_capacity' => $validated['luggage_capacity'] ?? 1,
                'fuel_type' => $validated['fuel_type'] ?? 'Petrol',
                'minimum_age' => $validated['minimum_age'] ?? 18,
                'unlimited_mileage' => $validated['unlimited_mileage'] ?? true,
                'basic_protection' => $validated['basic_protection'] ?? true,
            ]);

            return redirect()->route('vendor.dashboard')->with('success', 'Car added successfully');
        } catch (\Exception $e) {
            if (isset($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }
            return back()->withErrors(['error' => 'Failed to add car. ' . $e->getMessage()]);
        }
    }

    public function update(Request $request, Car $car)
    {
        // Check if the car belongs to the authenticated vendor
        if ($car->vendor_id !== auth()->guard('vendor')->id()) {
            return back()->withErrors(['error' => 'Unauthorized action.']);
        }

        $validated = $request->validate([
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'transmission' => 'required|in:automatic,manual',
            'seats' => 'required|integer|min:1',
            'airbags' => 'required|integer|min:0',
            'rating' => 'required|numeric|min:0|max:5',
            'price_per_day' => 'required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        try {
            if ($request->hasFile('image')) {
                // Delete old image
                if ($car->image_url) {
                    Storage::disk('public')->delete($car->image_url);
                }
                // Store new image
                $validated['image_url'] = $request->file('image')->store('cars', 'public');
            }

            $car->update($validated);

            return redirect()->back()->with('success', 'Car updated successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to update car. ' . $e->getMessage()]);
        }
    }

    public function destroy(Car $car)
    {
        // Check if the car belongs to the authenticated vendor
        if ($car->vendor_id !== auth()->guard('vendor')->id()) {
            return response()->json(['error' => 'Unauthorized action.'], 403);
        }

        try {
            // Delete the car image
            if ($car->image_url) {
                Storage::disk('public')->delete($car->image_url);
            }
            
            $car->delete();
            
            return redirect()->back()->with('success', 'Car deleted successfully');
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete car.'], 500);
        }
    }
}
