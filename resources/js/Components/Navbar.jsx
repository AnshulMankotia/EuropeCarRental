"use client";
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Dropdown from '@/Components/Dropdown';
import logoUrl from '../../../public/images/logo.svg';

export default function Navbar() {
    const { auth } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('preferredLanguage') || 'EN';
    });
    const { url } = usePage();
    const isWelcomePage = url === '/';
    const user = auth.user || auth.vendor;

    const isVendor = auth.vendor !== null;

    // Add this effect to handle authentication persistence
    useEffect(() => {
        if (auth.user && !localStorage.getItem('authUser')) {
            localStorage.setItem('authUser', JSON.stringify(auth.user));
        } else if (!auth.user && localStorage.getItem('authUser')) {
            // Only clear auth when explicitly logging out
            if (window.location.pathname === '/logout') {
                localStorage.removeItem('authUser');
            }
        }
    }, [auth.user]);

    // Store language preference
    useEffect(() => {
        localStorage.setItem('preferredLanguage', language);
    }, [language]);

    return (
        <nav className={`${isWelcomePage ? 'bg-transparent' : 'bg-black'} shadow-lg py-4`}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold">
                            <img src={logoUrl} alt="Logo" className="w-32" />
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-6 w-[75%] justify-between">
                        <div className='flex items-center space-x-12 justify-between'>
                        <Link href="/" className={`${isWelcomePage ? 'text-black' : 'text-white'} hover:text-gray-500`}>
                            Home
                        </Link>
                        <Link href="/about-us" className={`${isWelcomePage ? 'text-black' : 'text-white'} hover:text-gray-500`}>
                            About Us
                        </Link>
                        <Link 
                            href={route('cars.index')} 
                            className={`${isWelcomePage ? 'text-black' : 'text-white'} hover:text-gray-500`}
                        >
                            Cars
                        </Link>
                        <Link href="/features" className={`${isWelcomePage ? 'text-black' : 'text-white'} hover:text-gray-500`}>
                            Features
                        </Link>
                        <Link href="/help" className={`${isWelcomePage ? 'text-black' : 'text-white'} hover:text-gray-500`}>
                            Help
                        </Link>
                        </div>
                        {/* Search Bar */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search something here"
                                className="w-64 px-4 py-1 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
                            />
                            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>

                        <div className='flex items-center space-x-4 justify-between'>
                        {/* Language Selector */}
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center space-x-1 text-gray-600">
                                    <span>{language}</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link as="button" onClick={() => setLanguage('EN')}>
                                    English
                                </Dropdown.Link>
                                <Dropdown.Link as="button" onClick={() => setLanguage('EU')}>
                                    European
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>

                        {!user ? (
                            <Link href="/register" className="bg-white text-black py-2 px-6 rounded-full border-2 border-blue-500 hover:bg-blue-50 transition duration-300">
                                Sign Up
                            </Link>
                        ) : (
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button className="inline-flex items-center px-3 py-2 text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none transition ease-in-out duration-150">
                                            {user.name}
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    {isVendor ? (
                                        <>
                                            <Dropdown.Link href={route('vendor.dashboard')}>
                                                Dashboard
                                            </Dropdown.Link>
                                            <Dropdown.Link 
                                                href="/vendor/logout" 
                                                method="post" 
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </>
                                    ) : (
                                        <>
                                            <Dropdown.Link href={route('profile.edit')}>
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link 
                                                href={route('logout')} 
                                                method="post" 
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </>
                                    )}
                                </Dropdown.Content>
                            </Dropdown>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
