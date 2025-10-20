import React, { useState } from 'react';

const NavBar = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className=" relative z-20 flex items-center w-full font-sans h-16 md:h-20 justify-between ">
            {/* Logo */}
            <div className="flex gap-4 text-2xl font-bold items-center">
                <img src="/Logo.png" className="w-12 h-12 rounded-md" alt="Logo" />
                <span>Neo-Paila</span>
            </div>

            {/* Mobile Menu Button */}#
            <div className='md:hidden'>

                <button
                    className="cursor-pointer text-4xl"
                    onClick={() => setOpen(!open)}
                >
                    {open ? '✕' : '≡'}
                </button>
                <div className={`w-full z-20 h-screen flex flex-col items-center justify-center absolute top-16 transition-all ease-in-out ${open ? '-right-0' : '-right-[150%]'}`}>
                    meny
                </div>
            </div>
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 xl:gap-12 items-center  font-medium">
                <a href="/">Home</a>
                <a href="/">Trending</a>
                <a href="/">Most Popular</a>
                <a href="/">About</a>
                <a href="/">
                    <button className='py-2 px-4 rounded-lg text-white bg-[#912121]'>
                        🙌 &nbsp;&nbsp;Login
                    </button></a>

            </div>


        </div>
    );
};

export default NavBar;
