import React, { useRef, useEffect } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NeoPailaTestimonial = () => {
  const topWavesRefs = useRef([]);
  const bottomWavesRefs = useRef([]);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate top waves
      topWavesRefs.current.forEach((waveGroup, i) => {
        if (!waveGroup) return;
        gsap.to(waveGroup, {
          x: -1440,
          duration: 20 + i * 4,
          ease: "linear",
          repeat: -1,
        });
      });

      // Animate bottom waves
      bottomWavesRefs.current.forEach((waveGroup, i) => {
        if (!waveGroup) return;
        gsap.to(waveGroup, {
          x: -1440,
          duration: 18 + i * 3,
          ease: "linear",
          repeat: -1,
        });
      });

      // Fade-in and fade-out clearly
      [leftRef.current, rightRef.current].forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%", // fade in when top of element reaches 85% viewport
              end: "bottom 10%", // fade out as bottom leaves near 10% of viewport
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      // Hover animation for button
      if (buttonRef.current) {
        buttonRef.current.addEventListener("mouseenter", () => {
          gsap.to(buttonRef.current, {
            scale: 1.05,
            backgroundColor: "#b91c1c",
            duration: 0.3,
            ease: "power2.out",
          });
        });
        buttonRef.current.addEventListener("mouseleave", () => {
          gsap.to(buttonRef.current, {
            scale: 1,
            backgroundColor: "#dc2626",
            duration: 0.3,
            ease: "power2.inOut",
          });
        });
      }

      // Hover animation for right card
      if (rightRef.current) {
        rightRef.current.addEventListener("mouseenter", () => {
          gsap.to(rightRef.current, {
            scale: 1.02,
            boxShadow: "0px 15px 25px rgba(0,0,0,0.15)",
            duration: 0.3,
            ease: "power2.out",
          });
        });
        rightRef.current.addEventListener("mouseleave", () => {
          gsap.to(rightRef.current, {
            scale: 1,
            boxShadow: "0px 0px 0px rgba(0,0,0,0)",
            duration: 0.3,
            ease: "power2.inOut",
          });
        });
      }

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden mt-4 bg-[#fff6f5]">
      {/* TOP WAVES */}
      <div className="relative h-[140px] overflow-hidden">
        {[0, 1, 2].map((i) => (
          <svg
            key={i}
            className="absolute top-0 left-0 w-[200%] h-[140px]"
            viewBox="0 0 2880 140"
            preserveAspectRatio="none"
          >
            <g ref={(el) => (topWavesRefs.current[i] = el)}>
              <path
                d="M0,80 C120,20 240,120 360,80 C480,40 600,110 720,80 C840,50 960,120 1080,80 C1200,40 1320,100 1440,80 L1440,0 L0,0 Z"
                fill={["#7f1d1d", "#991b1b", "#b91c1c"][i]}
                opacity={[0.25, 0.35, 1][i]}
              />
              <path
                d="M1440,80 C1560,20 1680,120 1800,80 C1920,40 2040,110 2160,80 C2280,50 2400,120 2520,80 C2640,40 2760,100 2880,80 L2880,0 L1440,0 Z"
                fill={["#7f1d1d", "#991b1b", "#b91c1c"][i]}
                opacity={[0.25, 0.35, 1][i]}
              />
            </g>
          </svg>
        ))}
      </div>

      {/* CONTENT */}
      <div className="relative px-6 md:px-12 lg:px-20 py-20">
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(45deg,#dc2626_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="relative grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div ref={leftRef} className="max-w-xl">
            <span className="text-5xl text-red-600 font-serif">“</span>
            <p className="mt-6 text-lg md:text-xl leading-relaxed text-gray-800">
              When people come to visit tourist and heritage sites, they often
              cannot find those who can explain the stories behind these places
              in detail. NeoPaila bridges that gap by preserving authentic
              voices and narratives.
            </p>
            <div className="mt-6">
              <p className="font-semibold text-gray-900">Kuman Gurung</p>
              <p className="text-sm text-gray-600">Former Cultural Officer</p>
            </div>
            <Link
              ref={buttonRef}
              to="/collaborate"
              className="inline-block mt-8 rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white transition"
            >
              Collaborate with us
            </Link>
          </div>

          {/* RIGHT */}
          <div ref={rightRef} className="relative">
            <div className="rounded-2xl bg-white p-8 shadow-xl border border-red-200">
              <span className="text-4xl text-amber-400 font-serif">“</span>
              <p className="mt-4 text-base leading-relaxed text-gray-700">
                NeoPaila allows communities and visitors to understand the
                complete story behind cultural spaces while removing language
                and accessibility barriers.
              </p>
              <div className="mt-6">
                <p className="font-semibold text-gray-900">Suresh Tuladhar</p>
                <p className="text-sm text-gray-600">
                  Priest, Karyabinayak Temple
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM WAVES */}
      <div className="relative h-[180px] overflow-hidden bg-[#fff6f5]">
        {[0, 1].map((i) => (
          <svg
            key={i}
            className="absolute bottom-0 left-0 w-[200%] h-[180px]"
            viewBox="0 0 2880 180"
            preserveAspectRatio="none"
          >
            <g ref={(el) => (bottomWavesRefs.current[i] = el)}>
              <path
                d="M0,60 C120,120 240,20 360,60 C480,100 600,40 720,70 C840,110 960,30 1080,60 C1200,100 1320,40 1440,60 L1440,180 L0,180 Z"
                fill={["#fee2e2", "#ffffff"][i]}
                opacity={[0.6, 1][i]}
              />
              <path
                d="M1440,60 C1560,120 1680,20 1800,60 C1920,100 2040,40 2160,70 C2280,110 2400,30 2520,60 C2640,100 2760,40 2880,60 L2880,180 L1440,180 Z"
                fill={["#fee2e2", "#ffffff"][i]}
                opacity={[0.6, 1][i]}
              />
            </g>
          </svg>
        ))}
      </div>
    </section>
  );
};

export default NeoPailaTestimonial;
