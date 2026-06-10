import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Img } from "./Img";

gsap.registerPlugin(ScrollTrigger);

const NeoPailaTestimonial = () => {
  const sectionRef = useRef(null);
  const topWavesRefs = useRef([]);
  const bottomWavesRefs = useRef([]);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const buttonRef = useRef(null);
  const quoteTextRef = useRef(null);
  const particlesRef = useRef([]);

  const [counts, setCounts] = useState([0, 0, 0]);

  const stats = [
    { value: 240, suffix: "+", label: "Stories Published" },
    { value: 77, suffix: "", label: "Districts Covered" },
    { value: 12, suffix: "K+", label: "Monthly Readers" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── 1. WAVES ── */
      topWavesRefs.current.forEach((g, i) => {
        if (!g) return;
        gsap.to(g, {
          x: -1440,
          duration: 18 + i * 5,
          ease: "linear",
          repeat: -1,
        });
      });
      bottomWavesRefs.current.forEach((g, i) => {
        if (!g) return;
        gsap.to(g, {
          x: -1440,
          duration: 16 + i * 4,
          ease: "linear",
          repeat: -1,
        });
      });

      /* ── 2. FLOATING PARTICLES ── */
      particlesRef.current.forEach((p) => {
        if (!p) return;
        gsap.to(p, {
          y: `random(-28, 28)`,
          x: `random(-14, 14)`,
          rotation: `random(-20, 20)`,
          duration: `random(3, 6)`,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      /* ── 3. LEFT block entrance ── */
      if (leftRef.current) {
        const els = leftRef.current.querySelectorAll(
          ".quote-mark, .quote-text, .author-row, .cta-btn, .stat-item",
        );
        gsap.fromTo(
          els,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 2.5,
            stagger: 0.25,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: leftRef.current,
              start: "top 85%",
              end: "bottom 60%",
              scrub: 1.5,
            },
          },
        );
      }

      /* ── 4. Right card entrance ── */
      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current,
          { opacity: 0, x: 70, y: 20, rotateY: 8 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotateY: 0,
            duration: 2.8,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: rightRef.current,
              start: "top 85%",
              end: "bottom 60%",
              scrub: 1.5,
            },
          },
        );
      }

      /* ── 5. Counter animation ── */
      stats.forEach(({ value }, i) => {
        const obj = { val: 0 };
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: value,
              duration: 3,
              ease: "power2.out",
              onUpdate: () => {
                setCounts((prev) => {
                  const next = [...prev];
                  next[i] = Math.floor(obj.val);
                  return next;
                });
              },
            });
          },
        });
      });

      /* ── 6. Button hover ── */
      const btn = buttonRef.current;
      if (btn) {
        btn.addEventListener("mouseenter", () =>
          gsap.to(btn, { scale: 1.06, duration: 0.25, ease: "power2.out" }),
        );
        btn.addEventListener("mouseleave", () =>
          gsap.to(btn, { scale: 1.0, duration: 0.25, ease: "power2.inOut" }),
        );
      }

      /* ── 7. Right card hover ── */
      const card = rightRef.current;
      if (card) {
        card.addEventListener("mouseenter", () =>
          gsap.to(card, {
            y: -6,
            boxShadow: "0 24px 48px rgba(220,38,38,0.14)",
            duration: 0.3,
            ease: "power2.out",
          }),
        );
        card.addEventListener("mouseleave", () =>
          gsap.to(card, {
            y: 0,
            boxShadow: "0 8px 24px rgba(0,0,0,0.07)",
            duration: 0.3,
            ease: "power2.inOut",
          }),
        );
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const particles = [
    {
      top: "12%",
      left: "8%",
      width: 10,
      height: 10,
      background: "rgba(220,38,38,0.18)",
      borderRadius: "50%",
    },
    {
      top: "22%",
      left: "18%",
      width: 6,
      height: 6,
      background: "rgba(220,38,38,0.12)",
      borderRadius: "50%",
    },
    {
      top: "60%",
      left: "5%",
      width: 14,
      height: 14,
      background: "rgba(251,191,36,0.20)",
      borderRadius: "50%",
    },
    {
      top: "75%",
      right: "10%",
      width: 8,
      height: 8,
      background: "rgba(220,38,38,0.15)",
      borderRadius: "50%",
    },
    {
      top: "35%",
      right: "6%",
      width: 12,
      height: 12,
      background: "rgba(220,38,38,0.10)",
      borderRadius: "50%",
    },
    {
      top: "50%",
      right: "18%",
      width: 5,
      height: 5,
      background: "rgba(251,191,36,0.25)",
      borderRadius: "50%",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#fff6f5]"
      style={{ marginTop: "2rem" }}
    >
      {/* FLOATING PARTICLES */}
      {particles.map((p, i) => (
        <div
          key={i}
          ref={(el) => (particlesRef.current[i] = el)}
          className="absolute pointer-events-none"
          style={{ ...p, position: "absolute" }}
        />
      ))}

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
              {[0, 1440].map((offset) => (
                <path
                  key={offset}
                  d={`M${offset},80 C${offset + 120},20 ${offset + 240},120 ${offset + 360},80 C${offset + 480},40 ${offset + 600},110 ${offset + 720},80 C${offset + 840},50 ${offset + 960},120 ${offset + 1080},80 C${offset + 1200},40 ${offset + 1320},100 ${offset + 1440},80 L${offset + 1440},0 L${offset},0 Z`}
                  fill={["#7f1d1d", "#991b1b", "#b91c1c"][i]}
                  opacity={[0.22, 0.32, 1][i]}
                />
              ))}
            </g>
          </svg>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="relative px-6 md:px-12 lg:px-20 py-16 md:py-24">
        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(45deg,#dc2626_1px,transparent_1px)] [background-size:44px_44px] pointer-events-none" />

        {/* Radial red glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(220,38,38,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div ref={leftRef} className="max-w-xl">
            <div className="quote-mark">
              <span
                className="block text-[80px] leading-none text-red-600 font-serif select-none"
                style={{
                  fontFamily: "Georgia, serif",
                  lineHeight: 0.8,
                  marginBottom: "12px",
                }}
              >
                "
              </span>
            </div>

            <p
              ref={quoteTextRef}
              className="quote-text text-lg md:text-xl leading-relaxed text-gray-800"
            >
              At Neopaila, we believe that even the smallest step can lead to
              meaningful change. What began as a simple vision to showcase
              Nepal's{" "}
              <span className="text-red-600 font-semibold">
                culture, creativity and untold stories
              </span>{" "}
              has grown into a platform where diverse voices are heard and ideas
              come to life. Through every story we share and every connection we
              foster, our mission is to inspire authentic expression; one step
              at a time.
            </p>

            <div className="flex justify-end mt-1 mb-4">
              <span
                className="text-[56px] leading-none text-red-200 font-serif select-none"
                style={{ fontFamily: "Georgia, serif" }}
              >
                "
              </span>
            </div>

            <div className="author-row flex items-center gap-4 mt-2">
              <div className="relative">
                <Img
                  src="admin.png"
                  alt="Kritika Pandey"
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-red-200 ring-offset-2"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-[15px]">
                  Kritika Pandey
                </p>
                <p className="text-sm text-red-500 font-medium">
                  Founder · NeoPaila
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex gap-6 mt-8 mb-8">
              {stats.map(({ suffix, label }, i) => (
                <div key={label} className="stat-item flex flex-col">
                  <span className="text-2xl font-extrabold text-gray-900 leading-none">
                    {counts[i]}
                    {suffix}
                  </span>
                  <span className="text-[11px] text-gray-400 mt-1 tracking-wide">
                    {label}
                  </span>
                  <span className="mt-2 h-[2px] w-6 rounded-full bg-red-400" />
                </div>
              ))}
            </div>

            <motion.p className="text-[16.5px] mb-4 italic text-gray-400">
              Questions, ideas, collaborations?
            </motion.p>

            <div className="cta-btn">
              <Link
                ref={buttonRef}
                to="/contact-us"
                className="inline-flex items-center gap-2 rounded-full bg-red-600 px-7 py-3 text-sm font-semibold text-white shadow-md"
                style={{ boxShadow: "0 4px 18px rgba(220,38,38,0.30)" }}
              >
                Drop us a message
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div ref={rightRef} style={{ perspective: "800px" }}>
            <div
              className="relative rounded-3xl bg-white p-8 md:p-10"
              style={{
                boxShadow: "0 8px 24px rgba(0,0,0,0.07)",
                border: "1px solid rgba(220,38,38,0.12)",
              }}
            >
              <div
                className="absolute top-0 left-8 right-8 h-[3px] rounded-b-full"
                style={{
                  background:
                    "linear-gradient(to right, #dc2626, #f87171, #fbbf24)",
                }}
              />

              <span
                className="text-[52px] leading-none text-amber-400 font-serif select-none"
                style={{ fontFamily: "Georgia, serif", lineHeight: 0.75 }}
              >
                "
              </span>

              <p className="mt-4 text-base md:text-lg leading-relaxed text-gray-700">
                NeoPaila allows communities and visitors to understand the
                complete story behind cultural spaces while removing{" "}
                <span className="font-semibold text-gray-900">
                  language and accessibility barriers.
                </span>
              </p>

              <div className="mt-8 flex items-center gap-4">
                <Img
                  src="co-founder.jpg"
                  alt="Rohan Timalsina"
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-amber-200"
                />
                <div>
                  <p className="font-bold text-gray-900 text-sm">
                    Rohan Timalsina
                  </p>
                  <p className="text-xs text-gray-400">Co-Founder · NeoPaila</p>
                </div>
                <div className="ml-auto flex gap-[3px]">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              <div
                className="absolute bottom-4 right-4 w-20 h-20 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(220,38,38,0.07) 0%, transparent 70%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM WAVES */}
      <div className="relative h-[160px] overflow-hidden bg-[#fff6f5]">
        {[0, 1].map((i) => (
          <svg
            key={i}
            className="absolute bottom-0 left-0 w-[200%] h-[160px]"
            viewBox="0 0 2880 160"
            preserveAspectRatio="none"
          >
            <g ref={(el) => (bottomWavesRefs.current[i] = el)}>
              {[0, 1440].map((offset) => (
                <path
                  key={offset}
                  d={`M${offset},60 C${offset + 120},120 ${offset + 240},20 ${offset + 360},60 C${offset + 480},100 ${offset + 600},30 ${offset + 720},65 C${offset + 840},110 ${offset + 960},25 ${offset + 1080},60 C${offset + 1200},100 ${offset + 1320},35 ${offset + 1440},60 L${offset + 1440},160 L${offset},160 Z`}
                  fill={["#fee2e2", "#ffffff"][i]}
                  opacity={[0.65, 1][i]}
                />
              ))}
            </g>
          </svg>
        ))}
      </div>
    </section>
  );
};

export default NeoPailaTestimonial;
