import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import { Img } from "./Img";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- API ---------------- */
const fetchFeaturedPosts = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params: { featured: true, limit: 5, sort: "newest" },
  });

  return res.data;
};

/* ---------------- SKELETON ---------------- */
const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const FeaturedPostSkeleton = () => (
  <section className="flex flex-col lg:flex-row gap-8 mt-8">
    <div className="w-full lg:w-1/2 flex flex-col gap-4">
      <Skeleton className="w-full aspect-video rounded-3xl" />
      <Skeleton className="w-3/4 h-8" />
      <Skeleton className="w-2/3 h-8" />
    </div>

    <div className="w-full lg:w-1/2 flex flex-col gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="w-1/3 aspect-video rounded-xl" />
          <div className="flex-1 flex flex-col gap-2">
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-4/5 h-5" />
          </div>
        </div>
      ))}
    </div>
  </section>
);

/* ---------------- MAIN ---------------- */
const FeaturedPost = () => {
  const containerRef = useRef(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: fetchFeaturedPosts,
  });

  /* ---------------- GSAP ---------------- */
  useEffect(() => {
    if (!data || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const posts = containerRef.current.querySelectorAll(".animate-post");

      gsap.set(posts, { opacity: 0, y: 60 });

      posts.forEach((post, index) => {
        gsap.to(post, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: post,
            start: "top bottom",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [data]);

  /* ---------------- HOVER ---------------- */
  const handleHover = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.03,
      duration: 0.3,
    });
  };

  const handleLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.3,
    });
  };

  /* ---------------- STATES ---------------- */
  if (isLoading) return <FeaturedPostSkeleton />;
  if (isError) return <p>Failed to load posts</p>;

  const posts = data?.posts || [];
  if (!posts.length) return null;

  const mainPost = posts[0];
  const sidePosts = posts.slice(1);
  console.log(data);
  /* ---------------- UI ---------------- */
  return (
    <section
      ref={containerRef}
      className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.9fr] gap-10 mt-10"
    >
      {/* MAIN POST */}
      <Link
        to={`/${mainPost.slug}`}
        className="w-full lg:w-1/2 flex flex-col gap-4 animate-post"
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        {/* FIXED IMAGE HANDLING */}
        {(mainPost.img || mainPost.image) && (
          <div className="rounded-[32px] bg-gradient-to-br from-[#f7f2eb] to-[#efe7db] p-4 shadow-sm border border-[#ebe4da]">
            <div className="overflow-hidden rounded-[24px] flex items-center justify-center h-[480px]">
              <Img
                src={mainPost.img || mainPost.image}
                alt={mainPost.title}
                className="max-w-full max-h-full object-contain transition duration-700 hover:scale-105"
                noSize
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 text-sm text-gray-500 uppercase tracking-wide">
          <span className="font-semibold">01.</span>
          <span className="text-blue-600">{mainPost.category}</span>
          <span className="text-gray-400">{format(mainPost.createdAt)}</span>
        </div>

        <h2 className="text-3xl lg:text-5xl font-bold leading-tight tracking-tight text-[#1f1f1f]">
          {mainPost.title}
        </h2>
      </Link>

      {/* SIDE POSTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        {sidePosts.map((post, index) => (
          <Link
            key={post._id}
            to={`/${post.slug}`}
            className="flex gap-4 animate-post"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            {/* FIXED IMAGE HANDLING */}
            {(post.img || post.image) && (
              <div className="w-[280px] h-[170px] rounded-2xl bg-gradient-to-br from-[#f7f2eb] to-[#efe7db] p-2 shadow-sm border border-[#ebe4da] flex-shrink-0">
                <div className="overflow-hidden rounded-xl h-full flex items-center justify-center">
                  <Img
                    src={post.img || post.image}
                    alt={post.title}
                    className="max-w-full max-h-full object-contain transition duration-500 hover:scale-105"
                    noSize
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex gap-3 text-sm mb-1">
                <span className="font-semibold">
                  {String(index + 2).padStart(2, "0")}.
                </span>
                <span className="text-blue-600">{post.category}</span>
                <span className="text-gray-400">{format(post.createdAt)}</span>
              </div>

              <div className="font-semibold text-xl leading-snug line-clamp-2 text-[#1f1f1f]">
                {post.title}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPost;
