import { Link, Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Welcome({ auth }) {
    const WelcomeContent = () => (
        <main>
            <section className="hero-section h-[80vh] bg-hero-background-image bg-cover bg-center -mt-24">
                <div className="container max-w-screen-xl mx-auto h-full flex items-center">
                    <div className="wrapper w-[530px]">
                        <h1 className="text-5xl text-black leading-[3.5rem]">
                            Hit the Road with the Perfect Ride
                        </h1>
                        <p className="text-white text-[1.25rem]">
                            Get a car wherever and whenever you need it with your iOS or
                            Android device.
                        </p>
                    </div>
                </div>
            </section>
            
            <section className="partner-logo-section max-w-screen-xl mx-auto h-full flex items-center">
                <div className="container py-12">
                    <div className="wrapper">
                        <div className="column flex flex-wrap justify-between space-y-4">
                            <img src="/images/Bentley.svg" alt="Bentley" className="" />
                            <img src="/images/Kia.svg" alt="Kia" className="" />
                            <img src="/images/Ford.svg" alt="Ford" className="" />
                            <img src="/images/Hyundai.svg" alt="Hyundai" className="" />
                            <img src="/images/Arash.svg" alt="Arash" className="" />
                            <img src="/images/Bugatti.svg" alt="Bugatti" className="" />
                            <img src="/images/Audi.svg" alt="Audi" className="" />
                        </div>
                    </div>
                </div>
            </section>
            
            <section>
                <div className="container py-12 max-w-screen-xl mx-auto h-full">
                    <h2 className="text-4xl text-red mb-2">
                        Choose From Our Top Car Models
                    </h2>
                    <p className="text-metalgun">
                        From luxury sedans to budget-friendly compacts, we’ve got something
                        for every journey
                    </p>
                    <div className="wrpper flex py-12 four-row-cards">
                        
                    </div>
                    
                    <div className="flex justify-center">
                        <a
                            href=""
                            className="bg-red flex px-[1rem] py-[0.5rem] rounded-[10px]"
                        >
                            <span>Load More Cars</span>
                            <img src="/images/white-right-arrow.svg" alt="" />
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );

    if (auth?.user) {
        return (
            <AuthenticatedLayout user={auth.user}>
                <Head title="Welcome" />
                <WelcomeContent />
            </AuthenticatedLayout>
        );
    }

    return (
        <GuestLayout>
            <Head title="Welcome" />
            <WelcomeContent />
        </GuestLayout>
    );
}

