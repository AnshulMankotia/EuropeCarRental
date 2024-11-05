'use client';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Navbar from '@/Components/Navbar';



export default function Guest({children }) {
    return (

        <div className="">
            <Navbar/>
            {children}
        </div>
    );
}
