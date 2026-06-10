import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import MainCate from "../Components/MainCate";
import FeaturedPost from "../Components/FeaturedPost";
import NeoPailaTestimonial from "../Components/NeoPailaTestimonial";
import NeoPailaFooter from "../Components/NeoPailaFooter";
import ContactUsPage from "./ContactUsPage";
import { FaPencilAlt } from "react-icons/fa";

/* ─────────────────────────────────────────────
   ONE EASING CURVE — every element moves alike
───────────────────────────────────────────── */
const E = [0.16, 1, 0.3, 1];

/* ─────────────────────────────────────────────
   VARIANTS
───────────────────────────────────────────── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.06 } },
};
const vFadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8 } },
};
const vSlideL = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: E } },
};
const vFadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: E } },
};
const vSlideR = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: E } },
};
const vLine = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.45, ease: E, delay: 0.44 } },
};

/* ─────────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────────── */
const Reveal = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: E, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────── */
const HomePage = () => {
  const heroRef = useRef(null);
  const [hov, setHov] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  /* Only scale (safe — won't expose hidden watermark) */
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.07]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-9%"]);
  const dimO = useTransform(scrollYProgress, [0, 1], [0, 0.18]);

  return (
    <div className="flex flex-col bg-[#f7f5f0]">
      {/* ════════════════════════════════
           HERO
         ════════════════════════════════ */}
      <section ref={heroRef} className="px-4 md:px-8 lg:px-12 pt-4">
        <div
          className="relative w-full rounded-3xl overflow-hidden"
          style={{ height: "clamp(280px, 44vw, 460px)" }}
        >
          {/* ── IMAGE
              Anchored to RIGHT edge with natural aspect ratio.
              The source image has "NEPAL" text on its LEFT half
              and the stupa on its RIGHT half.
              right:0 + h-full + w:auto → only the stupa is
              visible; the text watermark overflows left and is
              hidden by overflow-hidden + the white gradient.     */}
          <motion.div
            className="absolute top-0 right-0 h-full will-change-transform"
            style={{ scale: imgScale, transformOrigin: "right center" }}
          >
            <img
              src="/nepal-cover.jpg"
              alt="Bouddhanath Stupa, Nepal"
              style={{
                height: "100%",
                width: "auto",
                maxWidth: "none",
                display: "block",
                filter: "brightness(1.03) saturate(1.12)",
              }}
            />
          </motion.div>

          {/* ── GRADIENT STACK
              Solid white covers first 22% (kills any stray text)
              then soft ramp to transparent at 72%
              Bottom ramp kills the decorative red strip at image base */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                linear-gradient(to right,
                  rgb(247,245,240)        0%,
                  rgb(247,245,240)       22%,
                  rgba(247,245,240,0.96) 30%,
                  rgba(247,245,240,0.85) 40%,
                  rgba(247,245,240,0.55) 52%,
                  rgba(247,245,240,0.18) 63%,
                  transparent            72%
                ),
                linear-gradient(to top,
                  rgba(247,245,240,0.94) 0%,
                  rgba(247,245,240,0.55) 12%,
                  transparent            28%
                )
              `,
            }}
          />

          {/* ── SCROLL DIM ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none bg-black"
            style={{ opacity: dimO }}
          />

          {/* ── CONTENT ── */}
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-between"
            style={{
              y: textY,
              paddingLeft: "clamp(22px, 5vw, 54px)",
              paddingRight: "clamp(22px, 5vw, 54px)",
            }}
            initial="hidden"
            animate="show"
            variants={stagger}
          >
            {/* LEFT copy */}
            <div className="flex flex-col">
              <motion.p
                variants={vFadeIn}
                className="text-[11px] font-semibold tracking-[0.22em] text-gray-400 uppercase mb-3"
              >
                Exploring the Wonders of
              </motion.p>

              {/* Red rule — overflow-hidden is the flash-killer */}
              <div className="overflow-hidden mb-[18px]">
                <motion.div
                  variants={vLine}
                  style={{ transformOrigin: "left center" }}
                  className="h-[2px] w-10 rounded-full bg-red-500"
                />
              </div>

              {/* H1 line 1 */}
              <motion.h1
                variants={vSlideL}
                style={{
                  fontFamily: "'Times New Roman', serif",
                  fontSize: "clamp(1.9rem, 4.6vw, 3.8rem)",
                  lineHeight: 1.09,
                  fontWeight: 400,
                  color: "#111827",
                  marginBottom: "4px",
                }}
              >
                Create{" "}
                {/*
                  SMOOTH FLOAT FIX:
                  animate to a SINGLE value + repeatType:"mirror"
                  ← the browser reverses the tween smoothly.
                  Keyframe arrays [0,-9,0] have a discontinuity
                  at the loop seam → that was the frame-by-frame look.
                */}
                <motion.span
                  className="text-red-600 inline-block will-change-transform"
                  animate={{ y: -9 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 2.5,
                    ease: "easeInOut",
                  }}
                >
                  Stories
                </motion.span>
              </motion.h1>

              {/* H1 line 2 */}
              <motion.div
                variants={vFadeUp}
                style={{
                  fontFamily: "'Times New Roman', serif",
                  fontSize: "clamp(1.9rem, 4.6vw, 3.8rem)",
                  lineHeight: 1.09,
                  fontWeight: 400,
                  color: "#111827",
                  paddingLeft: "clamp(1.4rem, 3.8vw, 3.8rem)",
                  marginBottom: "clamp(12px, 2vw, 20px)",
                }}
              >
                from Around the{" "}
                <motion.span
                  className="text-blue-700 inline-block will-change-transform"
                  animate={{ y: -9 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 2.5,
                    ease: "easeInOut",
                    delay: 0.6, // offset so they don't move in sync
                  }}
                >
                  World
                </motion.span>
              </motion.div>

              {/* Subline */}
              <motion.p
                variants={vFadeIn}
                className="text-[12.5px] italic text-gray-400"
              >
                Rewriting the past, where every step rekindles a story
              </motion.p>
            </div>

            {/* ────────────────────────────────────────
                RIGHT — circular frosted-glass write CTA

                Design rationale:
                • Frosted glass (backdrop-blur) blends
                  naturally with whatever stupa art sits
                  behind it — no hard edge.
                • Spinning text ring reverses on hover
                  for a premium feel.
                • Two offset pulse rings add life without
                  cluttering.
                • Center changes from navy → red on hover
                  with a spring bounce.
               ──────────────────────────────────────── */}
            <motion.div
              variants={vSlideR}
              className="flex-shrink-0 hidden sm:flex items-center justify-center"
              style={{
                width: "clamp(148px, 15.5vw, 192px)",
                height: "clamp(148px, 15.5vw, 192px)",
              }}
              onMouseEnter={() => setHov(true)}
              onMouseLeave={() => setHov(false)}
            >
              <Link
                to="/write"
                className="relative flex items-center justify-center w-full h-full"
              >
                {/* Frosted glass backdrop ring */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    backdropFilter: "blur(5px)",
                    WebkitBackdropFilter: "blur(5px)",
                    border: "1px solid rgba(255,255,255,0.55)",
                    boxShadow: "0 6px 32px rgba(0,0,0,0.08)",
                  }}
                />

                {/* Spinning text ring — reverses + speeds up on hover */}
                <motion.svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 100 100"
                  animate={{ rotate: hov ? -360 : 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: hov ? 7 : 15,
                    ease: "linear",
                  }}
                >
                  <defs>
                    <path
                      id="ring"
                      d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
                    />
                  </defs>
                  <text fontSize="7.5" fontWeight="600">
                    <textPath xlinkHref="#ring" fill="#1e293b">
                      Write <tspan fill="#02b5d1">Your</tspan>{" "}
                      <tspan fill="#e63946">Own</tspan> Story{" "}
                      <tspan fill="#059669">◆</tspan> NeoPaila{" "}
                      <tspan fill="#1d4ed8">◆</tspan>{" "}
                    </textPath>
                  </text>
                </motion.svg>

                {/* Two staggered pulse rings */}
                {[0, 0.65].map((delay, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: "clamp(52px, 5.6vw, 70px)",
                      height: "clamp(52px, 5.6vw, 70px)",
                      border: "1px solid rgba(1, 150, 155, 0.3)",
                    }}
                    animate={{ scale: [1, 1.8], opacity: [0.45, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.5,
                      ease: "easeOut",
                      delay,
                    }}
                  />
                ))}

                {/* Center button */}
                <motion.div
                  className="relative z-10 flex flex-col items-center justify-center rounded-full select-none cursor-pointer"
                  style={{
                    width: "clamp(52px, 5.6vw, 70px)",
                    height: "clamp(52px, 5.6vw, 70px)",
                    background: hov ? "#c1121f" : "#01329b",
                    transition: "background 0.28s ease, box-shadow 0.28s ease",
                    boxShadow: hov
                      ? "0 4px 22px rgba(193,18,31,0.45)"
                      : "0 4px 22px rgba(1,50,155,0.38)",
                  }}
                  whileHover={{ scale: 1.13 }}
                  whileTap={{ scale: 0.87 }}
                  transition={{ type: "spring", stiffness: 290, damping: 17 }}
                >
                  <motion.div
                    animate={{ rotate: hov ? 15 : 0 }}
                    transition={{ type: "spring", stiffness: 320, damping: 20 }}
                  >
                    <FaPencilAlt
                      className="text-white"
                      style={{ fontSize: "clamp(13px, 1.35vw, 18px)" }}
                    />
                  </motion.div>
                  <span
                    className="text-white/75 font-bold tracking-widest mt-[3px]"
                    style={{ fontSize: "clamp(5px, 0.55vw, 7px)" }}
                  >
                    WRITE
                  </span>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Bottom page-blend */}
          <div
            className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(247,245,240,0.88))",
            }}
          />
        </div>
      </section>

      {/* ════════════════════════════════
           BELOW-FOLD SECTIONS
         ════════════════════════════════ */}
      <Reveal className="px-4 md:px-8 lg:px-12 pt-10 space-y-16">
        <MainCate />
        <FeaturedPost />
      </Reveal>

      <Reveal className="relative z-100" delay={0.08}>
        <NeoPailaTestimonial />
      </Reveal>

      <Reveal className="-mt-16">
        <ContactUsPage />
      </Reveal>

      <NeoPailaFooter />
    </div>
  );
};

export default HomePage;
