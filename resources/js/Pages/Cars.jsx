import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { AiFillStar } from 'react-icons/ai';
import { useState } from 'react';

export default function Cars({ cars }) {
    const [collapsedCars, setCollapsedCars] = useState([]);

    const toggleDetails = (carId) => {
        setCollapsedCars(prev => 
            prev.includes(carId) 
                ? prev.filter(id => id !== carId) 
                : [...prev, carId]
        );
    };

    return (
        <GuestLayout>
            <Head title="Available Cars" />

            <div className="py-12 bg-white">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-8">Our Available Cars</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
                        {cars && cars.map((car) => (
                            <div key={car.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex justify-between">
                                {/* Car Image */}
                                <div className="relative bg-lightGray pt-6 pb-6 pr-4 pl-4 w-[45%]">
                                    <img 
                                        src={`/storage/${car.image_url}`}
                                        alt={`${car.brand} ${car.model}`}
                                        className="w-full object-cover"
                                    />
                                    
                                </div>

                                {/* Basic Car Details */}
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
<g clip-path="url(#clip0_212_545)">
<path d="M20 5.37454V11.3745H4M12 5.37454V17.3745M4 5.37454V17.3745" stroke="#202020" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22 3.37454C22 3.90497 21.7893 4.41368 21.4142 4.78876C21.0391 5.16383 20.5304 5.37454 20 5.37454C19.4696 5.37454 18.9609 5.16383 18.5858 4.78876C18.2107 4.41368 18 3.90497 18 3.37454C18 2.84411 18.2107 2.3354 18.5858 1.96033C18.9609 1.58526 19.4696 1.37454 20 1.37454C20.5304 1.37454 21.0391 1.58526 21.4142 1.96033C21.7893 2.3354 22 2.84411 22 3.37454ZM14 3.37454C14 3.90497 13.7893 4.41368 13.4142 4.78876C13.0391 5.16383 12.5304 5.37454 12 5.37454C11.4696 5.37454 10.9609 5.16383 10.5858 4.78876C10.2107 4.41368 10 3.90497 10 3.37454C10 2.84411 10.2107 2.3354 10.5858 1.96033C10.9609 1.58526 11.4696 1.37454 12 1.37454C12.5304 1.37454 13.0391 1.58526 13.4142 1.96033C13.7893 2.3354 14 2.84411 14 3.37454ZM6 3.37454C6 3.90497 5.78929 4.41368 5.41421 4.78876C5.03914 5.16383 4.53043 5.37454 4 5.37454C3.46957 5.37454 2.96086 5.16383 2.58579 4.78876C2.21071 4.41368 2 3.90497 2 3.37454C2 2.84411 2.21071 2.3354 2.58579 1.96033C2.96086 1.58526 3.46957 1.37454 4 1.37454C4.53043 1.37454 5.03914 1.58526 5.41421 1.96033C5.78929 2.3354 6 2.84411 6 3.37454ZM14 19.3745C14 19.905 13.7893 20.4137 13.4142 20.7888C13.0391 21.1638 12.5304 21.3745 12 21.3745C11.4696 21.3745 10.9609 21.1638 10.5858 20.7888C10.2107 20.4137 10 19.905 10 19.3745C10 18.8441 10.2107 18.3354 10.5858 17.9603C10.9609 17.5853 11.4696 17.3745 12 17.3745C12.5304 17.3745 13.0391 17.5853 13.4142 17.9603C13.7893 18.3354 14 18.8441 14 19.3745ZM6 19.3745C6 19.905 5.78929 20.4137 5.41421 20.7888C5.03914 21.1638 4.53043 21.3745 4 21.3745C3.46957 21.3745 2.96086 21.1638 2.58579 20.7888C2.21071 20.4137 2 19.905 2 19.3745C2 18.8441 2.21071 18.3354 2.58579 17.9603C2.96086 17.5853 3.46957 17.3745 4 17.3745C4.53043 17.3745 5.03914 17.5853 5.41421 17.9603C5.78929 18.3354 6 18.8441 6 19.3745ZM20 21.3745C20.5304 21.3745 21.0391 21.1638 21.4142 20.7888C21.7893 20.4137 22 19.905 22 19.3745C22 18.8441 21.7893 18.3354 21.4142 17.9603C21.0391 17.5853 20.5304 17.3745 20 17.3745C19.4696 17.3745 18.9609 17.5853 18.5858 17.9603C18.2107 18.3354 18 18.8441 18 19.3745C18 19.905 18.2107 20.4137 18.5858 20.7888C18.9609 21.1638 19.4696 21.3745 20 21.3745Z" stroke="#202020" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_212_545">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
                                         </svg>
                                            <span>{car.transmission}</span>
                                        </div>
                                        <div className="flex items-center space-x-1 bg-lightGray px-2 py-1 rounded">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.7888 6.74796H12.9808V4.55596H10.7888V6.74796ZM11.8848 12.133C10.8108 12.133 9.7721 11.9473 8.76877 11.576C7.76677 11.2046 6.80543 10.7326 5.88477 10.16V8.36296C5.88477 7.91896 6.04277 7.53896 6.35877 7.22296C6.67477 6.90696 7.05543 6.74863 7.50077 6.74796H9.78877V4.32496C9.78877 4.1183 9.86543 3.9383 10.0188 3.78496C10.1721 3.63163 10.3518 3.55496 10.5578 3.55496H13.2118C13.4184 3.55496 13.5984 3.63163 13.7518 3.78496C13.9051 3.9383 13.9818 4.1183 13.9818 4.32496V6.74796H16.2698C16.7138 6.74796 17.0938 6.9063 17.4098 7.22296C17.7258 7.53963 17.8841 7.91963 17.8848 8.36296V10.16C16.9648 10.7333 16.0034 11.2053 15.0008 11.576C13.9981 11.9473 12.9594 12.133 11.8848 12.133ZM7.50077 20.248V19.748C7.0561 19.748 6.67577 19.5896 6.35977 19.273C6.04377 18.9563 5.88543 18.5766 5.88477 18.134V11.334C6.74143 11.8233 7.6271 12.2266 8.54177 12.544C9.45643 12.86 10.4041 13.0526 11.3848 13.122V13.633C11.3848 13.775 11.4328 13.894 11.5288 13.99C11.6248 14.086 11.7438 14.1336 11.8858 14.133C12.0278 14.1323 12.1464 14.0846 12.2418 13.99C12.3371 13.8953 12.3848 13.7763 12.3848 13.633V13.122C13.3654 13.0526 14.3131 12.8596 15.2278 12.543C16.1431 12.2263 17.0288 11.823 17.8848 11.333V18.133C17.8848 18.5776 17.7264 18.958 17.4098 19.274C17.0931 19.59 16.7131 19.7483 16.2698 19.749V20.249C16.2698 20.391 16.2211 20.5096 16.1238 20.605C16.0264 20.7003 15.9064 20.7483 15.7638 20.749C15.6291 20.749 15.5238 20.6956 15.4478 20.589C15.3711 20.4816 15.3114 20.3683 15.2688 20.249V19.748H8.50077V20.248C8.50077 20.39 8.4521 20.5086 8.35477 20.604C8.2581 20.7 8.1381 20.748 7.99477 20.748C7.8601 20.748 7.75443 20.6946 7.67777 20.588C7.60177 20.4806 7.54277 20.3673 7.50077 20.248Z" fill="#202020"/>
                                        </svg>

                                            <span>{car.luggage_capacity}</span>
                                        </div>
                                        <div className="flex items-center space-x-1 bg-lightGray px-2 py-1 rounded">
                                            <AiFillStar className="text-yellow-500" />
                                            <span>{car.rating}/5</span>
                                        </div>
                                    </div>

                                    {/* Expandable Details */}
                                    <button 
                                        onClick={() => toggleDetails(car.id)}
                                        className="text-green hover:text-black text-sm font-medium mb-4"
                                    >
                                        {collapsedCars.includes(car.id) ? 'Show More' : 'Show Less'}
                                    </button>

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
<g clip-path="url(#clip0_177_6412)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 7.95874C0.5 5.96962 1.29018 4.06196 2.6967 2.65544C4.10322 1.24892 6.01088 0.45874 8 0.45874C9.98912 0.45874 11.8968 1.24892 13.3033 2.65544C14.7098 4.06196 15.5 5.96962 15.5 7.95874C15.5 9.94786 14.7098 11.8555 13.3033 13.262C11.8968 14.6686 9.98912 15.4587 8 15.4587C6.01088 15.4587 4.10322 14.6686 2.6967 13.262C1.29018 11.8555 0.5 9.94786 0.5 7.95874ZM7.572 11.1687L11.89 5.77074L11.11 5.14674L7.428 9.74774L4.82 7.57474L4.18 8.34274L7.572 11.1687Z" fill="#009900"/>
</g>
<defs>
<clipPath id="clip0_177_6412">
<rect width="15" height="15" fill="white" transform="translate(0.596191 0.668823)"/>
</clipPath>
</defs>
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
<g clip-path="url(#clip0_177_6412)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 7.95874C0.5 5.96962 1.29018 4.06196 2.6967 2.65544C4.10322 1.24892 6.01088 0.45874 8 0.45874C9.98912 0.45874 11.8968 1.24892 13.3033 2.65544C14.7098 4.06196 15.5 5.96962 15.5 7.95874C15.5 9.94786 14.7098 11.8555 13.3033 13.262C11.8968 14.6686 9.98912 15.4587 8 15.4587C6.01088 15.4587 4.10322 14.6686 2.6967 13.262C1.29018 11.8555 0.5 9.94786 0.5 7.95874ZM7.572 11.1687L11.89 5.77074L11.11 5.14674L7.428 9.74774L4.82 7.57474L4.18 8.34274L7.572 11.1687Z" fill="#009900"/>
</g>
<defs>
<clipPath id="clip0_177_6412">
<rect width="15" height="15" fill="white" transform="translate(0.596191 0.668823)"/>
</clipPath>
</defs>
                                                      </svg>
                                                    Unlimited Mileage
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Pricing and CTA */}
                                    <div className="border-t pt-4 mt-4 flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-500">Start from</p>
                                            <p className="text-2xl font-semibold text-gray-900">
                                                ₹{car.price_per_day} <span className="text-sm">/ day</span>
                                            </p>
                                        </div>
                                        <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
                                            Rent Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
