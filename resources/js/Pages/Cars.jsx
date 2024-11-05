import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Cars() {
    return (
        <GuestLayout>
            <Head title="Cars" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold">Help Center</h1>
                    {/* Add your help page content */}
                </div>
            </div>
        </GuestLayout>
    );
} 