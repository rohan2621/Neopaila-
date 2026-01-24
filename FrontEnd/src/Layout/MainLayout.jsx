import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { FiArrowLeft } from "react-icons/fi";

import Canvas from "../Components/Background/Canvas";
import NavBar from "../Components/NavBar";

export const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // hide back button on home
  const hideBack = location.pathname === "/";

  return (
    <Canvas>
      {/* NAVBAR */}
      <NavBar />

      {/* GLOBAL BACK BUTTON */}
      {!hideBack && (
        <button
          onClick={() => navigate(-1)}
          className="
            fixed z-[999]
            flex items-center gap-2
            rounded-full
            border text-white
            bg-[#540000]
            px-4 py-2
            text-sm font-medium
            cursor-pointer
            shadow-lg transition
            hover:scale-105

            /* 🔥 RESPONSIVE POSITION FIX */
            top-20 left-5
            xl:top-6
          "
        >
          <FiArrowLeft size={16} />
          Back
        </button>
      )}

      {/* PAGE CONTENT */}
      <div className="relative z-20">
        <Outlet />
      </div>
    </Canvas>
  );
};
