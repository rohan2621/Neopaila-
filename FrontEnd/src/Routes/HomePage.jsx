import React, { useEffect, useRef } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import MainCate from "../Components/MainCate";
import { useGSAP } from "@gsap/react";
import { FeaturedPost } from "../Components/FeaturedPost";

const HomePage = () => {
  const containerRef = useRef(null);
  useGSAP(() => {
    gsap.from(".heading", {
      y: -70,
      opacity: 0,
      duration: 0.5,
      ease:'power1.inOut'
    })
    gsap.from(".circ", { scale:.5 ,opacity:0,duration:0.7,ease:'power1.inOut'})
  })
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
        { scale: 1, duration: 1.4, opacity: 1, color: "#ff0000" },"-=0.5"
      ).fromTo(
        ".blue-word",
        { scale: 0, opacity: 0, y: -23 },
        { scale: 1, duration: `.8`, opacity: 1, color: "#0058ff" },
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
     {/* Header + Circular Text */}
<div className="flex flex-col lg:flex-row  items-start xl:items-center justify-between gap-10 md:gap-16 lg:gap-20 h-auto lg:h-[280px] px-6 md:px-12 lg:px-20 py-10">
  {/* Heading */}
  <h1
    style={{ fontFamily: "'Times New Roman', Times, serif" }}
    className="text-3xl heading sm:text-4xl md:text-5xl text-center lg:text-left leading-tight max-w-[700px]"
  >
    Create{" "}
    <span className="red-word text-red-600 opacity-0">Stories</span>
    <span className="block relative sm:left-[5ch] md:left-[7ch] lg:left-[9ch] mt-2 md:mt-4">
      from Around the{" "}
      <span className="blue-word text-blue-700 opacity-0">World</span>
    </span>
  </h1>

  {/* Circular animated text */}
        <div className="
  circ
    relative 
    flex 
    justify-center 
    items-center 
    mx-auto  lg:mx-0
    w-[180px] h-[180px] 
    sm:w-[200px] sm:h-[200px] 
    md:w-[220px] md:h-[220px] 
    lg:w-[240px] lg:h-[240px] 
    xl:w-[260px] xl:h-[260px]
    shrink-0 
    lg:ml-10 xl:ml-20
  ">
    <svg
      className="absolute w-full h-full drop-shadow-md"
      viewBox="0 0 100 100"
    >
      <defs>
        <path
          id="circlePath"
          d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0"
        />
      </defs>
      <text
        className="circular-text"
        fontSize="7"
        fill="#111"
        fontWeight="bold"
      >
        <textPath xlinkHref="#circlePath" startOffset="0">
          Discover Your Own stories with Others &nbsp;&nbsp; NeoPaila
        </textPath>
      </text>
    </svg>

    {/* Center arrow */}
    <svg
      className="arrow absolute rotate-[221deg] w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-red-600 drop-shadow-lg"
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


      <div className="">
      <MainCate/>

      </div>
      <div>
        <FeaturedPost/>
      </div>
    </div>
  );
};

export default HomePage;
