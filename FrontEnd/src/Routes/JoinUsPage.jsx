import {
  FiUsers,
  FiMapPin,
  FiEdit3,
  FiBriefcase,
  FiTrendingUp,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router";

/* ---------------------------
   Animations (softer, human)
---------------------------- */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/* ---------------------------
   PAGE
---------------------------- */
const JoinUsPage = () => {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="relative min-h-screen px-5 py-28 md:px-10"
    >
      {/* subtle background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b  via-transparent to-transparent" />

      {/* HERO */}
      <motion.div variants={item} className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          This is more than a platform.
          <br className="hidden sm:block" />
          It’s a shared journey.
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          We’re slowly building a community of people who care about places,
          stories, and the meaning behind them — not just likes and views.
        </p>
      </motion.div>

      {/* STATS (offset = human) */}
      <motion.div
        variants={container}
        className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4"
      >
        <Stat value="1K+" label="Places shared by real people" />
        <Stat value="500+" label="Stories worth reading" />
        <Stat value="30+" label="Countries represented" />
        <Stat value="Still growing" label="And just getting started" />
      </motion.div>

      {/* FEATURES */}
      <motion.div
        variants={container}
        className="mx-auto mt-28 grid max-w-5xl gap-10 sm:grid-cols-2 md:grid-cols-3"
      >
        <FeatureCard
          icon={<FiMapPin />}
          title="Add meaningful places"
          desc="Not tourist checklists — places that actually meant something to you."
        />

        <FeatureCard
          icon={<FiEdit3 />}
          title="Tell your story"
          desc="Short, long, messy or poetic. If it’s real, it belongs here."
        />

        <FeatureCard
          icon={<FiUsers />}
          title="Find your people"
          desc="Readers, writers, explorers — people who value depth over noise."
        />
      </motion.div>

      {/* JOIN TEAM */}
      <motion.div variants={item} className="mx-auto mt-32 max-w-5xl">
        <div className="grid gap-12 rounded-3xl bg-white p-10 shadow-xl md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">
              Want to build this with us?
            </h2>

            <p className="mt-4 text-gray-600">
              We’re not a big company. Just a small, motivated team trying to
              build something meaningful — carefully and honestly.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-gray-600">
              <li>• Remote & flexible by default</li>
              <li>• Creative freedom, real ownership</li>
              <li>• A project you can be proud of</li>
            </ul>
          </div>

          <div className="flex items-center justify-center">
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-[#540000]/25 p-8 text-center"
            >
              <FiBriefcase size={38} className="mx-auto text-[#540000]" />

              <p className="mt-4 font-medium text-gray-700">
                Interested in collaborating?
              </p>

              <Link
                to="/contact-us"
                className="mt-4 inline-block rounded-full border border-[#540000] px-6 py-2 text-sm font-semibold text-[#540000] transition hover:bg-[#540000] hover:text-white"
              >
                Reach out
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div variants={item} className="mx-auto mt-32 max-w-3xl">
        <div className="rounded-3xl bg-white p-10 text-center shadow-xl">
          <h2 className="text-3xl font-semibold text-gray-900">
            Ready to take the first step?
          </h2>

          <p className="mt-3 text-gray-600">
            Create an account, explore stories, or simply read quietly.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="rounded-full bg-[#540000] px-8 py-3 font-semibold text-white transition hover:scale-105"
            >
              Get started
            </Link>

            <Link
              to="/login"
              className="rounded-full border border-[#540000] px-8 py-3 font-semibold text-[#540000] transition hover:bg-[#540000]/5"
            >
              I already have an account
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default JoinUsPage;

/* ---------------------------
   Components
---------------------------- */

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div
    variants={item}
    className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
  >
    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#540000]/10 text-[#540000]">
      {icon}
    </div>

    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    <p className="mt-2 text-sm text-gray-600">{desc}</p>
  </motion.div>
);

const Stat = ({ value, label }) => (
  <motion.div
    variants={item}
    className="rounded-2xl bg-white p-5 text-center shadow-md"
  >
    <div className="flex justify-center items-center gap-2 text-2xl font-bold text-[#540000]">
      <FiTrendingUp />
      {value}
    </div>
    <p className="mt-1 text-xs text-gray-600">{label}</p>
  </motion.div>
);
