import React, { useState } from "react";
import { Image } from "@imagekit/react";
import { Link } from "react-router";
import { SignedIn, SignedOut, useAuth, UserButton } from "@clerk/clerk-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect } from "react";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const { getToken } = useAuth();
  useEffect(() => {
    getToken().then((token) => {
      console.log(token);
      
    })
  }, [])
  
  // --- Logo animation on mount
  useGSAP(() => {
    gsap.from(".NavLogo", {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  // --- Desktop links animation
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".Nav_I", {
      opacity: 0,
      y: -20,
      duration: 0.8,
      stagger: 0.15,
    }).from(
      ".Nav_Btn",
      {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
      },
      "-=0.4"
    );
  }, []);

  // --- Mobile menu animation
  useGSAP(
    () => {
      const menu = document.querySelector(".MobileMenu");
      if (!menu) return;

      if (open) {
        // Start fully visible white background
        gsap.set(menu, {
          display: "flex",
          backgroundColor: "#ffffff",
          opacity: 1,
        });

        // Slide in
        gsap.fromTo(
          menu,
          { xPercent: 100, opacity: 0 },
          {
            xPercent: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          }
        );

        // Animate menu items
        gsap.fromTo(
          ".Nav_II",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            delay: 0.1,
            ease: "power3.out",
          }
        );
      } else {
        // Slide out
        gsap.to(menu, {
          xPercent: 100,
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => gsap.set(menu, { display: "none" }),
        });
      }
    },
    { dependencies: [open] }
  );

  const handleLogoHover = (e) =>
    gsap.to(e.currentTarget, { scale: 1.15, duration: 0.3, ease: "power3.out" });
  const handleLogoLeave = (e) =>
    gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power3.out" });

  return (
    <div className="relative z-30 flex items-center w-full font-sans h-16 md:h-20 justify-between">
      {/* Logo */}
      <Link
        to="/"
        id="logo"
        className="flex gap-4 text-2xl font-bold items-center NavLogo"
        onMouseEnter={handleLogoHover}
        onMouseLeave={handleLogoLeave}
      >
        <Image
          urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
          src="/Logo.png"
          className="w-12 h-12 rounded-xl shadow-md"
          alt="Logo"
        />
        <span>Neo-Paila </span>
      </Link>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button
          className="cursor-pointer text-4xl z-40 relative"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "✕" : "≡"}
        </button>

        {/* Mobile Menu */}
        <div
          className="MobileMenu fixed top-0 right-0 w-full h-screen flex flex-col gap-8 items-center justify-center font-medium z-30"
          style={{
            backgroundColor: "#ffffff", // solid white by default
            display: "none", // hidden initially
          }}
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
              <button className="py-[6px] flex gap-2 items-center justify-between px-4 cursor-pointer rounded-4xl text-white bg-[#540000]">
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
