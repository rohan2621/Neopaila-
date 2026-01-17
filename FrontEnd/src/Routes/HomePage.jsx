import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "@fortawesome/fontawesome-free/css/all.min.css";

import MainCate from "../Components/MainCate";
import FeaturedPost from "../Components/FeaturedPost";
import NeoPailaTestimonial from "../Components/NeoPailaTestimonial";
import NeoPailaFooter from "../Components/NeoPailaFooter";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ---------------- Heading Animation ----------------
      const headingTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".heading",
          start: "top 90%",
          toggleActions: "play reverse play reverse",
        },
      });

      headingTimeline
        // Animate heading container
        .from(".heading", {
          autoAlpha: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
        })
        // Animate "Stories"
        .from(
          ".red-word",
          {
            scale: 0.8,
            autoAlpha: 0,
            y: -10,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        )
        // Animate "World"
        .from(
          ".blue-word",
          {
            scale: 0.8,
            autoAlpha: 0,
            y: -10,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.6"
        );

      // ---------------- Infinite Animations ----------------
      gsap.to(".circular-text", {
        rotation: 360,
        duration: 12,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });

      gsap.to(".arrow", {
        y: -6,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // ---------------- Section Animations ----------------
      const sections = gsap.utils.toArray(".scroll-section");

      sections.forEach((section) => {
        const children = section.querySelectorAll(".animate-child");

        // Fade in section
        gsap.fromTo(
          section,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              toggleActions: "play reverse play reverse",
              invalidateOnRefresh: true,
            },
          }
        );

        // Fade in children one by one
        if (children.length) {
          gsap.fromTo(
            children,
            { autoAlpha: 0, y: 40 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-8 md:gap-12">
      <div className="px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
        {/* Breadcrumbs */}
        <div className="flex gap-2 text-sm px-4 md:px-12 pt-6 scroll-section animate-child">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span className="text-[10px] flex items-center">●</span>
          <span className="text-blue-900">Blogs and Articles</span>
        </div>

        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start xl:items-center justify-between gap-10 px-4 md:px-12 py-10 scroll-section">
          <h1
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
            className="heading text-3xl sm:text-4xl md:text-5xl text-center lg:text-left leading-tight max-w-[700px]"
          >
            Create{" "}
            <span className="red-word text-red-600 inline-block">Stories</span>
            <span className="block relative ml-24 mt-6">
              from Around the{" "}
              <span className="blue-word text-blue-700 inline-block">
                World
              </span>
            </span>
          </h1>

          <Link
            to="/write"
            className="relative flex justify-center items-center mx-auto lg:mx-0 w-[240px] h-[240px]"
          >
            <svg
              className="absolute w-full h-full drop-shadow-md"
              viewBox="0 0 100 100"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0"
                />
              </defs>
              <text
                className="circular-text"
                fontSize="7"
                fill="#111"
                fontWeight="bold"
              >
                <textPath xlinkHref="#circlePath">
                  Discover Your Own stories with Others &nbsp; NeoPaila
                </textPath>
              </text>
            </svg>

            <svg
              className="arrow absolute rotate-[221deg] w-10 h-10 text-red-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="2" x2="12" y2="18" />
              <polyline points="5 11 12 18 19 11" />
            </svg>
          </Link>
        </div>

        {/* Content */}
        <div className="px-4 md:px-12 lg:px-20 flex flex-col gap-8">
          <div className="scroll-section animate-child">
            <MainCate />
          </div>

          <div className="scroll-section animate-child">
            <FeaturedPost />
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="scroll-section animate-child">
        <NeoPailaTestimonial />
      </div>

      {/* Footer */}
      <div className="scroll-section animate-child">
        <NeoPailaFooter />
      </div>
    </div>
  );
};

export default HomePage;
