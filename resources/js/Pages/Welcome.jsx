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


            <section className="offerSection mt-spacing mb-spacing">
        <div className="container max-w-screen-xl mx-auto h-full">
          <div className="wrapper">
            <h2 className="text-4xl text-red mb-2">
              Today car rental and van rental offers.
            </h2>
            <p className="text-metalgun">
              From luxury sedans to budget-friendly compacts, we’ve got
              something for every journey
            </p>
          </div>
          <div className='flex justify-between space-x-10'>
          <div className="flex gap-8 mt-[3rem]">
          <div className="relative w-full mx-auto bg-white shadow-lg rounded-md overflow-hidden">
      {/* Background Image */}
      <div className="relative h-100px w-full">
        <img className='brightness-50' src="/images/offerComponentImage.jpeg" alt="" />
        
        {/* Offer Badge (Top-left corner) */}
        <div className="absolute top-8 left-4">
          <img src="/images/offerIcon.svg" alt="" />
        </div>

        {/* Offer Details (Text over image) */}
        <div className="absolute bottom-10 left-0 p-6 w-full">
          <h2 className="text-white text-lg font-semibold">
            Todays car rental and van rental offers.
          </h2>
          <p className="text-white text-5xl font-bold mt-2">
            40%
          </p>
          <p className="text-white text-sm">with Terms and Condition</p>
        </div>
      </div>

      {/* Validity Information */}
      <div className="absolute top-8 right-4 bg-black bg-opacity-20 px-4 py-2 rounded-2xl">
        <p className="text-white text-xs font-semibold">
          Valid only on 12 Sep - 19 Sep 2024
        </p>
      </div>
    </div>
          </div>
          <div className="flex gap-8 mt-[3rem]">
          <div className="relative w-full mx-auto bg-white shadow-lg rounded-md overflow-hidden">
      {/* Background Image */}
      <div className="relative h-100px w-full">
        <img className='brightness-50' src="/images/offerComponentImage.jpeg" alt="" />
        
        {/* Offer Badge (Top-left corner) */}
        <div className="absolute top-8 left-4">
          <img src="/images/offerIcon.svg" alt="" />
        </div>

        {/* Offer Details (Text over image) */}
        <div className="absolute bottom-10 left-0 p-6 w-full">
          <h2 className="text-white text-lg font-semibold">
            Todays car rental and van rental offers.
          </h2>
          <p className="text-white text-5xl font-bold mt-2">
            40%
          </p>
          <p className="text-white text-sm">with Terms and Condition</p>
        </div>
      </div>

      {/* Validity Information */}
      <div className="absolute top-8 right-4 bg-black bg-opacity-20 px-4 py-2 rounded-2xl">
        <p className="text-white text-xs font-semibold">
          Valid only on 12 Sep - 19 Sep 2024
        </p>
      </div>
    </div>
          </div>
          </div>
        </div>
      </section>


            <section className="relative bg-cover bg-center h-[75vh]" style={{ backgroundImage: "url('/images/servicesBgImage.jpeg')" }}>
      {/* Blurred left section */}
     <div className="absolute inset-0 w-1/2 h-full bg-black bg-opacity-30 backdrop-blur-lg"></div>
      <div className="container max-w-screen-xl mx-auto z-10 flex items-center h-full">
        <div className=" w-1/2 text-white pl-10 z-10">
          <h2 className="text-4xl font-bold mb-6">Our Services</h2>
          <p className="text-gray-300 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>

          <div className="space-y-6">
            <div className="flex items-start space-x-10">
            
                <img src="/images/supportIcon.svg" alt="Support 24/7" className="h-[50px] w-[50px]"/>
    
              <div>
                <h3 className="text-m font-semibold">Support 24/7</h3>
                <p className="text-gray-400 text-sm">
                  Offers various types of insurance and protection packages, such as collision damage waivers, liability coverage, and personal accident insurance.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-10">
              
              <img src="/images/moneybackIcon.svg" alt="Support 24/7" className="h-[50px] w-[50px]"/>
              
              <div>
                <h3 className="text-m font-semibold">Money Back Guarantee</h3>
                <p className="text-gray-400">
                  Offers various types of insurance and protection packages, such as collision damage waivers, liability coverage, and personal accident insurance.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-10">
              
              <img src="/images/dealIcon.svg" alt="Support 24/7" className="h-[50px] w-[50px]"/>
              
              <div>
                <h3 className="text-m font-semibold">Most Affordable Deals</h3>
                <p className="text-gray-400">
                  Offers various types of insurance and protection packages, such as collision damage waivers, liability coverage, and personal accident insurance.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-10">
              
              <img src="/images/vehicleIcon.svg" alt="Support 24/7" className="h-[50px] w-[50px]"/>
             
              <div>
                <h3 className="text-m font-semibold">Registered Vehicles</h3>
                <p className="text-gray-400">
                  Offers various types of insurance and protection packages, such as collision damage waivers, liability coverage, and personal accident insurance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
            
            <section className="bg-lightGray mt-[4rem]">
        <div className="container max-w-screen-xl mx-auto h-full">
          <div className="flex justify-between items-center p-8">
            {/* Stats Section */}
            <div className="flex space-x-8 justify-between items-center w-full">
              {/* First Stat */}
              <div className="text-center">
                <h2 className="text-4xl font-bold text-darkGray pb-4">
                  128+
                </h2>
                <p className="text-gray-500">Active User</p>
              </div>

              {/* Second Stat */}
              <div className="text-center">
                <h2 className="text-4xl font-bold text-darkGray pb-4">
                  282+
                </h2>
                <p className="text-gray-500">Good reviews</p>
              </div>

              {/* Third Stat */}
              <div className="text-center">
                <h2 className="text-4xl font-bold text-darkGray pb-4">
                  459+
                </h2>
                <p className="text-gray-500">Cars available</p>
              </div>
              {/* Image Section */}
              <div className="">
                <img
                  className="h-[200px] w-[30rem] object-cover"
                  src="/images/statsSectionImagejpeg.jpeg"
                  alt=""
                />
              </div>
            </div>
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

