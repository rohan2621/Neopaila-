import React, { useState, useRef, useEffect } from "react";
import PostList from "../Components/PostList";
import SideMenu from "../Components/SideMenu";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const PostListPage = () => {
  const [open, setOpen] = useState(false);

  const pageRef = useRef(null);
  const headingRef = useRef(null);
  const btnRef = useRef(null);

  /* ---------------- Button Hover ---------------- */
  const handleEnter = () => {
    gsap.to(btnRef.current, {
      scale: 1.04,
      y: -2,
      boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
      duration: 0.25,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    gsap.to(btnRef.current, {
      scale: 1,
      y: 0,
      boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
      duration: 0.25,
      ease: "power3.out",
    });
  };

  /* ---------------- Scroll Animations ---------------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="relative overflow-x-hidden px-5 md:px-4 lg:px-8 xl:px-16 2xl:px-32"
    >
      {/* Heading */}
      <h1
        ref={headingRef}
        className="mb-6 text-lg font-medium tracking-wide text-gray-800"
      >
        Development Blog
      </h1>

      {/* Mobile filter button */}
      <button
        ref={btnRef}
        onClick={() => setOpen((p) => !p)}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="md:hidden mb-4 rounded-xl bg-gray-900 px-5 py-2 text-sm font-medium text-white shadow-md will-change-transform overflow-hidden"
      >
        {open ? "Close Filters" : "Filter or Search"}
      </button>

      {/* Layout */}
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Posts */}
        <div className="w-full md:w-3/4">
          <PostList />
        </div>

        {/* Sidebar */}
        <div className={`${open ? "block" : "hidden"} md:block md:w-1/4`}>
          <SideMenu />
        </div>
      </div>
    </div>
  );
};
