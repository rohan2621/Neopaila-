import { useState, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FiMail,
  FiMapPin,
  FiSend,
  FiUser,
  FiMessageSquare,
  FiCheckCircle,
} from "react-icons/fi";

const E = [0.16, 1, 0.3, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const vFadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9 } },
};
const vFadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: E } },
};
const vSlideL = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: E } },
};
const vSlideR = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: E } },
};
const vLine = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.5, ease: E, delay: 0.35 } },
};
const vPop = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: E } },
};

const Orb = ({ style, delay = 0, size = 320 }) => (
  <motion.div
    aria-hidden
    className="pointer-events-none absolute rounded-full"
    style={{
      width: size,
      height: size,
      background:
        "radial-gradient(circle, rgba(193,18,31,0.13) 0%, rgba(193,18,31,0.04) 55%, transparent 75%)",
      filter: "blur(32px)",
      ...style,
    }}
    animate={{ y: [0, -18, 0], scale: [1, 1.06, 1] }}
    transition={{
      repeat: Infinity,
      duration: 6 + delay,
      ease: "easeInOut",
      delay,
    }}
  />
);

/* ─── Animated Input with floating label & red glow ─── */
const InputField = ({ icon, label, name, type = "text", value, onChange }) => {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;
  const active = focused || filled;

  return (
    <motion.div
      className="relative"
      whileFocusWithin={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* Animated border glow behind the field */}
      <AnimatePresence>
        {focused && (
          <motion.div
            key="glow"
            className="pointer-events-none absolute -inset-[2px] rounded-xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(193,18,31,0.35), rgba(123,13,30,0.25))",
              zIndex: 0,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Icon */}
      <motion.span
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
        animate={{
          color: focused ? "#c1121f" : "#9ca3af",
          scale: focused ? 1.15 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      >
        {icon}
      </motion.span>

      {/* Floating label */}
      <motion.label
        htmlFor={name}
        className="pointer-events-none absolute left-12 z-10 origin-left text-sm text-gray-400 select-none"
        animate={
          active
            ? {
                y: "-160%",
                scale: 0.78,
                color: focused ? "#c1121f" : "#9ca3af",
                x: -12,
              }
            : { y: "-50%", scale: 1, color: "#9ca3af", x: 0, top: "50%" }
        }
        initial={{ y: "-50%", scale: 1, color: "#9ca3af", x: 0, top: "50%" }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        {label}
      </motion.label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete="off"
        style={{ outline: "none", boxShadow: "none" }}
        className="
          relative z-[1] w-full rounded-xl pt-5 pb-2 pl-12 pr-4 text-sm text-gray-800
          bg-white/80 border-2 transition-colors duration-200
          placeholder-transparent
        "
        css-border={
          focused
            ? "2px solid #c1121f"
            : filled
              ? "2px solid rgba(193,18,31,0.4)"
              : "2px solid rgba(0,0,0,0.08)"
        }
        placeholder={label}
      />

      {/* We control the border via inline style to avoid any Tailwind blue bleed */}
      <style>{`
        input[name="${name}"], textarea[name="${name}"] {
          border-color: ${focused ? "#c1121f" : filled ? "rgba(193,18,31,0.35)" : "rgba(0,0,0,0.08)"} !important;
          box-shadow: ${focused ? "0 0 0 3px rgba(193,18,31,0.15)" : "none"} !important;
          outline: none !important;
        }
        input[name="${name}"]:focus, textarea[name="${name}"]:focus {
          border-color: #c1121f !important;
          box-shadow: 0 0 0 3px rgba(193,18,31,0.15) !important;
          outline: none !important;
        }
      `}</style>
    </motion.div>
  );
};

/* ─── Animated Textarea ─── */
const TextAreaField = ({ icon, label, name, value, onChange }) => {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;

  return (
    <motion.div
      className="relative"
      whileFocusWithin={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <AnimatePresence>
        {focused && (
          <motion.div
            key="glow"
            className="pointer-events-none absolute -inset-[2px] rounded-xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(193,18,31,0.35), rgba(123,13,30,0.25))",
              zIndex: 0,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      <motion.span
        className="absolute left-4 top-5 z-10"
        animate={{
          color: focused ? "#c1121f" : "#9ca3af",
          scale: focused ? 1.15 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      >
        {icon}
      </motion.span>

      <motion.label
        htmlFor={name}
        className="pointer-events-none absolute left-12 top-5 z-10 origin-left text-sm text-gray-400 select-none"
        animate={
          focused || filled
            ? {
                y: "-90%",
                scale: 0.78,
                color: focused ? "#c1121f" : "#9ca3af",
                x: -12,
              }
            : { y: 0, scale: 1, color: "#9ca3af", x: 0 }
        }
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        {label}
      </motion.label>

      <textarea
        id={name}
        name={name}
        rows={5}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={label}
        style={{ outline: "none", boxShadow: "none" }}
        className="
          relative z-[1] w-full rounded-xl pt-7 pb-3 pl-12 pr-4 text-sm text-gray-800
          bg-white/80 border-2 transition-colors duration-200 resize-none
          placeholder-transparent
        "
      />

      <style>{`
        textarea[name="${name}"] {
          border-color: ${focused ? "#c1121f" : filled ? "rgba(193,18,31,0.35)" : "rgba(0,0,0,0.08)"} !important;
          box-shadow: ${focused ? "0 0 0 3px rgba(193,18,31,0.15)" : "none"} !important;
          outline: none !important;
        }
        textarea[name="${name}"]:focus {
          border-color: #c1121f !important;
          box-shadow: 0 0 0 3px rgba(193,18,31,0.15) !important;
          outline: none !important;
        }
      `}</style>
    </motion.div>
  );
};

/* ─── Send Button ─── */
const SendButton = ({ loading, sent, reduceMotion }) => {
  const [hov, setHov] = useState(false);
  return (
    <motion.button
      type="submit"
      disabled={loading}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      whileHover={!reduceMotion ? { scale: 1.05 } : {}}
      whileTap={!reduceMotion ? { scale: 0.94 } : {}}
      transition={{ type: "spring", stiffness: 290, damping: 17 }}
      style={{
        background: hov
          ? "linear-gradient(135deg, #7b0d1e 0%, #c1121f 100%)"
          : "linear-gradient(135deg, #c1121f 0%, #7b0d1e 100%)",
        boxShadow: hov
          ? "0 8px 32px rgba(193,18,31,0.5)"
          : "0 4px 18px rgba(193,18,31,0.3)",
        transition: "background 0.3s ease, box-shadow 0.3s ease",
        outline: "none",
        border: "none",
      }}
      className="mt-6 inline-flex items-center gap-2 rounded-full px-8 py-3 text-white font-semibold text-sm tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <motion.span
        animate={
          !loading && !reduceMotion
            ? { x: hov ? 4 : 0, rotate: hov ? -20 : 0 }
            : {}
        }
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <FiSend className={loading ? "animate-pulse" : ""} />
      </motion.span>
      <AnimatePresence mode="wait">
        <motion.span
          key={loading ? "sending" : "idle"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
        >
          {loading ? "Sending…" : "Send Message"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

/* ─── Info Card ─── */
const InfoCard = ({ icon, title, value, reduceMotion }) => (
  <motion.div
    variants={vSlideR}
    whileHover={
      !reduceMotion
        ? { y: -6, boxShadow: "0 14px 36px rgba(193,18,31,0.14)" }
        : {}
    }
    transition={{ type: "spring", stiffness: 220, damping: 18 }}
    className="flex items-center gap-4 rounded-2xl bg-white/85 backdrop-blur border border-red-100 p-5 shadow-sm"
  >
    <motion.div
      className="flex h-11 w-11 items-center justify-center rounded-full text-red-600 flex-shrink-0"
      style={{ background: "rgba(193,18,31,0.08)" }}
      whileHover={
        !reduceMotion
          ? { scale: 1.18, rotate: 10, background: "rgba(193,18,31,0.15)" }
          : {}
      }
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {icon}
    </motion.div>
    <div>
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <p className="text-sm text-gray-500">{value}</p>
    </div>
  </motion.div>
);

/* ─── MAIN COMPONENT ─── */
const ContactUsPage = () => {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/api/contact`, form);
      toast.success("Message sent successfully ✨");
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={stagger}
      className="relative bg-[#f7f5f0] pt-20 overflow-hidden"
    >
      {/* ── TOP BLEND ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 right-0 h-32 z-10"
        style={{
          background:
            "linear-gradient(to bottom, #f7f5f0 0%, transparent 100%)",
        }}
      />

      {/* ── BOTTOM BLEND ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 z-10"
        style={{
          background: "linear-gradient(to top, #f7f5f0 0%, transparent 100%)",
        }}
      />

      {/* ── AMBIENT ORBS ── */}
      {!reduceMotion && (
        <>
          <Orb style={{ top: "5%", left: "-8%" }} size={380} delay={0} />
          <Orb style={{ top: "30%", right: "-6%" }} size={300} delay={1.8} />
          <Orb style={{ bottom: "8%", left: "30%" }} size={260} delay={3} />
        </>
      )}

      {/* ── DIAGONAL TINT ── */}
      <motion.div
        variants={vFadeIn}
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(193,18,31,0.04) 0%, transparent 45%, rgba(193,18,31,0.04) 100%)",
        }}
      />

      {/* ── CONTENT ── */}
      <div className="relative z-10 px-4 py-24 md:px-8 lg:px-12">
        {/* HEADER */}
        <motion.div variants={vFadeUp} className="mx-auto max-w-5xl mb-16">
          <motion.p
            variants={vFadeIn}
            className="text-[11px] font-semibold tracking-[0.24em] text-red-400 uppercase mb-3"
          >
            We'd love to hear from you
          </motion.p>

          <div className="overflow-hidden mb-5">
            <motion.div
              variants={vLine}
              style={{ transformOrigin: "left center" }}
              className="h-[2px] w-10 rounded-full bg-red-600"
            />
          </div>

          <motion.h2
            variants={vSlideL}
            style={{
              fontFamily: "'Times New Roman', serif",
              fontSize: "clamp(2rem, 5vw, 3.6rem)",
              lineHeight: 1.08,
              fontWeight: 400,
              color: "#111827",
            }}
          >
            Contact{" "}
            <motion.span
              className="text-red-600 inline-block will-change-transform"
              animate={reduceMotion ? {} : { y: [0, -9, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2.6,
                ease: "easeInOut",
              }}
            >
              Us
            </motion.span>
          </motion.h2>

          <motion.p
            variants={vFadeIn}
            className="mt-3 text-[13px] italic text-gray-400"
          >
            Questions, ideas, collaborations — drop us a message.
          </motion.p>
        </motion.div>

        {/* GRID */}
        <motion.div
          variants={stagger}
          className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2"
        >
          {/* FORM */}
          <motion.form
            variants={vSlideL}
            onSubmit={handleSubmit}
            className="relative rounded-3xl bg-white/85 backdrop-blur-sm p-8 shadow-xl border border-red-100 overflow-hidden"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(193,18,31,0.10) 0%, transparent 70%)",
              }}
            />

            <h3
              style={{
                fontFamily: "'Times New Roman', serif",
                fontWeight: 400,
              }}
              className="text-xl text-gray-900 mb-6"
            >
              Send us a message
            </h3>

            <div className="space-y-5">
              <InputField
                icon={<FiUser />}
                label="Your name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              <InputField
                icon={<FiMail />}
                label="Your email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
              <TextAreaField
                icon={<FiMessageSquare />}
                label="Your message"
                name="message"
                value={form.message}
                onChange={handleChange}
              />
            </div>

            <SendButton
              loading={loading}
              sent={sent}
              reduceMotion={reduceMotion}
            />
          </motion.form>

          {/* INFO */}
          <motion.div variants={stagger} className="flex flex-col gap-5">
            <InfoCard
              icon={<FiMail size={20} />}
              title="Email"
              value="neopailaa@gmail.com"
              reduceMotion={reduceMotion}
            />
            <InfoCard
              icon={<FiMapPin size={20} />}
              title="Location"
              value="Kathmandu, Nepal"
              reduceMotion={reduceMotion}
            />

            {/* CTA card */}
            <motion.div
              variants={vPop}
              className="relative rounded-3xl p-8 text-white shadow-2xl overflow-hidden mt-auto"
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
                  meaningful
                </motion.span>
              </h4>
              <p className="mt-3 text-sm opacity-70 italic relative z-10">
                Feedback, partnerships, or just saying hi — we're open.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Global override — nuke any browser/Tailwind blue that sneaks in */}
      <style>{`
        .contact-section input, .contact-section textarea {
          outline: none !important;
          box-shadow: none !important;
        }
        .contact-section input:focus, .contact-section textarea:focus {
          outline: none !important;
        }
        * { --tw-ring-color: rgba(193,18,31,0.3) !important; }
      `}</style>
    </motion.section>
  );
};

export default ContactUsPage;
