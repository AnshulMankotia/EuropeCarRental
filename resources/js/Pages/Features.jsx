import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Features() {
    return (
        <GuestLayout>
            <Head title="Features" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold">Our Features</h1>
                    {/* Add your features page content */}
                </div>
            </div>
        </GuestLayout>
    );
} 