import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        company: '',
        phone: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('vendor.register.store'));
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-md mx-auto mt-8">
                <form onSubmit={submit}>
                    <div className="mb-4">
                        <label className="block mb-2">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.name && <div className="text-red-500">{errors.name}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.email && <div className="text-red-500">{errors.email}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.password && <div className="text-red-500">{errors.password}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Company</label>
                        <input
                            type="text"
                            value={data.company}
                            onChange={e => setData('company', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.company && <div className="text-red-500">{errors.company}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Phone</label>
                        <input
                            type="tel"
                            value={data.phone}
                            onChange={e => setData('phone', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.phone && <div className="text-red-500">{errors.phone}</div>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-500 text-white py-2 rounded"
                    >
                        Register
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
} 