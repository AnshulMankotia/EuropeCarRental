import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { AiFillStar } from 'react-icons/ai';
import { useState } from 'react';

export default function Cars({ cars }) {
    const [expandedCar, setExpandedCar] = useState(null);

    const toggleDetails = (carId) => {
        setExpandedCar(expandedCar === carId ? null : carId);
    };

    return (
        <GuestLayout>
            <Head title="Available Cars" />

            <div className="py-12 bg-white">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-8">Our Available Cars</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cars && cars.map((car) => (
                            <div key={car.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                {/* Car Image */}
                                <div className="relative bg-lightGray pt-6 pb-6 pr-4 pl-4">
                                    <img 
                                        src={`/storage/${car.image_url}`}
                                        alt={`${car.brand} ${car.model}`}
                                        className="w-full h-48 object-cover"
                                    />
                                    <span className="absolute top-2 left-2 text-darkGray font-medium text-sm px-2 py-1 rounded bg-white/80">
                                        {car.brand}
                                    </span>
                                </div>

                                {/* Basic Car Details */}
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {car.brand} {car.model}
                                    </h3>
                                    
                                    {/* Quick Info */}
                                    <div className="flex items-center justify-between text-gray-500 text-sm my-4">
                                        <div className="flex items-center space-x-1 bg-lightGray px-2 py-1 rounded">
                                            <span>{car.seats} Seats</span>
                                        </div>
                                        <div className="flex items-center space-x-1 bg-lightGray px-2 py-1 rounded">
                                            <span>{car.transmission}</span>
                                        </div>
                                        <div className="flex items-center space-x-1 bg-lightGray px-2 py-1 rounded">
                                            <AiFillStar className="text-yellow-500" />
                                            <span>{car.rating}/5</span>
                                        </div>
                                    </div>

                                    {/* Expandable Details */}
                                    <button 
                                        onClick={() => toggleDetails(car.id)}
                                        className="text-green hover:text-black text-sm font-medium mb-4"
                                    >
                                        {expandedCar === car.id ? 'Show Less' : 'Show More'}
                                    </button>

                                    {expandedCar === car.id && (
                                        <div className="space-y-4 mt-4 border-t pt-4">
                                            <h4 className="font-semibold text-gray-900">Full Vehicle Details</h4>
                                            
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <p className="text-gray-600">Doors</p>
                                                    <p className="font-medium">{car.doors}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-600">Luggage Capacity</p>
                                                    <p className="font-medium">{car.luggage_capacity}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-600">CO2 Emission</p>
                                                    <p className="font-medium">{car.co2_emission}g/km</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-600">Minimum Age</p>
                                                    <p className="font-medium">{car.minimum_age} years</p>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <h4 className="font-semibold text-gray-900">Protection</h4>
                                                {car.basic_protection && (
                                                    <div className="text-sm">
                                                        <p className="text-green-600 flex items-center">
                                                            <span className="mr-2">✓</span>
                                                            Basic Protection Included
                                                        </p>
                                                        {car.excess_amount && (
                                                            <p className="text-gray-600 mt-1">
                                                                Excess: ₹{car.excess_amount}
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {car.unlimited_mileage && (
                                                <p className="text-green-600 text-sm flex items-center">
                                                    <span className="mr-2">✓</span>
                                                    Unlimited Mileage
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Pricing and CTA */}
                                    <div className="border-t pt-4 mt-4 flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-500">Start from</p>
                                            <p className="text-2xl font-semibold text-gray-900">
                                                ₹{car.price_per_day} <span className="text-sm">/ day</span>
                                            </p>
                                        </div>
                                        <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
                                            Rent Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
