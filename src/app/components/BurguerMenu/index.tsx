"use client"

import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative z-50">
            <button onClick={toggleMenu} className="flex flex-col justify-center items-center w-10 h-10 bg-neutral-900 rounded">
                <div className={`w-6 h-1 bg-yellow-500 rounded transform transition duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                <div className={`w-6 h-1 bg-yellow-500 rounded my-1 transform transition duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-6 h-1 bg-yellow-500 rounded transform transition duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </button>

            <div className={`fixed top-0 left-0 w-full h-screen bg-black transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition duration-300 ease-in-out`}>
                <nav className="flex flex-col items-center justify-center h-full">
                    <button className="p-4">
                        <CloseIcon className="text-yellow-500" onClick={toggleMenu} />
                    </button>
                    <a href="#" className="text-yellow-500 text-2xl font-semibold p-4">Home</a>
                    <a href="#" className="text-yellow-500 text-2xl font-semibold p-4">About</a>
                    <a href="#" className="text-yellow-500 text-2xl font-semibold p-4">Services</a>
                    <a href="#" className="text-yellow-500 text-2xl font-semibold p-4">Contact</a>
                </nav>
            </div>
        </div>
    );
};

export default BurgerMenu;