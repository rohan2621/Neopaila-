import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { useReducedMotion } from "framer-motion";

const SmoothScroll = ({ children }) => {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      // 🧈 Core smoothness
      duration: 1.6, // higher = smoother
      lerp: 0.08, // magic smooth factor (sweet spot)
      easing: (t) => 1 - Math.pow(1 - t, 4),

      // 🖱️ Input tuning
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.9, // prevents aggressive scroll
      touchMultiplier: 1.5,

      // 🧠 UX polish
      normalizeWheel: true,
      infinite: false,
    });

    let rafId;

    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reduceMotion]);

  return children;
};

export default SmoothScroll;
