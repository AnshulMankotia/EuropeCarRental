import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { AiFillStar } from 'react-icons/ai';

export default function Dashboard({ auth, cars, stats }) {
    const [showForm, setShowForm] = useState(false);
    const [editingCar, setEditingCar] = useState(null);
    const [collapsedCars, setCollapsedCars] = useState([]);
    
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

    const toggleDetails = (carId) => {
        setCollapsedCars(prev => 
            prev.includes(carId) 
                ? prev.filter(id => id !== carId) 
                : [...prev, carId]
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.vendor}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Vendor Dashboard</h2>}
        >
            <Head title="Vendor Dashboard" />

            <div className="py-12 bg-white">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-[#e5e5e5] overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900">Total Cars</h3>
                            <p className="text-3xl font-bold text-indigo-600">{stats.totalCars}</p>
                        </div>
                        <div className="bg-[#e5e5e5] overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900">Active Rentals</h3>
                            <p className="text-3xl font-bold text-green-600">{stats.activeRentals}</p>
                        </div>
                        <div className="bg-[#e5e5e5] overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900">Total Earnings</h3>
                            <p className="text-3xl font-bold text-blue-600">₹{stats.totalEarnings}</p>
                        </div>
                    </div>

                    {/* Cars Section */}
                    <div className="bg-white">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-3xl font-bold">My Cars</h3>
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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
                                {cars.map((car) => (
                                    <div key={car.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex justify-between">
                                        {/* Car Image */}
                                        <div className="relative bg-lightGray pt-6 pb-6 pr-4 pl-4 w-[45%]">
                                            <img 
                                                src={`/storage/${car.image_url}`}
                                                alt={`${car.brand} ${car.model}`}
                                                className="w-full object-cover"
                                            />
                                        </div>

                                        {/* Car Details */}
                                        <div className="p-4 w-[50%]">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {car.brand} {car.model}
                                            </h3>

                                            {/* Quick Info */}
                                            <div className="flex items-center justify-between text-gray-500 text-sm my-4">
                                                <div className="flex items-center space-x-1 bg-lightGray px-2 py-1 rounded">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.35 5.13965C4.45 4.49965 4.23 3.25965 4.86 2.34965C5.5 1.44965 6.74 1.22965 7.65 1.85965C8.55 2.49965 8.77 3.73965 8.14 4.64965C7.5 5.54965 6.26 5.76965 5.35 5.13965ZM16 18.4997H8.93C7.45 18.4997 6.19 17.4197 5.97 15.9597L4 6.49965H2L4 16.2597C4.17955 17.4407 4.77684 18.5181 5.68334 19.2962C6.58984 20.0742 7.74539 20.5013 8.94 20.4997H16M16.23 14.4997H11.35L10.32 10.3997C11.9 11.2897 13.6 11.9397 15.47 11.6197V9.49965C13.84 9.79965 12.03 9.21965 10.78 8.23965L9.14 6.96965C8.91 6.78965 8.65 6.66965 8.38 6.58965C8.05887 6.49456 7.72026 6.47404 7.39 6.52965H7.37C6.78138 6.63469 6.25797 6.96771 5.91346 7.4564C5.56894 7.94509 5.43115 8.54996 5.53 9.13965L6.88 15.0597C7.00866 15.7472 7.3743 16.3679 7.9133 16.8137C8.45229 17.2595 9.13053 17.5022 9.83 17.4997H16.68L20.5 20.4997L22 18.9997" fill="#202020"/>
                                                    </svg>
                                                    <span>{car.seats} Seats</span>
                                                </div>
                                                <div className="flex items-center space-x-1 bg-lightGray px-2 py-1 rounded">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        {/* ... transmission icon ... */}
                                                    </svg>
                                                    <span>{car.transmission}</span>
                                                </div>
                                                <div className="flex items-center space-x-1 bg-lightGray px-2 py-1 rounded">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10.7888 6.74796H12.9808V4.55596H10.7888V6.74796Z" fill="#202020"/>
                                                    </svg>
                                                    <span>{car.luggage_capacity}</span>
                                                </div>
                                                <div className="flex items-center space-x-1 bg-lightGray px-2 py-1 rounded">
                                                    <AiFillStar className="text-yellow-500" />
                                                    <span>{car.rating}/5</span>
                                                </div>
                                            </div>

                                            {/* Show More/Less Button */}
                                            <button 
                                                onClick={() => toggleDetails(car.id)}
                                                className="text-green hover:text-black text-sm font-medium mb-4"
                                            >
                                                {collapsedCars.includes(car.id) ? 'Show More' : 'Show Less'}
                                            </button>

                                            {/* Expandable Details */}
                                            {!collapsedCars.includes(car.id) && (
                                                <div className="space-y-4 mt-4 border-t pt-4">
                                                    <h4 className="font-semibold text-gray-900">Full Vehicle Details</h4>
                                                    
                                                    <div className="grid grid-cols-2 gap-4 text-[1rem]">
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
                                                        <h4 className="font-semibold text-gray-900 text-[1.2rem]">Protection</h4>
                                                        {car.basic_protection && (
                                                            <div className="text-[1rem]">
                                                                <p className="text-green flex items-center gap-2">
                                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        {/* ... checkmark icon ... */}
                                                                    </svg>
                                                                    Basic Protection Included
                                                                </p>
                                                                {car.excess_amount && (
                                                                    <p className="text-gray mt-1">
                                                                        Excess: ₹{car.excess_amount}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {car.unlimited_mileage && (
                                                        <p className="text-green text-[1rem] flex items-center gap-2">
                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                {/* ... checkmark icon ... */}
                                                            </svg>
                                                            Unlimited Mileage
                                                        </p>
                                                    )}
                                                </div>
                                            )}

                                            {/* Pricing and Actions */}
                                            <div className="border-t pt-4 mt-4 flex items-center justify-between">
                                                <div>
                                                    <p className="text-gray-500">Start from</p>
                                                    <p className="text-2xl font-semibold text-gray-900">
                                                        ₹{car.price_per_day} <span className="text-sm">/ day</span>
                                                    </p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(car)}
                                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(car.id)}
                                                        className="bg-red text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
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