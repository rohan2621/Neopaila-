import React, { useEffect, useRef } from "react";
import { Link } from "react-router";
import gsap from "gsap";

const HomePage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Circular text rotation
      gsap.to(".circular-text", {
        rotation: 360,
        duration: 12,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
        transformBox: "fillBox",
      });

      // Heading color words animation
      const tl = gsap.timeline({ defaults: { ease: "back.out(1.7)" } });
      tl.fromTo(
        ".red-word",
        { scale: 0, opacity: 0, y: -23 },
        { scale: 1, duration: 1.4, opacity: 1, color: "#ff0000" }
      ).fromTo(
        ".blue-word",
        { scale: 0, opacity: 0, y: -23 },
        { scale: 1, duration: 1.8, opacity: 1, color: "#0058ff" },
        "-=0.5"
      );

      // Arrow subtle bounce
      gsap.to(".arrow", {
        y: -5,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, containerRef); // scope animations to containerRef

    return () => ctx.revert(); // cleanup on unmount
  }, []);

  return (
    <div ref={containerRef} className="mt-4 flex flex-col gap-6 md:gap-10">
      {/* Breadcrumbs */}
      <div className="flex gap-2 text-sm">
        <Link to={"/"} className="hover:text-blue-600 transition-colors">Home</Link>
        <span className="text-[10px] flex items-center">●</span>
        <span className="text-blue-900">Blogs and Articles</span>
      </div>

      {/* Header + Circular Text */}
      <div className="flex flex-col md:flex-row justify-between h-[250px] items-center gap-10 md:gap-20">
        {/* Heading */}
       

        <h1
  style={{ fontFamily: "'Times New Roman', Times, serif" }}
  className="text-3xl md:text-5xl text-center leading-tight"
>
  Create{" "}
  <span className="red-word text-red-600 opacity-0">Stories</span>
  <span className="block relative left-[10ch] mt-2 md:mt-4">
    from Around the{" "}
    <span className="blue-word text-blue-700 opacity-0">World</span>
  </span>
</h1>
        {/* Circular animated text */}
        <div className="relative right-20 w-55 h-55 flex justify-center items-center">
          <svg className="absolute w-full h-full drop-shadow-md" viewBox="0 0 100 100">
            <defs>
              <path
                id="circlePath"
                d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0"
              />
            </defs>
            <text className="circular-text" fontSize="9" fill="#111" fontWeight="bold">
              <textPath xlinkHref="#circlePath" startOffset="0">
                Discover Your Own stories with Others &nbsp;&nbsp; NeoPaila
              </textPath>
            </text>
          </svg>

          {/* Center arrow */}
          <svg
            className="arrow absolute rotate-[221deg] w-12 h-12 text-red-600 drop-shadow-lg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="2" x2="12" y2="18" />
            <polyline points="5 11 12 18 19 11" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
