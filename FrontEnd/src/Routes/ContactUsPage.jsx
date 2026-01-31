import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FiMail,
  FiMapPin,
  FiSend,
  FiUser,
  FiMessageSquare,
} from "react-icons/fi";

/* ---------------------------
   Animation helpers
---------------------------- */
const spring = {
  type: "spring",
  stiffness: 120,
  damping: 18,
  mass: 0.8,
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const ContactUsPage = () => {
  const reduceMotion = useReducedMotion();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

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
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={stagger}
      className="
        relative min-h-[calc(100vh-80px)]
        px-4 pt-28 pb-24 md:px-8
        overflow-hidden
      "
    >
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute -top-70 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-[180px]" />

      {/* HERO */}
      <motion.div
        variants={fadeUp}
        transition={reduceMotion ? {} : spring}
        className="mx-auto max-w-3xl text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Questions, ideas, collaborations — drop us a message.
        </p>
      </motion.div>

      {/* CONTENT */}
      <motion.div
        variants={stagger}
        className="mx-auto mt-20 grid max-w-5xl gap-10 md:grid-cols-2"
      >
        {/* FORM */}
        <motion.form
          variants={fadeUp}
          transition={reduceMotion ? {} : spring}
          onSubmit={handleSubmit}
          className="
            rounded-3xl bg-white/80 backdrop-blur
            p-8 shadow-xl
            border border-black/5
          "
        >
          <h2 className="text-2xl font-bold text-gray-900">
            Send us a message
          </h2>

          <div className="mt-6 space-y-4">
            <InputField
              icon={<FiUser />}
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
            />

            <InputField
              icon={<FiMail />}
              name="email"
              type="email"
              placeholder="Your email"
              value={form.email}
              onChange={handleChange}
            />

            <TextAreaField
              icon={<FiMessageSquare />}
              name="message"
              placeholder="Your message"
              value={form.message}
              onChange={handleChange}
            />
          </div>

          <motion.button
            whileHover={!reduceMotion && { scale: 1.03 }}
            whileTap={!reduceMotion && { scale: 0.97 }}
            transition={spring}
            type="submit"
            disabled={loading}
            className="
              mt-6 inline-flex items-center gap-2
              rounded-full bg-[#540000]
              px-8 py-3 text-white font-semibold
              shadow-md
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            <FiSend className={loading ? "animate-pulse" : ""} />
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.form>

        {/* INFO */}
        <motion.div variants={stagger} className="flex flex-col gap-6">
          <InfoCard
            icon={<FiMail size={22} />}
            title="Email"
            value="neopailaa@gmail.com"
          />

          <InfoCard
            icon={<FiMapPin size={22} />}
            title="Location"
            value="Kathmandu, Nepal"
          />

          <motion.div
            variants={fadeUp}
            transition={spring}
            className="
              rounded-3xl bg-[#540000]
              p-8 text-white
              shadow-xl ring-1 ring-white/10
            "
          >
            <h3 className="text-xl font-semibold">
              Let’s build something meaningful
            </h3>
            <p className="mt-3 text-sm opacity-90">
              Feedback, partnerships, or just saying hi — we’re open.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ContactUsPage;

/* ---------------------------
   Reusable Components
---------------------------- */

const InputField = ({ icon, ...props }) => (
  <motion.div
    whileFocusWithin={{ scale: 1.015 }}
    transition={{ type: "spring", stiffness: 200, damping: 20 }}
    className="relative"
  >
    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
      {icon}
    </span>
    <input
      {...props}
      className="
        w-full rounded-xl
        border border-black/10
        bg-white/70
        py-3 pl-12 pr-4
        outline-none transition
        focus:border-[#540000]
        focus:ring-2 focus:ring-[#540000]/20
      "
    />
  </motion.div>
);

const TextAreaField = ({ icon, ...props }) => (
  <motion.div
    whileFocusWithin={{ scale: 1.015 }}
    transition={{ type: "spring", stiffness: 200, damping: 20 }}
    className="relative"
  >
    <span className="absolute left-4 top-4 text-gray-400">{icon}</span>
    <textarea
      rows={5}
      {...props}
      className="
        w-full rounded-xl
        border border-black/10
        bg-white/70
        py-3 pl-12 pr-4
        outline-none transition
        focus:border-[#540000]
        focus:ring-2 focus:ring-[#540000]/20
      "
    />
  </motion.div>
);

const InfoCard = ({ icon, title, value }) => (
  <motion.div
    variants={fadeUp}
    transition={spring}
    whileHover={{ y: -4 }}
    className="
      flex items-center gap-4
      rounded-2xl bg-white/80 backdrop-blur
      border border-black/5
      p-5 shadow-sm
    "
  >
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#540000]/10 text-[#540000]">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <p className="text-sm text-gray-600">{value}</p>
    </div>
  </motion.div>
);
