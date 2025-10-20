import React, { useState } from 'react';
import { Image } from '@imagekit/react';
import { Link } from "react-router";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
const NavBar = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className=" relative z-20 flex items-center w-full font-sans h-16 md:h-20 justify-between ">
            {/* Logo */}
            <Link to="/" className="flex gap-4 text-2xl font-bold items-center">
                <Image urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT} src="/Logo.png" className="w-12 h-12 rounded-xl shadow-md" alt="Logo" />
                <span>Neo-Paila</span>
            </Link>

            {/* Mobile Menu Button */}
            <div className='md:hidden'>

                <button
                    className="cursor-pointer text-4xl"
                    onClick={() => setOpen(!open)}
                >
                    {open ? '✕' : '≡'}
                </button>
                <div className={`w-full z-20 h-screen flex gap-8 flex-col items-center  justify-center absolute top-16 font-medium transition-all ease-in-out ${open ? '-right-0' : '-right-[150%]'}`}>
                <Link className='cursor-pointer ' to="/">Home</Link>
                <Link className='cursor-pointer ' to="/">Trending</Link>
                <Link className='cursor-pointer ' to="/">Most Popular</Link>
                <Link className='cursor-pointer ' to="/">About</Link>
                <Link className='cursor-pointer ' to="/">
                    <button className='py-2 px-4 rounded-lg text-white bg-[#912121]'>
                        🙌 &nbsp;&nbsp;Login
                    </button></Link>
                </div>
            </div>
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 xl:gap-12 items-center  font-medium">
                <Link className='cursor-pointer ' to="/">Home</Link>
                <Link className='cursor-pointer ' to="/">Trending</Link>
                <Link className='cursor-pointer ' to="/">Most Popular</Link>
                <Link className='cursor-pointer ' to="/">About</Link>
                <SignedOut>
    
                <Link className='cursor-pointer ' to="/login">
                    <button className='py-[6px] flex gap-2 items-center justify-between  px-4 cursor-pointer rounded-4xl text-white bg-[#540000]'>
                            <p>
                            Login
                            </p>
                            
                    </button></Link>
                </SignedOut>
                <SignedIn>
        <UserButton />
      </SignedIn>        

            </div>


        </div>
    );
};

export default NavBar;
