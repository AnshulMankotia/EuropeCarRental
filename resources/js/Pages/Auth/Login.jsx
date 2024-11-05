import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
        type: 'user',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className='h-[89.5vh] bg-login-background-image bg-cover bg-center flex items-center'>
                <div className="max-w-2xl w-full mx-auto p-8 bg-white/40 backdrop-blur-sm rounded-lg shadow-lg">
                    <h2 className="text-2xl font-medium text-red-500 mb-6">
                        Login to Your Account
                    </h2>

                    {status && (
                        <div className="mb-4 font-medium text-sm text-green-600">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div className="flex space-x-4 mb-4">
                            <button
                                type="button"
                                onClick={() => setData('type', 'user')}
                                className={`px-4 py-2 rounded-md ${
                                    data.type === 'user'
                                        ? 'bg-black text-white'
                                        : 'bg-gray-200 text-gray-700'
                                }`}
                            >
                                User Login
                            </button>
                            <button
                                type="button"
                                onClick={() => setData('type', 'vendor')}
                                className={`px-4 py-2 rounded-md ${
                                    data.type === 'vendor'
                                        ? 'bg-black text-white'
                                        : 'bg-gray-200 text-gray-700'
                                }`}
                            >
                                Vendor Login
                            </button>
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                                {data.type === 'user' ? (
                                    <Link
                                        href={route('register')}
                                        className="text-sm text-gray-600 hover:text-gray-900"
                                    >
                                        Need a user account?
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('vendor.register')}
                                        className="text-sm text-gray-600 hover:text-gray-900"
                                    >
                                        Register as vendor
                                    </Link>
                                )}
                            </div>

                            <PrimaryButton className="ml-4" disabled={processing}>
                                Log in
                            </PrimaryButton>
                        </div>

                        {canResetPassword && (
                            <div className="flex items-center justify-end mt-4">
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-gray-600 hover:text-gray-900"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
