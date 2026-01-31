import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const ParallaxWaves = () => {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const wave1Y = useTransform(scrollY, [0, 500], [0, 40]);
  const wave2Y = useTransform(scrollY, [0, 500], [0, 70]);
  const wave3Y = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <div className="pointer-events-none absolute top-0 left-0 w-full overflow-hidden">
      {/* Wave 1 (back) */}
      <motion.svg
        style={{ y: reduceMotion ? 0 : wave1Y }}
        viewBox="0 0 1440 320"
        className="absolute w-[120%] h-[220px] opacity-40"
        preserveAspectRatio="none"
      >
        <path
          fill="#e6edf5"
          d="M0,160L80,170.7C160,181,320,203,480,197.3C640,192,800,160,960,144C1120,128,1280,128,1360,128L1440,128L1440,0L1360,0L1280,0L1120,0L960,0L800,0L640,0L480,0L320,0L160,0L80,0L0,0Z"
        />
      </motion.svg>

      {/* Wave 2 (middle) */}
      <motion.svg
        style={{ y: reduceMotion ? 0 : wave2Y }}
        viewBox="0 0 1440 320"
        className="absolute w-[120%] h-[200px] opacity-70"
        preserveAspectRatio="none"
      >
        <path
          fill="#f1f5f9"
          d="M0,192L120,186.7C240,181,480,171,720,165.3C960,160,1200,160,1320,160L1440,160L1440,0L1320,0L1200,0L960,0L720,0L480,0L240,0L120,0L0,0Z"
        />
      </motion.svg>

      {/* Wave 3 (front) */}
      <motion.svg
        style={{ y: reduceMotion ? 0 : wave3Y }}
        viewBox="0 0 1440 320"
        className="relative w-[120%] h-[160px]"
        preserveAspectRatio="none"
      >
        <path
          fill="#ffffff"
          d="M0,224L160,213.3C320,203,640,181,960,186.7C1280,192,1440,224,1440,224L1440,0L1280,0L960,0L640,0L320,0L160,0L0,0Z"
        />
      </motion.svg>
    </div>
  );
};

export default ParallaxWaves;
