import React from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { MainCateValues } from "../utils/Resource";
import { useGSAP } from "@gsap/react";
const MainCate = () => {
  const handleHover = (e, solid) => {
    gsap.to(e.currentTarget, {
      scale: 1.1,
      backgroundColor: solid ? "#540000" : "#feefefa6", // only change bg for non-solid
      boxShadow: "0px 6px 15px rgba(255, 0, 0, 0.2)",
      duration: 0.3,
      ease: "power2.out",
    });
  };
    useGSAP(() => {
        gsap.from(".mainCat",{ x:-100 ,opacity:0,duration:1.6})
      
  },[])
  const handleLeave = (e, solid) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      backgroundColor: solid ? "#540000" : "transparent", // keep solid color intact
      boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
      duration: 0.3,
      ease: "power2.inOut",
    });
  };

  return (
    <div className="hidden mainCat md:flex bg-[#ffffffc8] rounded-3xl xl:rounded-full p-2 shadow-lg items-center justify-center gap-8">
      {/* Links */}
      <div className="flex-1 flex items-center justify-between flex-wrap">
        {MainCateValues.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            onMouseEnter={(e) => handleHover(e, link.solid)}
            onMouseLeave={(e) => handleLeave(e, link.solid)}
            className={`rounded-full px-4 py-2 transition-colors duration-200 ${
              link.solid
                ? "bg-[#540000] text-amber-50"
                : "text-[#540000] hover:text-red-600"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Divider */}
      <div>
        <span className="text-xl font-medium">|</span>
      </div>

      {/* Search Bar */}
      <div className="flex px-4 py-3 rounded-3xl bg-gray-100 overflow-hidden max-w-md mx-auto items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 192.904 192.904"
          width="16px"
          className="fill-gray-600 mr-3 rotate-90"
        >
          <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
        </svg>
        <input
          type="text"
          placeholder="Search Something..."
          className="w-full outline-none bg-transparent text-gray-600 text-sm"
        />
      </div>
    </div>
  );
};

export default MainCate;
