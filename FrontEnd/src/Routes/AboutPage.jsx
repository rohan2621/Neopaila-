import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  FiArrowRight,
  FiHeart,
  FiBookOpen,
  FiUsers,
  FiStar,
  FiFeather,
  FiGlobe,
} from "react-icons/fi";
import { Link } from "react-router";
import { Img } from "./../Components/Img";
import NeoPailaFooter from "../Components/NeoPailaFooter";

/* ─── Easing ─── */
const E = [0.16, 1, 0.3, 1];

/* ─── Variants ─── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};
const vFadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9 } },
};
const vFadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: E } },
};
const vSlideL = {
  hidden: { opacity: 0, x: -36 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: E } },
};
const vSlideR = {
  hidden: { opacity: 0, x: 36 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: E } },
};
const vLine = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.55, ease: E, delay: 0.3 } },
};
const vPop = {
  hidden: { opacity: 0, scale: 0.88 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: E } },
};

/* ─── Ambient Orb ─── */
const Orb = ({ style, delay = 0, size = 320 }) => (
  <motion.div
    aria-hidden
    className="pointer-events-none absolute rounded-full"
    style={{
      width: size,
      height: size,
      background:
        "radial-gradient(circle, rgba(193,18,31,0.14) 0%, rgba(193,18,31,0.05) 55%, transparent 75%)",
      filter: "blur(40px)",
      ...style,
    }}
    animate={{ y: [0, -22, 0], scale: [1, 1.07, 1] }}
    transition={{
      repeat: Infinity,
      duration: 6 + delay,
      ease: "easeInOut",
      delay,
    }}
  />
);

/* ─── Floating dot ─── */
const FloatingDot = ({ style, delay = 0 }) => (
  <motion.div
    aria-hidden
    className="pointer-events-none absolute rounded-full bg-red-200/40"
    style={{ width: 6, height: 6, ...style }}
    animate={{ y: [0, -12, 0], opacity: [0.4, 0.9, 0.4] }}
    transition={{
      repeat: Infinity,
      duration: 3 + delay,
      ease: "easeInOut",
      delay,
    }}
  />
);

/* ─── Section label + accent line ─── */
const SectionLabel = ({ children }) => (
  <motion.div variants={stagger}>
    <motion.p
      variants={vFadeIn}
      className="text-[11px] font-semibold tracking-[0.28em] text-red-400 uppercase mb-3"
    >
      {children}
    </motion.p>
    <div className="overflow-hidden mb-8">
      <motion.div
        variants={vLine}
        style={{ transformOrigin: "left center" }}
        className="h-[2px] w-8 rounded-full bg-red-600"
      />
    </div>
  </motion.div>
);

/* ─── CTA Button ─── */
const CTAButton = ({ to, primary, children, reduceMotion }) => (
  <motion.div
    whileHover={!reduceMotion ? { scale: 1.05 } : {}}
    whileTap={!reduceMotion ? { scale: 0.94 } : {}}
    transition={{ type: "spring", stiffness: 290, damping: 17 }}
  >
    <Link
      to={to}
      style={
        primary
          ? {
              background: "linear-gradient(135deg, #c1121f 0%, #7b0d1e 100%)",
              boxShadow: "0 6px 24px rgba(193,18,31,0.35)",
            }
          : {}
      }
      className={
        primary
          ? "inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-semibold text-white text-sm tracking-wide"
          : "inline-flex items-center gap-2 rounded-full border-2 border-[#c1121f]/70 px-8 py-3.5 font-semibold text-[#c1121f] text-sm tracking-wide transition hover:bg-[#c1121f]/5 hover:border-[#c1121f]"
      }
    >
      {children} <FiArrowRight size={14} />
    </Link>
  </motion.div>
);

/* ─── Value card ─── */
const ValueCard = ({ icon, title, text, reduceMotion }) => (
  <motion.div
    variants={vFadeUp}
    whileHover={
      !reduceMotion
        ? { y: -8, boxShadow: "0 20px 48px rgba(193,18,31,0.14)" }
        : {}
    }
    transition={{ type: "spring", stiffness: 220, damping: 18 }}
    className="group relative rounded-2xl bg-white/90 backdrop-blur border border-red-100/80 p-7 shadow-md overflow-hidden"
  >
    <div
      aria-hidden
      className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(circle, rgba(193,18,31,0.08) 0%, transparent 70%)",
      }}
    />
    <motion.div
      className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl text-red-600"
      style={{ background: "rgba(193,18,31,0.09)" }}
      whileHover={!reduceMotion ? { scale: 1.15, rotate: 8 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {icon}
    </motion.div>
    <h3 className="text-[15px] font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
    <motion.div
      className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-red-600/60 to-transparent"
      initial={{ width: 0 }}
      whileHover={{ width: "60%" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    />
  </motion.div>
);

/* ─── MAIN PAGE ─── */
const AboutPage = () => {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const heroRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], [0, -40]);
  const heroO = useTransform(scrollY, [0, 300], [1, 0.4]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={stagger}
      className="relative bg-[#f7f5f0] overflow-hidden"
    >
      {/* ── TOP / BOTTOM BLENDS ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 inset-x-0 h-32 z-10"
        style={{
          background:
            "linear-gradient(to bottom, #f7f5f0 0%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 inset-x-0 h-32 z-10"
        style={{
          background: "linear-gradient(to top, #f7f5f0 0%, transparent 100%)",
        }}
      />

      {/* ── AMBIENT ORBS ── */}
      {!reduceMotion && (
        <>
          <Orb style={{ top: "2%", left: "-10%" }} size={420} delay={0} />
          <Orb style={{ top: "28%", right: "-8%" }} size={340} delay={1.5} />
          <Orb style={{ bottom: "18%", left: "22%" }} size={280} delay={2.8} />
          <Orb style={{ top: "60%", left: "55%" }} size={200} delay={4} />
        </>
      )}

      {/* ── FLOATING DOTS ── */}
      {!reduceMotion && (
        <>
          <FloatingDot style={{ top: "18%", left: "12%" }} delay={0} />
          <FloatingDot style={{ top: "35%", right: "15%" }} delay={1} />
          <FloatingDot style={{ top: "55%", left: "48%" }} delay={2} />
          <FloatingDot style={{ top: "72%", right: "28%" }} delay={0.5} />
        </>
      )}

      {/* ── DIAGONAL TINT ── */}
      <motion.div
        variants={vFadeIn}
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(193,18,31,0.05) 0%, transparent 45%, rgba(193,18,31,0.03) 100%)",
        }}
      />

      {/* ══════════════════ CONTENT ══════════════════ */}
      <div className="relative z-10 px-4 md:px-8 lg:px-12">
        {/* ─── HERO ─── */}
        <motion.div
          ref={heroRef}
          style={!reduceMotion ? { y: heroY, opacity: heroO } : {}}
          className="mx-auto max-w-5xl pt-36 pb-20"
        >
          <motion.div variants={stagger}>
            <motion.p
              variants={vFadeIn}
              className="text-[11px] font-semibold tracking-[0.28em] text-red-400 uppercase mb-4"
            >
              A youth-led cultural initiative
            </motion.p>
            <div className="overflow-hidden mb-5">
              <motion.div
                variants={vLine}
                style={{ transformOrigin: "left center" }}
                className="h-[2px] w-10 rounded-full bg-red-600"
              />
            </div>
            <motion.h1
              className="text-red-600"
              variants={vSlideL}
              style={{
                fontFamily: "'Times New Roman', serif",
                fontSize: "clamp(2.6rem, 6vw, 4.8rem)",
                lineHeight: 1.05,
                fontWeight: 400,
                color: "#e7000b",
              }}
            >
              Rewriting the past{" "}
            </motion.h1>
            <motion.h1
              variants={vSlideL}
              style={{
                fontFamily: "'Times New Roman', serif",
                fontSize: "clamp(2rem, 4vw, 4rem)",
                lineHeight: 1.05,
                fontWeight: 400,
                color: "#111827",
              }}
            >
              <motion.span
                className="mt-4 ml-10 inline-block will-change-transform"
                transition={{
                  repeat: Infinity,
                  duration: 2.8,
                  ease: "easeInOut",
                }}
              >
                Where Every step rekindles a story
              </motion.span>
            </motion.h1>
            <motion.p
              variants={vFadeUp}
              className="mt-6 max-w-xl text-base text-gray-500 leading-relaxed"
            >
              NeoPaila is a youth-led initiative that takes a fresh step toward
              rediscovering Nepal’s soul through stories, people and living
              traditions.
            </motion.p>
            <motion.div
              variants={vFadeUp}
              className="mt-10 flex flex-wrap gap-4"
            >
              <CTAButton to="/posts" primary reduceMotion={reduceMotion}>
                Explore our stories
              </CTAButton>
              <CTAButton
                to="/join-us"
                primary={false}
                reduceMotion={reduceMotion}
              >
                Join us
              </CTAButton>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ─── DIVIDER ─── */}
        <motion.div
          variants={vFadeIn}
          className="mx-auto max-w-5xl my-4 h-px bg-gradient-to-r from-transparent via-red-200/60 to-transparent"
        />

        {/* ─── PHILOSOPHY SPLIT ─── */}
        <motion.div
          variants={stagger}
          className="mx-auto max-w-5xl py-20 grid lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={vSlideL} className="space-y-6">
            <SectionLabel>Our philosophy</SectionLabel>
            <h2
              style={{
                fontFamily: "'Times New Roman', serif",
                fontWeight: 400,
              }}
              className="text-3xl md:text-4xl text-gray-900"
            >
              Heritage is{" "}
              <motion.span
                className="text-red-600 inline-block will-change-transform"
                animate={reduceMotion ? {} : { rotate: [0, -2, 2, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
              >
                alive.
              </motion.span>
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              Heritage isn’t a relic of the past; it’s the heartbeat that
              carries us forward and reminds us of our history. It exists in
              forgotten rituals, everyday practices and voices that have slowly
              faded from memory.
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              NeoPaila seeks these stories to protect what identifies us, making
              sure our roots remain as strong as the mountains they were born
              from.
            </p>
          </motion.div>

          <motion.div
            variants={vSlideR}
            whileHover={!reduceMotion ? { scale: 1.02 } : {}}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative rounded-3xl bg-white/90 backdrop-blur-sm border border-red-100/80 p-10 shadow-xl overflow-hidden"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 -right-16 w-52 h-52 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(193,18,31,0.09) 0%, transparent 70%)",
              }}
            />
            <div className="overflow-hidden mb-5">
              <motion.div
                variants={vLine}
                style={{ transformOrigin: "left center" }}
                className="h-[2px] w-8 rounded-full bg-red-600"
              />
            </div>
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-5">
              What we believe
            </p>
            <p
              style={{ fontFamily: "'Times New Roman', serif" }}
              className="text-xl leading-relaxed text-gray-800 italic"
            >
              "Culture survives not when it is archived, but when it is{" "}
              <span className="text-red-600 not-italic font-semibold">
                felt
              </span>
              ,{" "}
              <span className="text-red-600 not-italic font-semibold">
                shared
              </span>
              , and{" "}
              <span className="text-red-600 not-italic font-semibold">
                re-lived
              </span>
              ."
            </p>
          </motion.div>
        </motion.div>

        {/* ─── MISSION ─── */}
        <motion.div
          variants={stagger}
          className="mx-auto max-w-5xl py-20 grid lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div
            variants={vSlideL}
            whileHover={!reduceMotion ? { scale: 1.02 } : {}}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl order-last lg:order-first"
          >
            <Img
              src={"cover_1.jpg"}
              className="w-full h-80 lg:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            {/* Floating badge */}
            <motion.div
              className="absolute bottom-6 left-6 rounded-2xl bg-white/90 backdrop-blur px-5 py-3 shadow-lg border border-red-100/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6, ease: E }}
            >
              <p className="text-xs text-gray-500 uppercase tracking-widest">
                Mission
              </p>
              <p className="text-sm font-semibold text-gray-900 mt-0.5">
                Revive · Reimagine · Reconnect
              </p>
            </motion.div>
          </motion.div>

          <motion.div variants={vSlideR} className="space-y-6">
            <SectionLabel>Our mission</SectionLabel>
            <h2
              style={{
                fontFamily: "'Times New Roman', serif",
                fontWeight: 400,
              }}
              className="text-3xl md:text-4xl text-gray-900"
            >
              Bridging{" "}
              <motion.span
                className="text-red-600 inline-block will-change-transform"
                animate={reduceMotion ? {} : { y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
              >
                generations.
              </motion.span>
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              To revive and reimagine Nepal's cultural richness through modern
              storytelling, creative projects, and digital platforms —
              reconnecting identity across time.
            </p>
            <CTAButton to="/join-us" primary reduceMotion={reduceMotion}>
              Join the movement
            </CTAButton>
          </motion.div>
        </motion.div>

        {/* ─── DIVIDER ─── */}
        <motion.div
          variants={vFadeIn}
          className="mx-auto max-w-5xl my-4 h-px bg-gradient-to-r from-transparent via-red-200/60 to-transparent"
        />

        {/* ─── WHY IT MATTERS ─── */}
        <motion.div variants={stagger} className="mx-auto max-w-5xl py-20">
          <motion.div variants={stagger} className="mb-10">
            <SectionLabel>Why it matters</SectionLabel>
            <motion.h2
              variants={vFadeUp}
              style={{
                fontFamily: "'Times New Roman', serif",
                fontWeight: 400,
              }}
              className="text-3xl md:text-4xl text-gray-900"
            >
              Three reasons NeoPaila exists
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            <ValueCard
              icon={<FiBookOpen size={20} />}
              title="Lost Context"
              text="Many heritage spaces exist without stories. Meaning fades when context disappears — NeoPaila restores the thread."
              reduceMotion={reduceMotion}
            />
            <ValueCard
              icon={<FiHeart size={20} />}
              title="Living Memory"
              text="Culture lives through people, language, rituals, and shared experience — not in archives or glass cases."
              reduceMotion={reduceMotion}
            />
            <ValueCard
              icon={<FiFeather size={20} />}
              title="New Voices"
              text="Young storytellers bring fresh ways to understand old truths. Their perspective is the bridge between past and future."
              reduceMotion={reduceMotion}
            />
          </motion.div>
        </motion.div>

        {/* ─── FOUNDER ─── */}
        <motion.div
          variants={stagger}
          className="mx-auto max-w-5xl py-20 grid md:grid-cols-2 gap-10 items-center"
        >
          {/* Founder card */}
          <motion.div
            variants={vSlideL}
            className="relative rounded-3xl bg-white/90 backdrop-blur-sm border border-red-100/80 p-9 shadow-xl overflow-hidden"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 -right-16 w-52 h-52 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(193,18,31,0.09) 0%, transparent 70%)",
              }}
            />
            <SectionLabel>Founder</SectionLabel>
            <div className="flex items-center gap-5 mb-6">
              <motion.div
                className="w-16 h-16 rounded-full overflow-hidden shadow-md border-2 border-red-100 flex-shrink-0"
                whileHover={!reduceMotion ? { scale: 1.08 } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Img
                  src="admin.png"
                  alt="Kritika Pandey"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Kritika Pandey
                </h3>
                <p className="text-xs text-red-400 mt-0.5">
                  Founder & Director
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              NeoPaila was founded with a vision to bring heritage back to the
              heart. It is a commitment to seeing culture not as a distant
              artifact but as a lived experience defined by empathy, curiosity
              and the stories we choose to carry forward.
            </p>
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-red-600/60 to-transparent"
              initial={{ width: 0 }}
              whileInView={{ width: "40%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: E, delay: 0.4 }}
            />
          </motion.div>

          {/* Info chips */}
          <motion.div variants={stagger} className="flex flex-col gap-5">
            {[
              {
                icon: FiGlobe,
                title: "A global conversation",
                sub: "Connecting diaspora and locals through shared heritage",
              },
              {
                icon: FiUsers,
                title: "Community-driven",
                sub: "Built by and for the people who live these stories",
              },
              {
                icon: FiStar,
                title: "Authentic voices only",
                sub: "No manufactured nostalgia — only real, lived experience",
              },
            ].map(({ icon: Icon, title, sub }) => (
              <motion.div
                key={title}
                variants={vSlideR}
                whileHover={
                  !reduceMotion
                    ? { y: -6, boxShadow: "0 14px 36px rgba(193,18,31,0.14)" }
                    : {}
                }
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="flex items-center gap-4 rounded-2xl bg-white/90 backdrop-blur border border-red-100/80 p-5 shadow-sm"
              >
                <motion.div
                  className="flex h-11 w-11 items-center justify-center rounded-full text-red-600 flex-shrink-0"
                  style={{ background: "rgba(193,18,31,0.09)" }}
                  whileHover={!reduceMotion ? { scale: 1.18, rotate: 10 } : {}}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Icon size={18} />
                </motion.div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
                </div>
              </motion.div>
            ))}

            {/* Red gradient card */}
            <motion.div
              variants={vPop}
              className="relative rounded-3xl p-8 text-white shadow-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #c1121f 0%, #7b0d1e 100%)",
              }}
            >
              {!reduceMotion && (
                <>
                  <motion.div
                    aria-hidden
                    className="absolute -bottom-16 -right-16 rounded-full border border-white/15"
                    style={{ width: 220, height: 220 }}
                    animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.15, 0.5] }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    aria-hidden
                    className="absolute -bottom-8 -right-8 rounded-full border border-white/10"
                    style={{ width: 140, height: 140 }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.1, 0.4] }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "easeInOut",
                      delay: 0.8,
                    }}
                  />
                </>
              )}
              <div className="overflow-hidden mb-4">
                <motion.div
                  variants={vLine}
                  style={{ transformOrigin: "left center" }}
                  className="h-[2px] w-8 rounded-full bg-white/50"
                />
              </div>
              <h4
                style={{
                  fontFamily: "'Times New Roman', serif",
                  fontWeight: 400,
                }}
                className="text-xl relative z-10"
              >
                Nepal's stories deserve to be{" "}
                <motion.span
                  className="inline-block will-change-transform text-red-200"
                  animate={reduceMotion ? {} : { y: [0, -5, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.8,
                    ease: "easeInOut",
                    delay: 0.4,
                  }}
                >
                  heard.
                </motion.span>
              </h4>
              <p className="mt-2 text-sm opacity-70 italic relative z-10">
                Every ritual, every voice, every forgotten corner — waiting to
                be rediscovered.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ─── FINAL CTA ─── */}
        <motion.div variants={vFadeUp} className="mx-auto max-w-5xl pb-28">
          <motion.div className="relative rounded-3xl bg-white/90 backdrop-blur-sm p-12 shadow-xl border border-red-100/80 text-center overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(193,18,31,0.07) 0%, transparent 70%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-16 -right-16 w-56 h-56 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(193,18,31,0.05) 0%, transparent 70%)",
              }}
            />
            <motion.p
              variants={vFadeIn}
              className="text-[11px] font-semibold tracking-[0.28em] text-red-400 uppercase mb-4"
            >
              Ready to explore?
            </motion.p>
            <div className="overflow-hidden mb-6 flex justify-center">
              <motion.div
                variants={vLine}
                style={{ transformOrigin: "left center" }}
                className="h-[2px] w-8 rounded-full bg-red-600"
              />
            </div>
            <h2
              style={{
                fontFamily: "'Times New Roman', serif",
                fontWeight: 400,
              }}
              className="text-4xl text-gray-900"
            >
              Rediscover Nepal{" "}
              <motion.span
                className="text-red-600 inline-block will-change-transform"
                animate={reduceMotion ? {} : { y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.4,
                  ease: "easeInOut",
                }}
              >
                together.
              </motion.span>
            </h2>
            <p className="mt-4 text-sm italic text-gray-400 max-w-sm mx-auto">
              Dive into stories, rituals, and hidden corners. Every piece of
              heritage is waiting for you to find it.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <CTAButton to="/posts" primary reduceMotion={reduceMotion}>
                Explore projects
              </CTAButton>
              <CTAButton
                to="/join-us"
                primary={false}
                reduceMotion={reduceMotion}
              >
                Become a contributor
              </CTAButton>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <NeoPailaFooter />
    </motion.section>
  );
};

export default AboutPage;
