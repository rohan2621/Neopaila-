import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { FiArrowLeft } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

import Canvas from "../Components/Background/Canvas";
import NavBar from "../Components/NavBar";

export const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const hideBack = location.pathname === "/";

  return (
    <Canvas>
      {/* NAVBAR */}
      <NavBar />

      {/* BACK BUTTON */}
      <AnimatePresence>
        {!hideBack && (
          <motion.button
            key="back-btn"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.93 }}
            onClick={() => navigate(-1)}
            className="
              fixed z-[999]
              flex md:hidden items-center gap-2
              rounded-full text-white
              px-4 py-2
              text-sm font-medium
              cursor-pointer
              top-[4.5rem] left-5
            "
            style={{
              background: "linear-gradient(135deg, #c1121f 0%, #7b0d1e 100%)",
              boxShadow: "0 4px 18px rgba(193,18,31,0.35)",
            }}
          >
            <FiArrowLeft size={14} />
            Back
          </motion.button>
        )}
      </AnimatePresence>

      {/* PAGE CONTENT */}
      <div className="relative z-10 pt-20">
        <Outlet />
      </div>
    </Canvas>
  );
};
