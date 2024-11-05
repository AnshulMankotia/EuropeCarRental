import { useEffect } from 'react';
import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    useEffect(() => {
        if (auth?.user) {
            router.get('/');
        }
    }, [auth]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            {/* Add any dashboard-specific content here if needed */}
        </AuthenticatedLayout>
    );
}
