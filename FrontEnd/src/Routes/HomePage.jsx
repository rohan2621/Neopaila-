import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import MainCate from "../Components/MainCate";
import FeaturedPost from "../Components/FeaturedPost";
import NeoPailaTestimonial from "../Components/NeoPailaTestimonial";
import NeoPailaFooter from "../Components/NeoPailaFooter";
import ContactUsPage from "./ContactUsPage";
import { FaPencilAlt } from "react-icons/fa";

import { BsArrowUpLeftCircleFill } from "react-icons/bs";
/* -------------------------------
   Simple animations (NO SCROLL)
-------------------------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const HomePage = () => {
  return (
    <div className="flex flex-col gap-16">
      {/* HERO */}
      <motion.section
        initial="hidden"
        animate="show"
        className="px-6 md:px-12 lg:px-20 pt-24"
      >
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
          {/* TEXT */}
          <motion.h1
            variants={fadeUp}
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
            className="text-4xl md:text-5xl lg:text-6xl leading-tight max-w-[720px]"
          >
            Create <span className="text-red-600 inline-block">Stories</span>
            <span className="block ml-20 mt-6">
              from Around the{" "}
              <span className="text-blue-700 inline-block">World</span>
            </span>
          </motion.h1>

          {/* WRITE ROUND – RIGHT SIDE */}
          <motion.div
            variants={fadeUp}
            className="w-[220px] h-[220px] mx-auto lg:mx-0"
            whileHover={{ scale: 1.06 }}
            transition={{ type: "spring", stiffness: 140 }}
          >
            <Link
              to="/write"
              className="relative flex items-center justify-center w-full h-full"
            >
              {/* ROTATING TEXT */}
              <motion.svg
                className="absolute w-full h-full"
                viewBox="0 0 100 100"
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 16,
                  ease: "linear",
                }}
              >
                <defs>
                  <path
                    id="circlePath"
                    d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0"
                  />
                </defs>

                <text fontSize="7" fontWeight="bold">
                  <textPath
                    className="gap-9 text-[9px]"
                    xlinkHref="#circlePath"
                  >
                    Write Y<tspan fill="#02b5d1">o</tspan>ur{" "}
                    <tspan fill="#ff0000">Own</tspan> Story{" "}
                    <tspan fill="#006b70">•</tspan>
                    NeoPaila <tspan fill="#040070">•</tspan>
                  </textPath>
                </text>
              </motion.svg>

              {/* ARROW */}
              <motion.div
                animate={{ rotate: -360 }}
                whileHover={{ scale: 1.08 }}
                transition={{
                  repeat: Infinity,
                  duration: 25,
                  ease: "easeIn",
                }}
                className="
    flex items-baseline justify-center
    h-10 w-10
    rounded-full
    bg-[#01329b]
    text-white
    text-4xl
    shadow-lg
    cursor-pointer
  "
              >
                <FaPencilAlt />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* MAIN CONTENT */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className="px-6 md:px-12 lg:px-20 space-y-16"
      >
        <MainCate />
        <FeaturedPost />
      </motion.section>

      {/* TESTIMONIAL */}
      <motion.section initial="hidden" animate="show" variants={fadeUp}>
        <NeoPailaTestimonial />
      </motion.section>

      {/* CONTACT */}
      <div className="-mt-24">
        <ContactUsPage />
      </div>

      {/* FOOTER */}
      <NeoPailaFooter />
    </div>
  );
};

export default HomePage;
