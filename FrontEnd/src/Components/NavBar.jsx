import { Link, NavLink } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  useAuth,
} from "@clerk/clerk-react";
import { Image } from "@imagekit/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { Menu, X, Shield } from "lucide-react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Gallery", to: "/gallery" },
  { label: "Maps", to: "/maps" },
  { label: "Join Us", to: "/join-us" },
  { label: "About Us", to: "/about" },
];

const NavBar = ({ lightboxOpen }) => {
  const logoRef = useRef(null);
  const [open, setOpen] = useState(false);

  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  const isAdmin = user?.publicMetadata?.role === "admin";

  /* -------------------------
     ADMIN UNREAD COUNT
  ------------------------- */
  const { data: unreadCount = 0 } = useQuery({
    queryKey: ["admin-unread-contacts"],
    enabled: isLoaded && isAdmin,
    refetchInterval: 15000,
    queryFn: async () => {
      const token = await getToken();
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.filter((m) => !m.replied).length;
    },
  });

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
     LOGO HOVER
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

    gsap.to(inner, {
      x: dx * 0.25,
      y: dy * 0.25,
      scaleX: 1.15,
      scaleY: 1.15,
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
      className={`fixed top-3 left-1/2 z-50 w-full -translate-x-1/2 px-4 ${
        lightboxOpen ? "pointer-events-none" : ""
      }`}
    >
      <div className="nav-wrapper mx-auto max-w-7xl">
        <nav className="pointer-events-auto flex items-center justify-between rounded-full border border-black/5 bg-white/30 px-6 py-3 shadow-md backdrop-blur">
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
                      `
                      relative text-sm font-medium
                      transition-colors
                      ${
                        isActive
                          ? "text-gray-900"
                          : "text-gray-700 hover:text-gray-900"
                      }

                      after:absolute after:left-1/2 after:-bottom-1
                      after:h-[2px] after:w-0
                      after:-translate-x-1/2
                      after:rounded-full after:bg-[#540000]
                      after:transition-all after:duration-300

                      hover:after:w-full
                      ${isActive ? "after:w-full" : ""}
                    `
                    }
                  >
                    {link.label}
                  </NavLink>
                </div>
              </div>
            ))}

            {/* ADMIN ICON */}
            {isAdmin && (
              <NavLink to="/admin" className="relative flex items-center">
                <Shield className="h-5 w-5 text-[#540000]" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#540000] px-1 text-xs font-bold text-white animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </NavLink>
            )}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <SignedOut>
              <Link
                to="/login"
                className="
                  hidden md:inline-flex items-center justify-center
                  rounded-full px-5 py-2 text-sm font-medium
                  bg-[#540000] text-white
                  transition hover:bg-[#540000cf]
                "
              >
                Sign Up
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
                  className={({ isActive }) =>
                    `text-sm font-medium ${
                      isActive ? "text-[#540000]" : "text-gray-800"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {isAdmin && (
                <NavLink
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 text-sm font-semibold text-[#540000]"
                >
                  <Shield size={16} />
                  Admin Inbox
                  {unreadCount > 0 && (
                    <span className="rounded-full bg-[#540000] px-2 text-xs text-white">
                      {unreadCount}
                    </span>
                  )}
                </NavLink>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
