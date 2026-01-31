import { motion } from "framer-motion";
import { Img } from "./../Components/Img";
import { Link } from "react-router";
import NeoPailaFooter from "../Components/NeoPailaFooter";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const AboutPage = () => {
  return (
    <div className="relative overflow-hidden">
      {/* HERO / FIRST SECTION */}
      <section className="relative px-6 md:px-12 lg:px-20 pt-32 pb-40 text-center lg:text-left">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-xl md:text-xl lg:text-7xl font-serif leading-tight max-w-4xl mx-auto lg:mx-0 text-red-600"
        >
          A New Way of{" "}
          <span className="block mt-6 lg:ml-24 text-black">
            Remembering Nepal
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 max-w-2xl mx-auto lg:mx-0 text-lg text-gray-700"
        >
          NeoPaila is a youth-led cultural initiative re-imagining how heritage
          is experienced—through stories, people, and living traditions.
        </motion.p>

        <motion.button
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 px-10 py-4 cursor-pointer bg-red-600 text-white rounded-full font-semibold shadow-md hover:bg-red-700 transition-colors"
        >
          <Link to={"/posts"}>Explore Our Stories</Link>
        </motion.button>
      </section>

      {/* SPLIT STORY */}
      <section className="relative px-6 md:px-12 lg:px-20 pb-40">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-[#7f1d1d]">
              Heritage Is Alive
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Heritage is not confined to monuments or textbooks. It exists in
              forgotten rituals, everyday practices, and voices that have slowly
              faded from memory.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              NeoPaila seeks these stories—not to preserve them behind glass,
              but to let them breathe again in the present.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative bg-white rounded-3xl shadow-xl p-12 hover:shadow-2xl transition-shadow"
          >
            <p className="text-sm uppercase tracking-widest text-gray-400">
              Our Philosophy
            </p>
            <p className="mt-6 text-xl leading-relaxed text-gray-800 italic">
              “Culture survives not when it is archived, but when it is felt,
              shared, and re-lived.”
            </p>
          </motion.div>
        </div>
      </section>

      {/* MISSION STRIP WITH WAVES */}
      <section className="relative px-6 md:px-12 lg:px-20 py-32 overflow-hidden flex flex-col lg:flex-row gap-12 items-center">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute w-[200%] h-full top-0 left-0 animate-wave-left">
            <svg
              className="w-full h-full"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path
                fill="#feeaea"
                d="M0,160L80,138.7C160,117,320,75,480,80C640,85,800,139,960,160C1120,181,1280,171,1360,165.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
              ></path>
            </svg>
          </div>
          <div className="absolute w-[200%] h-full top-0 left-0 animate-wave-right opacity-70">
            <svg
              className="w-full h-full"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path
                fill="#ffded9"
                d="M0,200L80,180C160,160,320,120,480,130C640,140,800,200,960,190C1120,180,1280,170,1360,165L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
              ></path>
            </svg>
          </div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative max-w-3xl z-10 space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#7f1d1d]">
            Our Mission
          </h2>
          <p className="text-lg text-gray-800 leading-relaxed">
            To <span className="font-semibold text-red-600">revive</span> and{" "}
            <span className="font-semibold text-red-600">reimagine</span>{" "}
            Nepal’s cultural richness through modern storytelling, creative
            projects, and digital platforms—bridging generations and
            reconnecting identity.
          </p>
          <Link
            to={"/join-us"}
            className="px-8 py-3 cursor-pointer bg-red-600 text-white rounded-full font-semibold shadow-md hover:bg-red-700 transition"
          >
            Join Us
          </Link>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative flex-1 z-10 rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500"
          whileHover={{ scale: 1.05 }}
        >
          <Img src={"heritage"} className="w-full h-80 lg:h-96 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl pointer-events-none" />
        </motion.div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="relative px-6 md:px-12 lg:px-20 py-40">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl font-bold text-[#7f1d1d] text-center lg:text-left"
        >
          Why NeoPaila Matters
        </motion.h2>

        <div className="mt-20 grid md:grid-cols-3 gap-12">
          {[
            {
              title: "Lost Context",
              text: "Many heritage spaces exist without stories. Meaning fades when context disappears.",
            },
            {
              title: "Living Memory",
              text: "Culture lives through people, language, rituals, and shared experience.",
            },
            {
              title: "New Voices",
              text: "Young storytellers bring fresh ways to understand old truths.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <h3 className="font-semibold text-lg text-gray-900">
                {item.title}
              </h3>
              <p className="mt-4 text-gray-600 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOUNDER */}
      <section className="relative px-6 md:px-12 lg:px-20 pb-40 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-40 h-40 rounded-full shadow-lg overflow-hidden"
        >
          {/* Img component handles the image */}
          <Img
            src="admin.png"
            alt="Kritika Pandey"
            className="w-full h-full object-cover rounded-full"
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl border-l-4 border-red-200 pl-8 space-y-3"
        >
          <p className="uppercase tracking-widest text-gray-400 text-sm">
            Founder
          </p>
          <h3 className="text-xl font-semibold text-gray-900">
            Kritika Pandey
          </h3>
          <p className="leading-relaxed text-gray-700">
            NeoPaila was founded with a vision to make Nepal’s heritage feel
            personal again—rooted in empathy, curiosity, and respect for lived
            history.
          </p>
        </motion.div>
      </section>

      {/* SIMPLIFIED CLOSING SECTION */}
      <section className="relative px-6 md:px-12 lg:px-20 py-40 bg-gradient-to-r from-red-50 via-white to-pink-50 overflow-hidden rounded-3xl">
        {/* Decorative floating shapes */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float-slow-reverse"></div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex-1 space-y-6 text-center lg:text-left"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-red-600">
              Rediscover Nepal
              <span className="block mt-2 text-red-500 font-semibold">
                Through Stories
              </span>
            </h2>
            <p className="text-lg text-gray-700 max-w-lg">
              Dive into NeoPaila’s projects and experience heritage like never
              before. Every story, ritual, and hidden corner is waiting for you
              to explore.
            </p>
            <button className="mt-6 px-10 py-4 cursor-pointer bg-red-600 text-white font-semibold rounded-full shadow-md hover:bg-red-700 transition">
              <Link to={"/posts"}>Explore Projects</Link>
            </button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex-1 relative rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500"
            whileHover={{ scale: 1.05 }}
          >
            <Img
              src={"heritage"}
              className="w-full h-80 lg:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl pointer-events-none" />
          </motion.div>
        </div>

        <style jsx>{`
          @keyframes float-slow {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
          @keyframes float-slow-reverse {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(20px);
            }
          }
          .animate-float-slow {
            animation: float-slow 12s ease-in-out infinite;
          }
          .animate-float-slow-reverse {
            animation: float-slow-reverse 15s ease-in-out infinite;
          }
        `}</style>
      </section>
      <NeoPailaFooter />
    </div>
  );
};

export default AboutPage;
