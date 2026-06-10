import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  FiUsers,
  FiMapPin,
  FiEdit3,
  FiBriefcase,
  FiTrendingUp,
  FiArrowRight,
  FiGlobe,
  FiHeart,
  FiStar,
} from "react-icons/fi";
import { Link } from "react-router";
/* ─── Easing ─── */ const E = [0.16, 1, 0.3, 1];
/* ─── Variants ─── */ const stagger = {
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
/* ─── Ambient Orb ─── */ const Orb = ({ style, delay = 0, size = 320 }) => (
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
/* ─── Floating decorative dots ─── */ const FloatingDot = ({
  style,
  delay = 0,
}) => (
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
/* ─── Stat Card ─── */ const Stat = ({
  value,
  label,
  icon: Icon,
  reduceMotion,
}) => (
  <motion.div
    variants={vFadeUp}
    whileHover={
      !reduceMotion
        ? { y: -8, boxShadow: "0 20px 48px rgba(193,18,31,0.16)" }
        : {}
    }
    transition={{ type: "spring", stiffness: 220, damping: 18 }}
    className="group relative flex flex-col items-center justify-center rounded-2xl bg-white/90 backdrop-blur border border-red-100/80 p-7 shadow-md text-center overflow-hidden"
  >
    {" "}
    {/* hover shimmer */}{" "}
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(circle at 50% 0%, rgba(193,18,31,0.06) 0%, transparent 70%)",
      }}
    />{" "}
    <div className="relative z-10">
      {" "}
      <div
        className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full text-red-600"
        style={{ background: "rgba(193,18,31,0.09)" }}
      >
        {" "}
        <Icon size={18} />{" "}
      </div>{" "}
      <div className="text-3xl font-bold text-red-600 tracking-tight">
        {value}
      </div>{" "}
      <p className="mt-1.5 text-xs text-gray-500 leading-snug">{label}</p>{" "}
    </div>{" "}
  </motion.div>
);
/* ─── Feature Card ─── */ const FeatureCard = ({
  icon,
  title,
  desc,
  index,
  reduceMotion,
}) => (
  <motion.div
    variants={vFadeUp}
    custom={index}
    whileHover={
      !reduceMotion
        ? { y: -8, boxShadow: "0 20px 48px rgba(193,18,31,0.14)" }
        : {}
    }
    transition={{ type: "spring", stiffness: 220, damping: 18 }}
    className="group relative rounded-2xl bg-white/90 backdrop-blur border border-red-100/80 p-7 shadow-md overflow-hidden"
  >
    {" "}
    <div
      aria-hidden
      className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(circle, rgba(193,18,31,0.08) 0%, transparent 70%)",
      }}
    />{" "}
    <motion.div
      className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl text-red-600"
      style={{ background: "rgba(193,18,31,0.09)" }}
      whileHover={!reduceMotion ? { scale: 1.15, rotate: 8 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {" "}
      {icon}{" "}
    </motion.div>{" "}
    <h3 className="text-[15px] font-semibold text-gray-900 mb-2">{title}</h3>{" "}
    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>{" "}
    {/* bottom accent line on hover */}{" "}
    <motion.div
      className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-red-600/60 to-transparent"
      initial={{ width: 0 }}
      whileHover={{ width: "60%" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    />{" "}
  </motion.div>
);
/* ─── Role / Perk Row ─── */ const PerkRow = ({ children, reduceMotion }) => (
  <motion.li
    variants={vFadeUp}
    className="flex items-center gap-3 text-sm text-gray-600"
  >
    {" "}
    <motion.span
      className="inline-flex h-6 w-6 items-center justify-center rounded-full text-red-600 flex-shrink-0"
      style={{ background: "rgba(193,18,31,0.09)" }}
      whileHover={!reduceMotion ? { scale: 1.2, rotate: 5 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {" "}
      <FiArrowRight size={11} />{" "}
    </motion.span>{" "}
    {children}{" "}
  </motion.li>
);
/* ─── CTA Button ─── */ const CTAButton = ({
  to,
  primary,
  children,
  reduceMotion,
}) => (
  <motion.div
    whileHover={!reduceMotion ? { scale: 1.05 } : {}}
    whileTap={!reduceMotion ? { scale: 0.94 } : {}}
    transition={{ type: "spring", stiffness: 290, damping: 17 }}
  >
    {" "}
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
      {" "}
      {children} <FiArrowRight size={14} />{" "}
    </Link>{" "}
  </motion.div>
);
/* ─── MAIN PAGE ─── */ const JoinUsPage = () => {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const heroRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  /* Parallax for hero text */ const { scrollY } = useScroll();
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
      {" "}
      {/* ── TOP / BOTTOM BLENDS ── */}{" "}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 inset-x-0 h-32 z-10"
        style={{
          background:
            "linear-gradient(to bottom, #f7f5f0 0%, transparent 100%)",
        }}
      />{" "}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 inset-x-0 h-32 z-10"
        style={{
          background: "linear-gradient(to top, #f7f5f0 0%, transparent 100%)",
        }}
      />{" "}
      {/* ── AMBIENT ORBS ── */}{" "}
      {!reduceMotion && (
        <>
          {" "}
          <Orb style={{ top: "2%", left: "-10%" }} size={420} delay={0} />{" "}
          <Orb style={{ top: "28%", right: "-8%" }} size={340} delay={1.5} />{" "}
          <Orb style={{ bottom: "18%", left: "22%" }} size={280} delay={2.8} />{" "}
          <Orb style={{ top: "60%", left: "55%" }} size={200} delay={4} />{" "}
        </>
      )}{" "}
      {/* ── FLOATING DOTS ── */}{" "}
      {!reduceMotion && (
        <>
          {" "}
          <FloatingDot style={{ top: "18%", left: "12%" }} delay={0} />{" "}
          <FloatingDot style={{ top: "35%", right: "15%" }} delay={1} />{" "}
          <FloatingDot style={{ top: "55%", left: "48%" }} delay={2} />{" "}
          <FloatingDot style={{ top: "72%", right: "28%" }} delay={0.5} />{" "}
        </>
      )}{" "}
      {/* ── DIAGONAL TINT ── */}{" "}
      <motion.div
        variants={vFadeIn}
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(193,18,31,0.05) 0%, transparent 45%, rgba(193,18,31,0.03) 100%)",
        }}
      />{" "}
      {/* ══════════════════ CONTENT ══════════════════ */}{" "}
      <div className="relative z-10 px-4 md:px-8 lg:px-12">
        {" "}
        {/* ─── HERO ─── */}{" "}
        <motion.div
          ref={heroRef}
          style={!reduceMotion ? { y: heroY, opacity: heroO } : {}}
          className="mx-auto max-w-5xl pt-36 pb-20"
        >
          {" "}
          <motion.div variants={stagger}>
            {" "}
            <motion.p
              variants={vFadeIn}
              className="text-[11px] font-semibold tracking-[0.28em] text-red-400 uppercase mb-4"
            >
              {" "}
              More than a platform{" "}
            </motion.p>{" "}
            <div className="overflow-hidden mb-5">
              {" "}
              <motion.div
                variants={vLine}
                style={{ transformOrigin: "left center" }}
                className="h-[2px] w-10 rounded-full bg-red-600"
              />{" "}
            </div>{" "}
            <motion.h1
              variants={vSlideL}
              style={{
                fontFamily: "'Times New Roman', serif",
                fontSize: "clamp(2.6rem, 6vw, 4.8rem)",
                lineHeight: 1.05,
                fontWeight: 400,
                color: "#111827",
              }}
            >
              {" "}
              This is a shared{" "}
              <motion.span
                className="text-red-600 inline-block will-change-transform"
                animate={reduceMotion ? {} : { y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.8,
                  ease: "easeInOut",
                }}
              >
                {" "}
                journey.{" "}
              </motion.span>{" "}
            </motion.h1>{" "}
            <motion.p
              variants={vFadeUp}
              className="mt-6 max-w-xl text-base text-gray-500 leading-relaxed"
            >
              {" "}
              We are a community of passionate voices united by creativity,
              expression and a shared drive to make a meaningful impact.{" "}
            </motion.p>{" "}
            {/* Hero CTA row */}{" "}
            <motion.div
              variants={vFadeUp}
              className="mt-10 flex flex-wrap gap-4"
            >
              {" "}
              <CTAButton to="/register" primary reduceMotion={reduceMotion}>
                {" "}
                Get started{" "}
              </CTAButton>{" "}
              <CTAButton
                to="/login"
                primary={false}
                reduceMotion={reduceMotion}
              >
                {" "}
                Sign in{" "}
              </CTAButton>{" "}
            </motion.div>{" "}
          </motion.div>{" "}
        </motion.div>{" "}
        {/* ─── STATS ─── */}{" "}
        <motion.div
          variants={stagger}
          className="mx-auto grid max-w-5xl grid-cols-2 gap-5 md:grid-cols-4"
        >
          {" "}
          <Stat
            value="1K+"
            label="People reached"
            icon={FiMapPin}
            reduceMotion={reduceMotion}
          />{" "}
          <Stat
            value="10+"
            label="Stories worth reading"
            icon={FiEdit3}
            reduceMotion={reduceMotion}
          />{" "}
          <Stat
            value="120+"
            label="Culture represented"
            icon={FiGlobe}
            reduceMotion={reduceMotion}
          />{" "}
          <Stat
            value="∞"
            label="And just getting started"
            icon={FiTrendingUp}
            reduceMotion={reduceMotion}
          />{" "}
        </motion.div>{" "}
        {/* ─── DIVIDER ─── */}{" "}
        <motion.div
          variants={vFadeIn}
          className="mx-auto max-w-5xl my-20 h-px bg-gradient-to-r from-transparent via-red-200/60 to-transparent"
        />{" "}
        {/* ─── FEATURES ─── */}{" "}
        <motion.div variants={stagger} className="mx-auto max-w-5xl mb-6">
          {" "}
          <motion.p
            variants={vFadeIn}
            className="text-[11px] font-semibold tracking-[0.28em] text-red-400 uppercase mb-3"
          >
            {" "}
            What you can do{" "}
          </motion.p>{" "}
          <div className="overflow-hidden mb-10">
            {" "}
            <motion.div
              variants={vLine}
              style={{ transformOrigin: "left center" }}
              className="h-[2px] w-8 rounded-full bg-red-600"
            />{" "}
          </div>{" "}
        </motion.div>{" "}
        <motion.div
          variants={stagger}
          className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 md:grid-cols-3 mb-20"
        >
          {" "}
          <FeatureCard
            icon={<FiMapPin size={20} />}
            title="Add meaningful places"
            desc="Not tourist checklists — places that actually meant something to you."
            index={0}
            reduceMotion={reduceMotion}
          />{" "}
          <FeatureCard
            icon={<FiEdit3 size={20} />}
            title="Tell your story"
            desc="Short, long, messy or poetic. If it's real, it belongs here."
            index={1}
            reduceMotion={reduceMotion}
          />{" "}
          <FeatureCard
            icon={<FiUsers size={20} />}
            title="Find your people"
            desc="Readers, writers, explorers — people who value depth over noise."
            index={2}
            reduceMotion={reduceMotion}
          />{" "}
        </motion.div>{" "}
        {/* ─── JOIN TEAM ─── */}{" "}
        <motion.div
          variants={stagger}
          className="mx-auto grid max-w-5xl gap-7 md:grid-cols-2 mb-20"
        >
          {" "}
          {/* Left glass card */}{" "}
          <motion.div
            variants={vSlideL}
            className="relative rounded-3xl bg-white/90 backdrop-blur-sm p-9 shadow-xl border border-red-100/80 overflow-hidden"
          >
            {" "}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 -right-16 w-52 h-52 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(193,18,31,0.09) 0%, transparent 70%)",
              }}
            />{" "}
            <motion.p
              variants={vFadeIn}
              className="text-[11px] font-semibold tracking-[0.28em] text-red-400 uppercase mb-3"
            >
              {" "}
              Open roles{" "}
            </motion.p>{" "}
            <div className="overflow-hidden mb-5">
              {" "}
              <motion.div
                variants={vLine}
                style={{ transformOrigin: "left center" }}
                className="h-[2px] w-8 rounded-full bg-red-600"
              />{" "}
            </div>{" "}
            <h3
              style={{
                fontFamily: "'Times New Roman', serif",
                fontWeight: 400,
              }}
              className="text-2xl text-gray-900 mb-3"
            >
              {" "}
              Want to build this with us?{" "}
            </h3>{" "}
            <p className="text-sm text-gray-500 mb-7 leading-relaxed">
              {" "}
              We're not a big company. Just a small, motivated team trying to
              build something meaningful — carefully and honestly.{" "}
            </p>{" "}
            <motion.ul variants={stagger} className="space-y-3.5">
              {" "}
              {[
                "Remote & flexible by default",
                "Creative freedom, real ownership",
                "A project you can be proud of",
                "Direct impact from day one",
              ].map((item) => (
                <PerkRow key={item} reduceMotion={reduceMotion}>
                  {item}
                </PerkRow>
              ))}{" "}
            </motion.ul>{" "}
            <motion.div variants={vFadeUp} className="mt-8">
              {" "}
              <CTAButton to="/contact-us" primary reduceMotion={reduceMotion}>
                {" "}
                Reach out{" "}
              </CTAButton>{" "}
            </motion.div>{" "}
          </motion.div>{" "}
          {/* Right col */}{" "}
          <motion.div variants={stagger} className="flex flex-col gap-5">
            {" "}
            {/* Info chips */}{" "}
            {[
              {
                icon: FiBriefcase,
                title: "Collaborate with us",
                sub: "Open to partnerships and freelancers",
              },
              {
                icon: FiHeart,
                title: "Mission-driven work",
                sub: "Built with intention, not metrics",
              },
              {
                icon: FiStar,
                title: "Your story matters",
                sub: "Real people, real places, real voices",
              },
            ].map(({ icon: Icon, title, sub }, i) => (
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
                {" "}
                <motion.div
                  className="flex h-11 w-11 items-center justify-center rounded-full text-red-600 flex-shrink-0"
                  style={{ background: "rgba(193,18,31,0.09)" }}
                  whileHover={!reduceMotion ? { scale: 1.18, rotate: 10 } : {}}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {" "}
                  <Icon size={18} />{" "}
                </motion.div>{" "}
                <div>
                  {" "}
                  <p className="text-sm font-semibold text-gray-900">
                    {title}
                  </p>{" "}
                  <p className="text-xs text-gray-500 mt-0.5">{sub}</p>{" "}
                </div>{" "}
              </motion.div>
            ))}{" "}
            {/* Red gradient card */}{" "}
            <motion.div
              variants={vPop}
              className="relative rounded-3xl p-8 text-white shadow-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #c1121f 0%, #7b0d1e 100%)",
              }}
            >
              {" "}
              {!reduceMotion && (
                <>
                  {" "}
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
                  />{" "}
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
                  />{" "}
                </>
              )}{" "}
              <div className="overflow-hidden mb-4">
                {" "}
                <motion.div
                  variants={vLine}
                  style={{ transformOrigin: "left center" }}
                  className="h-[2px] w-8 rounded-full bg-white/50"
                />{" "}
              </div>{" "}
              <h4
                style={{
                  fontFamily: "'Times New Roman', serif",
                  fontWeight: 400,
                }}
                className="text-xl relative z-10"
              >
                {" "}
                Let's build something{" "}
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
                  {" "}
                  meaningful{" "}
                </motion.span>{" "}
              </h4>{" "}
              <p className="mt-2 text-sm opacity-70 italic relative z-10">
                {" "}
                Feedback, partnerships, or just saying hi — we're open.{" "}
              </p>{" "}
            </motion.div>{" "}
          </motion.div>{" "}
        </motion.div>{" "}
        {/* ─── FINAL CTA ─── */}{" "}
        <motion.div variants={vFadeUp} className="mx-auto max-w-5xl pb-28">
          {" "}
          <motion.div className="relative rounded-3xl bg-white/90 backdrop-blur-sm p-12 shadow-xl border border-red-100/80 text-center overflow-hidden">
            {" "}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(193,18,31,0.07) 0%, transparent 70%)",
              }}
            />{" "}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-16 -right-16 w-56 h-56 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(193,18,31,0.05) 0%, transparent 70%)",
              }}
            />{" "}
            <motion.p
              variants={vFadeIn}
              className="text-[11px] font-semibold tracking-[0.28em] text-red-400 uppercase mb-4"
            >
              {" "}
              Ready to begin?{" "}
            </motion.p>{" "}
            <div className="overflow-hidden mb-6 flex justify-center">
              {" "}
              <motion.div
                variants={vLine}
                style={{ transformOrigin: "left center" }}
                className="h-[2px] w-8 rounded-full bg-red-600"
              />{" "}
            </div>{" "}
            <h2
              style={{
                fontFamily: "'Times New Roman', serif",
                fontWeight: 400,
              }}
              className="text-4xl text-gray-900"
            >
              {" "}
              Take the first{" "}
              <motion.span
                className="text-red-600 inline-block will-change-transform"
                animate={reduceMotion ? {} : { y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.4,
                  ease: "easeInOut",
                }}
              >
                {" "}
                step{" "}
              </motion.span>{" "}
            </h2>{" "}
            <p className="mt-4 text-sm italic text-gray-400 max-w-sm mx-auto">
              {" "}
              Create an account, explore stories, or simply read quietly. No
              pressure.{" "}
            </p>{" "}
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              {" "}
              <CTAButton to="/register" primary reduceMotion={reduceMotion}>
                {" "}
                Create an account{" "}
              </CTAButton>{" "}
              <CTAButton
                to="/login"
                primary={false}
                reduceMotion={reduceMotion}
              >
                {" "}
                I already have an account{" "}
              </CTAButton>{" "}
            </div>{" "}
          </motion.div>{" "}
        </motion.div>{" "}
      </div>{" "}
    </motion.section>
  );
};
export default JoinUsPage;
