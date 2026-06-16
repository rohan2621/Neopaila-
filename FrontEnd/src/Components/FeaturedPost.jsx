import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import { Img } from "./Img";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const fetchFeaturedPosts = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params: { featured: true, limit: 5, sort: "newest" },
  });
  return res.data;
};

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const FeaturedPostSkeleton = () => (
  <section className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 mt-10 items-start">
    <div className="flex flex-col gap-4">
      <Skeleton className="w-full h-[320px] rounded-2xl" />
      <Skeleton className="w-3/4 h-6" />
      <Skeleton className="w-1/2 h-5" />
    </div>
    <div className="flex flex-col gap-0">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex gap-4 py-4 border-b border-gray-100 last:border-0"
        >
          <Skeleton className="w-[150px] h-[100px] rounded-xl flex-shrink-0" />
          <div className="flex-1 flex flex-col gap-2 pt-1">
            <Skeleton className="w-2/5 h-3.5" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-4/5 h-4" />
          </div>
        </div>
      ))}
    </div>
  </section>
);

const categoryColors = {
  general: "bg-blue-50   text-blue-700",
  heritage: "bg-amber-50  text-amber-700",
  history: "bg-green-50  text-green-700",
  culture: "bg-purple-50 text-purple-700",
  travel: "bg-orange-50 text-orange-700",
  festival: "bg-pink-50   text-pink-700",
  nature: "bg-teal-50   text-teal-700",
};

const CategoryPill = ({ label }) => {
  const colorClass =
    categoryColors[label?.toLowerCase()] ?? "bg-blue-50 text-blue-700";
  return (
    <span
      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wide ${colorClass}`}
    >
      {label}
    </span>
  );
};

const FeaturedPost = () => {
  const containerRef = useRef(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: fetchFeaturedPosts,
  });

  useEffect(() => {
    if (!data || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const posts = containerRef.current.querySelectorAll(".animate-post");
      gsap.set(posts, { opacity: 0, y: 28 });
      posts.forEach((post, i) => {
        gsap.to(post, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          delay: i * 0.08,
          scrollTrigger: { trigger: post, start: "top 92%" },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, [data]);

  const handleHover = (e) =>
    gsap.to(e.currentTarget, {
      scale: 1.015,
      duration: 0.3,
      ease: "power2.out",
    });

  const handleLeave = (e) =>
    gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" });

  if (isLoading) return <FeaturedPostSkeleton />;
  if (isError)
    return <p className="text-gray-400 text-sm mt-10">Failed to load posts.</p>;

  const posts = data?.posts || [];
  if (!posts.length) return null;

  const [mainPost, ...sidePosts] = posts;

  return (
    <section
      ref={containerRef}
      className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 mt-10 items-start"
    >
      {/* ── MAIN POST ── */}
      <Link
        to={`/${mainPost.slug}`}
        className="flex flex-col gap-3 animate-post group"
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        {(mainPost.img || mainPost.image) && (
          <div className="rounded-2xl overflow-hidden bg-[#f3ede4] border border-[#e8dfd2] w-full">
            <Img
              src={mainPost.img || mainPost.image}
              alt={mainPost.title}
              className="w-full h-auto object-contain transition duration-500 group-hover:scale-[1.03]"
              noSize
            />
          </div>
        )}

        <div className="flex items-center gap-2.5">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            01.
          </span>
          <CategoryPill label={mainPost.category} />
          <span className="text-xs text-gray-400">
            {format(mainPost.createdAt)}
          </span>
        </div>

        <h2 className="text-2xl lg:text-[1.75rem] font-semibold leading-snug tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
          {mainPost.title}
        </h2>

        {mainPost.desc && (
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
            {mainPost.desc}
          </p>
        )}
      </Link>

      {/* ── SIDE POSTS ── */}
      <div className="flex flex-col divide-y divide-gray-100 self-start">
        {sidePosts.map((post, index) => (
          <Link
            key={post._id}
            to={`/${post.slug}`}
            className="flex gap-4 py-4 first:pt-0 last:pb-0 animate-post group"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            {(post.img || post.image) && (
              <div className="w-[150px] h-[100px] rounded-xl overflow-hidden bg-[#f3ede4] border border-[#e8dfd2] flex-shrink-0 transition duration-300 group-hover:scale-[1.04]">
                <Img
                  src={post.img || post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  noSize
                />
              </div>
            )}

            <div className="flex flex-col gap-1.5 pt-0.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  {String(index + 2).padStart(2, "0")}.
                </span>
                <CategoryPill label={post.category} />
                <span className="text-xs text-gray-400">
                  {format(post.createdAt)}
                </span>
              </div>

              <p className="text-[15px] font-medium leading-snug line-clamp-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                {post.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPost;
