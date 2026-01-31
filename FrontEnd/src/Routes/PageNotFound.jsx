import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fffefc] text-gray-800 px-4">
      {/* Animated 404 Text */}
      <motion.h1
        className="text-[10rem] md:text-[12rem] font-extrabold text-red-600"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        404
      </motion.h1>

      {/* Subheading */}
      <motion.p
        className="text-xl md:text-2xl mt-4 font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Oops! Page not found.
      </motion.p>

      {/* Description */}
      <motion.p
        className="text-gray-600 mt-2 text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </motion.p>

      {/* Back to Home Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Link
          to="/"
          className="mt-6 inline-block bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
        >
          Go Back Home
        </Link>
      </motion.div>

      {/* Optional Decorative Circle */}
      <motion.div
        className="absolute w-64 h-64 bg-red-100 rounded-full -z-10 top-1/4 left-1/2 -translate-x-1/2"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
    </div>
  );
};

export default PageNotFound;
