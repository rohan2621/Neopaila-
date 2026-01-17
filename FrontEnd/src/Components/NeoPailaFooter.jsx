import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NeoPailaFooter = () => {
  const containerRef = useRef(null);
  const linkRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer entrance animation
      gsap.fromTo(
        containerRef.current,
        { autoAlpha: 0, y: 60 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );

      // Hover animation for links
      linkRefs.current.forEach((link) => {
        if (!link) return;
        link.addEventListener("mouseenter", () => {
          gsap.to(link, {
            scale: 1.05,
            color: "#b91c1c",
            duration: 0.3,
            ease: "power2.out",
          });
        });
        link.addEventListener("mouseleave", () => {
          gsap.to(link, {
            scale: 1,
            color: "",
            duration: 0.3,
            ease: "power2.inOut",
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Helper to add ref to links
  const addLinkRef = (el) => {
    if (el && !linkRefs.current.includes(el)) {
      linkRefs.current.push(el);
    }
  };

  return (
    <footer ref={containerRef} className="bg-[#fffefc] text-[#7a2e2e]">
      <div className="px-6 md:px-12 lg:px-20 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-semibold text-[#b91c1c]">NeoPaila</h2>
            <p className="mt-4 text-sm leading-relaxed max-w-xs">
              NeoPaila preserves cultural stories and heritage through authentic
              voices, helping visitors understand the soul behind historic
              places.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#b91c1c]">
              Explore
            </h3>
            <ul className="space-y-3 text-sm">
              {["/about", "/stories", "/places", "/collaborate"].map(
                (path, i) => (
                  <li key={i}>
                    <Link
                      ref={addLinkRef}
                      to={path}
                      className="hover:text-[#b91c1c] transition"
                    >
                      {
                        [
                          "About Us",
                          "Stories",
                          "Heritage Places",
                          "Collaborate",
                        ][i]
                      }
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#b91c1c]">
              Support
            </h3>
            <ul className="space-y-3 text-sm">
              {["/contact", "/faq", "/privacy", "/terms"].map((path, i) => (
                <li key={i}>
                  <Link
                    ref={addLinkRef}
                    to={path}
                    className="hover:text-[#b91c1c] transition"
                  >
                    {
                      [
                        "Contact",
                        "FAQ",
                        "Privacy Policy",
                        "Terms & Conditions",
                      ][i]
                    }
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#b91c1c]">
              Get in Touch
            </h3>
            <p className="text-sm leading-relaxed">Kathmandu, Nepal</p>
            <p className="mt-2 text-sm">
              Email:{" "}
              <a
                ref={addLinkRef}
                href="mailto:info@neopaila.com"
                className="hover:text-[#b91c1c] transition"
              >
                info@neopaila.com
              </a>
            </p>
            <div className="mt-4 flex gap-4">
              {["Facebook", "Instagram", "YouTube"].map((item, i) => (
                <a
                  key={i}
                  ref={addLinkRef}
                  href="#"
                  className="text-sm hover:text-[#b91c1c] transition"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#e7c7c4]" />

      {/* Bottom Bar */}
      <div className="px-6 md:px-12 lg:px-20 py-6 flex flex-col md:flex-row items-center justify-between text-xs">
        <p>© {new Date().getFullYear()} NeoPaila. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Crafted with care for culture & heritage</p>
      </div>
    </footer>
  );
};

export default NeoPailaFooter;
