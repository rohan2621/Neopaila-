import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FiMail,
  FiMapPin,
  FiSend,
  FiZap,
  FiLayers,
  FiMoon,
  FiUser,
  FiMessageSquare,
} from "react-icons/fi";

/* ---------------------------
   Animations
---------------------------- */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const ContactUsPage = () => {
  const reduceMotion = useReducedMotion();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  /* ---------------------------
     HANDLERS
  ---------------------------- */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/api/contact`, form);
      toast.success("✅ Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="
        relative
        min-h-[calc(100vh-80px)]
        px-4 pt-28 pb-24 md:px-8
        overflow-hidden
        scroll-mt-24
      "
    >
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#540000]/20 blur-[140px]" />

      {/* HERO */}
      <motion.div variants={item} className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Contact Us 📩
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Have a question, idea, or collaboration in mind? We’d love to hear
          from you.
        </p>
      </motion.div>

      {/* CONTENT */}
      <motion.div
        variants={container}
        className="mx-auto mt-20 grid max-w-5xl gap-10 md:grid-cols-2"
      >
        {/* FORM */}
        <motion.form
          variants={item}
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-8 shadow-xl"
        >
          <h2 className="text-2xl font-bold text-gray-900">
            Send us a message
          </h2>

          <div className="mt-6 space-y-4">
            {/* NAME */}
            <InputField
              icon={<FiUser />}
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
            />

            {/* EMAIL */}
            <InputField
              icon={<FiMail />}
              name="email"
              type="email"
              placeholder="Your email"
              value={form.email}
              onChange={handleChange}
            />

            {/* MESSAGE */}
            <TextAreaField
              icon={<FiMessageSquare />}
              name="message"
              placeholder="Your message"
              value={form.message}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            aria-label="Send message"
            className="
              mt-6 inline-flex items-center gap-2
              rounded-full bg-[#540000]
              px-8 py-3 text-white
              font-semibold shadow-lg
              transition
              hover:scale-105
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          >
            <FiSend />
            {loading ? "Sending..." : "Send Message"}
          </button>
        </motion.form>

        {/* INFO */}
        <motion.div variants={item} className="flex flex-col gap-6">
          <InfoCard
            icon={<FiMail size={22} />}
            title="Email"
            value="hello@yourapp.com"
          />

          <InfoCard
            icon={<FiMapPin size={22} />}
            title="Location"
            value="Global / Remote Team 🌍"
          />

          <div className="rounded-3xl bg-[#540000] p-8 text-white shadow-xl">
            <h3 className="text-xl font-semibold">
              Let’s build something meaningful
            </h3>
            <p className="mt-3 text-sm opacity-90">
              Feedback, partnerships, or just saying hi — we’re always open.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* 🧠 WHAT’S NEXT */}
      <motion.section
        variants={container}
        className="mx-auto mt-28 max-w-5xl text-center"
      >
        <motion.h2 variants={item} className="text-3xl font-bold text-gray-900">
          🧠 Want next?
        </motion.h2>

        <motion.p
          variants={item}
          className="mx-auto mt-4 max-w-2xl text-gray-600"
        >
          If you want, next we can:
        </motion.p>

        <motion.div
          variants={container}
          className="mt-14 grid gap-8 sm:grid-cols-2 md:grid-cols-3"
        >
          <NextCard
            icon={<FiZap />}
            title="Admin Inbox"
            desc="View & manage contact messages securely."
          />

          <NextCard
            icon={<FiLayers />}
            title="Email Notifications"
            desc="Auto-send emails when someone contacts you."
          />

          <NextCard
            icon={<FiMoon />}
            title="Spam Protection"
            desc="Rate-limit & bot protection for safety."
          />
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default ContactUsPage;

/* ---------------------------
   Reusable Components
---------------------------- */

const InputField = ({ icon, ...props }) => (
  <div className="relative">
    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
      {icon}
    </span>
    <input
      {...props}
      className="
        w-full rounded-xl border border-gray-200
        py-3 pl-12 pr-4
        outline-none transition
        focus:border-[#540000]
      "
    />
  </div>
);

const TextAreaField = ({ icon, ...props }) => (
  <div className="relative">
    <span className="absolute left-4 top-4 text-gray-400">{icon}</span>
    <textarea
      rows={5}
      {...props}
      className="
        w-full rounded-xl border border-gray-200
        py-3 pl-12 pr-4
        outline-none transition
        focus:border-[#540000]
      "
    />
  </div>
);

const InfoCard = ({ icon, title, value }) => (
  <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-md">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#540000]/10 text-[#540000]">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <p className="text-sm text-gray-600">{value}</p>
    </div>
  </div>
);

const NextCard = ({ icon, title, desc }) => (
  <motion.div
    variants={item}
    whileHover={{ y: -6 }}
    className="rounded-2xl bg-white p-6 shadow-md hover:shadow-xl transition"
  >
    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#540000]/10 text-[#540000]">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    <p className="mt-2 text-sm text-gray-600">{desc}</p>
  </motion.div>
);
