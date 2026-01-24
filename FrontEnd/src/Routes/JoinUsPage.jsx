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
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const hoverIcon = {
  hover: { scale: 1.15, rotate: 6 },
};

/* ---------------------------
   PAGE
---------------------------- */
const JoinUsPage = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="
        relative
        min-h-[calc(100vh-80px)]
        overflow-hidden
        px-4 py-24 md:px-8
      "
    >
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#540000]/20 blur-[140px]" />

      {/* HERO */}
      <motion.div variants={item} className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Be Part of Our Journey 🌍
        </h1>
        <p className="mt-5 text-lg text-gray-600">
          We’re building a community of explorers, writers, and creators who
          love meaningful places and stories.
        </p>
      </motion.div>

      {/* STATS */}
      <motion.div
        variants={container}
        className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4"
      >
        <Stat value="1K+" label="Locations Shared" />
        <Stat value="500+" label="Stories Written" />
        <Stat value="30+" label="Countries" />
        <Stat value="Growing" label="Community" />
      </motion.div>

      {/* FEATURES */}
      <motion.div
        variants={container}
        className="mx-auto mt-24 grid max-w-5xl gap-8 sm:grid-cols-2 md:grid-cols-3"
      >
        <FeatureCard
          icon={<FiMapPin size={26} />}
          title="Share Locations"
          desc="Add meaningful places on the map and guide others."
        />
        <FeatureCard
          icon={<FiEdit3 size={26} />}
          title="Write Stories"
          desc="Turn experiences into stories people remember."
        />
        <FeatureCard
          icon={<FiUsers size={26} />}
          title="Grow Together"
          desc="Connect with a community that values exploration."
        />
      </motion.div>

      {/* JOIN THE TEAM */}
      <motion.div variants={item} className="mx-auto mt-28 max-w-5xl">
        <div
          className="
            grid gap-10 rounded-3xl
            bg-white p-10 shadow-xl
            md:grid-cols-2
          "
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Join the Team 🚀
            </h2>
            <p className="mt-4 text-gray-600">
              We’re always looking for passionate people — designers,
              developers, writers, and explorers.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-gray-600">
              <li>✨ Flexible & remote-friendly</li>
              <li>🌍 Impactful global project</li>
              <li>🚀 Grow with a fast-moving team</li>
            </ul>
          </div>

          <div className="flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="
                flex flex-col items-center gap-4
                rounded-2xl border
                border-[#540000]/30
                p-8 text-center
              "
            >
              <FiBriefcase size={42} className="text-[#540000]" />
              <p className="text-gray-700 font-medium">
                Interested in working with us?
              </p>
              <Link
                to={"/contact-us"}
                className="
                  rounded-full
                  border border-[#540000]
                  px-6 py-2
                  text-sm font-semibold
                  text-[#540000]
                  transition
                  hover:bg-[#540000]
                  hover:text-white
                "
              >
                Contact the Team
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div variants={item} className="mx-auto mt-28 max-w-3xl">
        <div className="rounded-3xl bg-white p-10 text-center shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900">
            Ready to start your journey?
          </h2>
          <p className="mt-3 text-gray-600">
            Join now and help shape the future of exploration.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="
                rounded-full bg-[#540000]
                px-8 py-3 text-white
                font-semibold shadow-lg
                transition hover:scale-105
              "
            >
              Create Account
            </Link>

            <Link
              to="/login"
              className="
                rounded-full border border-[#540000]
                px-8 py-3 font-semibold
                text-[#540000]
                transition
                hover:scale-105
                
              "
            >
              Sign In
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default JoinUsPage;

/* ---------------------------
   Components
---------------------------- */

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div
    variants={item}
    whileHover="hover"
    className="
      group rounded-2xl bg-white
      p-6 shadow-md transition
      hover:-translate-y-1 hover:shadow-xl
    "
  >
    <motion.div
      variants={hoverIcon}
      className="
        mb-4 inline-flex h-12 w-12
        items-center justify-center
        rounded-full bg-[#540000]/10
        text-[#540000]
        group-hover:bg-[#540000]
        group-hover:text-white
      "
    >
      {icon}
    </motion.div>

    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    <p className="mt-2 text-sm text-gray-600">{desc}</p>
  </motion.div>
);

const Stat = ({ value, label }) => (
  <motion.div
    variants={item}
    className="
      flex flex-col items-center
      rounded-2xl bg-white p-5
      shadow-md
    "
  >
    <div className="flex items-center gap-2 text-2xl font-bold text-[#540000]">
      <FiTrendingUp />
      {value}
    </div>
    <span className="mt-1 text-xs text-gray-600">{label}</span>
  </motion.div>
);
