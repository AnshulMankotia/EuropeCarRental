import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Dashboard({ auth, cars, stats }) {
    const [showForm, setShowForm] = useState(false);
    const [editingCar, setEditingCar] = useState(null);
    
    const { data, setData, post, put, processing, errors, reset } = useForm({
        brand: '',
        model: '',
        transmission: '',
        seats: '',
        airbags: '',
        rating: '',
        price_per_day: '',
        image: null,
        doors: '4',
        luggage_capacity: '1',
        fuel_type: 'Petrol',
        co2_emission: '',
        minimum_age: '18',
        unlimited_mileage: true,
        basic_protection: true,
        excess_amount: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editingCar) {
            router.post(route('vendor.cars.update', editingCar.id), {
                _method: 'PUT',
                ...data,
                image: data.image,
            }, {
                forceFormData: true,
                onSuccess: () => {
                    reset();
                    setShowForm(false);
                    setEditingCar(null);
                    if (document.getElementById('image')) {
                        document.getElementById('image').value = '';
                    }
                },
            });
        } else {
            post(route('vendor.cars.store'), {
                forceFormData: true,
                onSuccess: () => {
                    reset();
                    setShowForm(false);
                    document.getElementById('image').value = '';
                },
            });
        }
    };

    const handleEdit = (car) => {
        setEditingCar(car);
        setData({
            brand: car.brand,
            model: car.model,
            transmission: car.transmission,
            seats: car.seats,
            airbags: car.airbags,
            rating: car.rating,
            price_per_day: car.price_per_day,
            image: null
        });
        setShowForm(true);
    };

    const handleDelete = (carId) => {
        if (confirm('Are you sure you want to delete this car?')) {
            router.delete(route('vendor.cars.destroy', carId), {
                preserveScroll: true,
                onSuccess: () => {
                    // Optional: Show success message
                },
                onError: (errors) => {
                    console.error(errors);
                },
            });
        }
    };

    const handleImageChange = (e) => {
        setData('image', e.target.files[0]);
    };

    return (
        <AuthenticatedLayout
            user={auth.vendor}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Vendor Dashboard</h2>}
        >
            <Head title="Vendor Dashboard" />

            <div className="py-12 bg-login-background-image bg-cover bg-center flex items-center m-auto">
                <div className="container max-w-screen-xl mx-auto">
                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900">Total Cars</h3>
                            <p className="text-3xl font-bold text-indigo-600">{stats.totalCars}</p>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900">Active Rentals</h3>
                            <p className="text-3xl font-bold text-green-600">{stats.activeRentals}</p>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900">Total Earnings</h3>
                            <p className="text-3xl font-bold text-blue-600">₹{stats.totalEarnings}</p>
                        </div>
                    </div>

                    {/* Cars Section */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">My Cars</h3>
                                <PrimaryButton onClick={() => setShowForm(!showForm)}>
                                    {showForm ? 'Cancel' : 'Add New Car'}
                                </PrimaryButton>
                            </div>

                            {/* Add Car Form */}
                            {showForm && (
                                <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Brand */}
                                        <div>
                                            <InputLabel htmlFor="brand" value="Brand" />
                                            <TextInput
                                                id="brand"
                                                type="text"
                                                value={data.brand}
                                                onChange={e => setData('brand', e.target.value)}
                                                className="mt-1 block w-full"
                                                required
                                            />
                                            <InputError message={errors.brand} className="mt-2" />
                                        </div>

                                        {/* Model */}
                                        <div>
                                            <InputLabel htmlFor="model" value="Model" />
                                            <TextInput
                                                id="model"
                                                type="text"
                                                value={data.model}
                                                onChange={e => setData('model', e.target.value)}
                                                className="mt-1 block w-full"
                                                required
                                            />
                                            <InputError message={errors.model} className="mt-2" />
                                        </div>

                                        {/* Transmission */}
                                        <div>
                                            <InputLabel htmlFor="transmission" value="Transmission" />
                                            <select
                                                id="transmission"
                                                value={data.transmission}
                                                onChange={e => setData('transmission', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                                required
                                            >
                                                <option value="">Select Transmission</option>
                                                <option value="automatic">Automatic</option>
                                                <option value="manual">Manual</option>
                                            </select>
                                            <InputError message={errors.transmission} className="mt-2" />
                                        </div>

                                        {/* Seats */}
                                        <div>
                                            <InputLabel htmlFor="seats" value="Number of Seats" />
                                            <TextInput
                                                id="seats"
                                                type="number"
                                                value={data.seats}
                                                onChange={e => setData('seats', e.target.value)}
                                                className="mt-1 block w-full"
                                                required
                                            />
                                            <InputError message={errors.seats} className="mt-2" />
                                        </div>

                                        {/* Airbags */}
                                        <div>
                                            <InputLabel htmlFor="airbags" value="Number of Airbags" />
                                            <TextInput
                                                id="airbags"
                                                type="number"
                                                value={data.airbags}
                                                onChange={e => setData('airbags', e.target.value)}
                                                className="mt-1 block w-full"
                                                required
                                            />
                                            <InputError message={errors.airbags} className="mt-2" />
                                        </div>

                                        {/* Rating */}
                                        <div>
                                            <InputLabel htmlFor="rating" value="Rating" />
                                            <TextInput
                                                id="rating"
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                max="5"
                                                value={data.rating}
                                                onChange={e => setData('rating', e.target.value)}
                                                className="mt-1 block w-full"
                                                required
                                            />
                                            <InputError message={errors.rating} className="mt-2" />
                                        </div>

                                        {/* Price per Day */}
                                        <div>
                                            <InputLabel htmlFor="price_per_day" value="Price per Day (₹)" />
                                            <TextInput
                                                id="price_per_day"
                                                type="number"
                                                value={data.price_per_day}
                                                onChange={e => setData('price_per_day', e.target.value)}
                                                className="mt-1 block w-full"
                                                required
                                            />
                                            <InputError message={errors.price_per_day} className="mt-2" />
                                        </div>

                                        {/* Image Upload */}
                                        <div className="col-span-2">
                                            <InputLabel htmlFor="image" value="Car Image" />
                                            <input
                                                id="image"
                                                type="file"
                                                onChange={e => setData('image', e.target.files[0])}
                                                className="mt-1 block w-full"
                                                accept="image/*"
                                                required={!editingCar}
                                            />
                                            <InputError message={errors.image} className="mt-2" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <InputLabel htmlFor="doors" value="Number of Doors" />
                                            <TextInput
                                                id="doors"
                                                type="number"
                                                value={data.doors}
                                                onChange={e => setData('doors', e.target.value)}
                                                className="mt-1 block w-full"
                                            />
                                            <InputError message={errors.doors} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="luggage_capacity" value="Luggage Capacity" />
                                            <TextInput
                                                id="luggage_capacity"
                                                type="number"
                                                value={data.luggage_capacity}
                                                onChange={e => setData('luggage_capacity', e.target.value)}
                                                className="mt-1 block w-full"
                                            />
                                            <InputError message={errors.luggage_capacity} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="fuel_type" value="Fuel Type" />
                                            <select
                                                id="fuel_type"
                                                value={data.fuel_type}
                                                onChange={e => setData('fuel_type', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                            >
                                                <option value="Petrol">Petrol</option>
                                                <option value="Diesel">Diesel</option>
                                                <option value="Electric">Electric</option>
                                                <option value="Hybrid">Hybrid</option>
                                            </select>
                                            <InputError message={errors.fuel_type} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="co2_emission" value="CO2 Emission (g/km)" />
                                            <TextInput
                                                id="co2_emission"
                                                type="number"
                                                value={data.co2_emission}
                                                onChange={e => setData('co2_emission', e.target.value)}
                                                className="mt-1 block w-full"
                                            />
                                            <InputError message={errors.co2_emission} className="mt-2" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="unlimited_mileage"
                                                checked={data.unlimited_mileage}
                                                onChange={e => setData('unlimited_mileage', e.target.checked)}
                                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                            />
                                            <label htmlFor="unlimited_mileage" className="ml-2">
                                                Unlimited Mileage
                                            </label>
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="basic_protection"
                                                checked={data.basic_protection}
                                                onChange={e => setData('basic_protection', e.target.checked)}
                                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                            />
                                            <label htmlFor="basic_protection" className="ml-2">
                                                Basic Protection
                                            </label>
                                        </div>
                                    </div>

                                    <div className="flex justify-end mt-6">
                                        <PrimaryButton disabled={processing}>
                                            {editingCar ? 'Update Car' : 'Add Car'}
                                        </PrimaryButton>
                                    </div>
                                </form>
                            )}

                            {/* Cars List */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {cars.map((car) => (
                                    <div key={car.id} className="bg-white rounded-lg shadow overflow-hidden">
                                        <img 
                                            src={`/storage/${car.image_url}`} 
                                            alt={`${car.brand} ${car.model}`}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                                            <h4 className="font-semibold text-lg">{car.brand} {car.model}</h4>
                                            <p className="text-gray-600">Transmission: {car.transmission}</p>
                                            <p className="text-gray-600">Seats: {car.seats}</p>
                                            <p className="text-green-600 font-semibold mt-2">₹{car.price_per_day}/day</p>
                                            
                                            <div className="mt-4 flex justify-end space-x-2">
                                                <button
                                                    onClick={() => handleEdit(car)}
                                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(car.id)}
                                                    className="px-4 py-2 bg-red text-white rounded hover:bg-blue-600"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 