import { Link, NavLink } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Image } from "@imagekit/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Features", to: "/features" },
  { label: "Blog", to: "/blogs" },
  { label: "Pricing", to: "/pricing" },
];

const NavBar = ({ lightboxOpen }) => {
  const logoRef = useRef(null);
  const [open, setOpen] = useState(false);

  /* -------------------------
     NAV ENTRANCE
  ------------------------- */
  useGSAP(() => {
    if (!lightboxOpen) {
      gsap.from(".nav-wrapper", {
        y: -24,
        opacity: 0,
        duration: 0.7,
        ease: "power4.out",
      });
    }
  }, [lightboxOpen]);

  /* -------------------------
     LOGO HOVER (DESKTOP ONLY)
  ------------------------- */
  const logoEnter = () => {
    if (window.innerWidth < 768) return;
    gsap.to(logoRef.current, {
      scale: 1.08,
      rotate: -3,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const logoLeave = () => {
    if (window.innerWidth < 768) return;
    gsap.to(logoRef.current, {
      scale: 1,
      rotate: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  };

  /* -------------------------
     LIQUID NAV ITEM HOVER
     (UNCHANGED)
  ------------------------- */
  const handleEnter = (e) => {
    if (lightboxOpen || window.innerWidth < 768) return;
    const inner = e.currentTarget.querySelector(".nav-inner");
    gsap.set(inner, { x: 0, y: 0, scaleX: 1, scaleY: 1 });
  };

  const handleMove = (e) => {
    if (lightboxOpen || window.innerWidth < 768) return;
    const inner = e.currentTarget.querySelector(".nav-inner");
    const bounds = e.currentTarget.getBoundingClientRect();

    const dx = e.clientX - (bounds.left + bounds.width / 2);
    const dy = e.clientY - (bounds.top + bounds.height / 2);

    const distanceX = Math.abs(dx) / (bounds.width / 2);
    const distanceY = Math.abs(dy) / (bounds.height / 2);

    const scaleX = 1 + Math.min(distanceX * 0.25, 0.35);
    const scaleY = 1 + Math.min(distanceY * 0.25, 0.35);

    gsap.to(inner, {
      x: dx * 0.25,
      y: dy * 0.25,
      scaleX,
      scaleY,
      duration: 0.25,
      ease: "power3.out",
      overwrite: true,
    });
  };

  const handleLeave = (e) => {
    if (lightboxOpen || window.innerWidth < 768) return;
    const inner = e.currentTarget.querySelector(".nav-inner");

    gsap.to(inner, {
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      duration: 0.35,
      ease: "elastic.out(1, 0.4)",
      overwrite: true,
    });
  };

  return (
    <div
      className={`fixed top-3 left-1/2 z-50 w-full -translate-x-1/2 px-4
      ${lightboxOpen ? "pointer-events-none" : ""}`}
    >
      <div className="nav-wrapper mx-auto max-w-7xl">
        <nav className="pointer-events-auto flex items-center justify-between rounded-full border border-black/5 bg-white/80 px-6 py-3 shadow-md backdrop-blur">
          {/* LOGO */}
          <Link
            to="/"
            onMouseEnter={logoEnter}
            onMouseLeave={logoLeave}
            className="flex items-center gap-3 font-semibold select-none"
          >
            <div ref={logoRef} className="flex items-center gap-3">
              <Image
                urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
                src="Logo.png"
                alt="Neo-Paila"
                className="h-9 w-9 rounded-full"
              />
              <span className="text-lg tracking-tight">Neo-Paila</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <div
                key={link.label}
                onMouseEnter={handleEnter}
                onMouseMove={handleMove}
                onMouseLeave={handleLeave}
                className="relative h-10 w-[96px]"
              >
                <div className="nav-inner absolute inset-0 flex items-center justify-center rounded-full">
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `text-sm font-medium transition-colors ${
                        isActive
                          ? "text-gray-900"
                          : "text-gray-700 hover:text-gray-900"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <SignedOut>
              <Link
                to="/login"
                className="hidden md:block rounded-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
              >
                Login
              </Link>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setOpen((p) => !p)}
              className="md:hidden rounded-full p-2 hover:bg-gray-100 transition"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* MOBILE MENU */}
        {open && (
          <div className="mt-3 rounded-3xl bg-white shadow-xl p-6 md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-gray-800"
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
