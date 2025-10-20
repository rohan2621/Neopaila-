import React, { useState } from "react";
import { Image } from "@imagekit/react";
import { Link } from "react-router";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const NavBar = () => {
  const [open, setOpen] = useState(false);
    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        const logo = document.querySelector(".NavLogo");
        if (logo) {
          tl.from(logo, { opacity: 0, scale: 0, duration: 1});
        }
    },[])
  // ✅ Animate desktop links and login button safely
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animate all desktop links
    const links = gsap.utils.toArray(".Nav_I");
    if (links.length > 0) {
      tl.from(links, {
        opacity: 0,
        y: -20,
        duration: 0.8,
        stagger: 0.15,
      }),[];
    }

    // Animate desktop button (if it exists)
    const navBtn = document.querySelector(".Nav_Btn");
    if (navBtn) {
      tl.from(
        navBtn,
        {
          opacity: 0,
          scale: 0.8,
          y: -10,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.4",[] // overlap with previous animation
      ),[]
    }

    // Animate wrapper container (#btn_1)
    const btnWrapper = document.querySelector("#btn_1");
    if (btnWrapper) {
      tl.from(
        btnWrapper,
        {
          opacity: 0,
          x: 30,
          duration: 0.8,
        },
        "-=0.4",[]
      );
    }
  }, []);

  // ✅ Animate mobile menu when open
  useGSAP(
    () => {
      if (open) {
        const items = gsap.utils.toArray(".Nav_II");
        if (items.length > 0) {
          gsap.from(items, {
            opacity: 0,
            y: 25,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          });
        }
      }
    },
    { dependencies: [open], revertOnUpdate: true },[]
    );
     const handleLogoHover = (e) => gsap.to(e.currentTarget, { scale: 1.15, duration: 0.3, ease: "power3.out" });
  const handleLogoLeave = (e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power3.out" });

  return (
    <div className="relative z-20 flex items-center w-full font-sans h-16 md:h-20 justify-between">
      {/* Logo */}
      <Link to="/" id="logo" className="flex gap-4 text-2xl font-bold items-center NavLogo"  onMouseEnter={handleLogoHover}
        onMouseLeave={handleLogoLeave}>
        <Image
          urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
          src="/Logo.png"
          className="w-12 h-12 rounded-xl shadow-md"
          alt="Logo"
        />
        <span>Neo-Paila</span>
      </Link>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <button
          className="cursor-pointer text-4xl"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "✕" : "≡"}
        </button>

        <div
          className={`w-full z-20 h-screen flex gap-8 flex-col items-center justify-center absolute top-16 font-medium bg-white transition-all duration-500 ease-in-out ${
            open ? "right-0 opacity-100" : "-right-[150%] opacity-0"
          }`}
        >
          <Link className="cursor-pointer Nav_II" to="/">
            Home
          </Link>
          <Link className="cursor-pointer Nav_II" to="/">
            Trending
          </Link>
          <Link className="cursor-pointer Nav_II" to="/">
            Most Popular
          </Link>
          <Link className="cursor-pointer Nav_II" to="/">
            About
          </Link>

          <SignedOut>
            <Link className="cursor-pointer Nav_II" to="/login">
              <button className="py-[6px] btn flex gap-2 items-center justify-between px-4 cursor-pointer rounded-4xl text-white bg-[#540000]">
                <p>Login</p>
              </button>
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 xl:gap-12 items-center font-medium">
        <Link className="cursor-pointer Nav_I" to="/">
          Home
        </Link>
        <Link className="cursor-pointer Nav_I" to="/">
          Trending
        </Link>
        <Link className="cursor-pointer Nav_I" to="/">
          Most Popular
        </Link>
        <Link className="cursor-pointer Nav_I" to="/">
          About
        </Link>

        <div id="btn_1">
          <SignedOut>
            <Link className="cursor-pointer Nav_Btn" to="/login">
              <button className="py-[6px] flex gap-2 items-center justify-between px-4 cursor-pointer rounded-4xl text-white bg-[#540000] hover:scale-105 transition-transform duration-300">
                <p>Login</p>
              </button>
            </Link>
          </SignedOut>

          <SignedIn>
            <div className="Nav_Btn">
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
