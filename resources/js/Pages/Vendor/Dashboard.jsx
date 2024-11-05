import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Dashboard({ auth }) {
    const { data, setData, post, processing, errors, reset, progress } = useForm({
        brand: '',
        model: '',
        transmission: '',
        seats: '',
        airbags: '',
        rating: '',
        price_per_day: '',
        image: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('vendor.cars.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                document.getElementById('image').value = '';
            },
            onError: (errors) => {
                console.error(errors);
            },
            preserveScroll: true
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add New Car</h2>}
        >
            <Head title="Add New Car" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                                <input type="hidden" name="_token" value={window.csrf_token} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                                    <div>
                                        <InputLabel htmlFor="transmission" value="Transmission" />
                                        <select
                                            id="transmission"
                                            value={data.transmission}
                                            onChange={e => setData('transmission', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            required
                                        >
                                            <option value="">Select Transmission</option>
                                            <option value="automatic">Automatic</option>
                                            <option value="manual">Manual</option>
                                        </select>
                                        <InputError message={errors.transmission} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="seats" value="Number of Seats" />
                                        <TextInput
                                            id="seats"
                                            type="number"
                                            value={data.seats}
                                            onChange={e => setData('seats', e.target.value)}
                                            className="mt-1 block w-full"
                                            required
                                            min="1"
                                        />
                                        <InputError message={errors.seats} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="airbags" value="Number of Airbags" />
                                        <TextInput
                                            id="airbags"
                                            type="number"
                                            value={data.airbags}
                                            onChange={e => setData('airbags', e.target.value)}
                                            className="mt-1 block w-full"
                                            required
                                            min="0"
                                        />
                                        <InputError message={errors.airbags} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="rating" value="Rating" />
                                        <TextInput
                                            id="rating"
                                            type="number"
                                            step="0.1"
                                            value={data.rating}
                                            onChange={e => setData('rating', e.target.value)}
                                            className="mt-1 block w-full"
                                            required
                                            min="0"
                                            max="5"
                                        />
                                        <InputError message={errors.rating} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="price_per_day" value="Price Per Day" />
                                        <TextInput
                                            id="price_per_day"
                                            type="number"
                                            step="0.01"
                                            value={data.price_per_day}
                                            onChange={e => setData('price_per_day', e.target.value)}
                                            className="mt-1 block w-full"
                                            required
                                            min="0"
                                        />
                                        <InputError message={errors.price_per_day} className="mt-2" />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="image" value="Car Image" />
                                    <input
                                        id="image"
                                        type="file"
                                        onChange={handleImageChange}
                                        className="mt-1 block w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                        accept="image/*"
                                        required
                                    />
                                    <InputError message={errors.image} className="mt-2" />
                                    
                                    {progress && (
                                        <progress value={progress.percentage} max="100" className="mt-2 w-full">
                                            {progress.percentage}%
                                        </progress>
                                    )}
                                </div>

                                <div className="flex items-center justify-end mt-6">
                                    <PrimaryButton disabled={processing}>
                                        Add Car
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 