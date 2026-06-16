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
  <section className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.9fr] gap-8 mt-10">
    <div className="flex flex-col gap-4">
      <Skeleton className="w-full aspect-[4/3] rounded-3xl" />
      <Skeleton className="w-3/4 h-7" />
      <Skeleton className="w-1/2 h-7" />
    </div>
    <div className="flex flex-col gap-0">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex gap-4 py-4 border-b border-gray-100 last:border-0"
        >
          <Skeleton className="w-[130px] h-[90px] rounded-2xl flex-shrink-0" />
          <div className="flex-1 flex flex-col gap-2 pt-1">
            <Skeleton className="w-1/3 h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-4/5 h-4" />
          </div>
        </div>
      ))}
    </div>
  </section>
);

const CategoryPill = ({ label, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    orange: "bg-orange-50 text-orange-700",
    purple: "bg-purple-50 text-purple-700",
  };
  return (
    <span
      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${colors[color] ?? colors.blue}`}
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
      gsap.set(posts, { opacity: 0, y: 32 });
      posts.forEach((post, i) => {
        gsap.to(post, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: i * 0.08,
          scrollTrigger: { trigger: post, start: "top 90%" },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [data]);

  const handleHover = (e) =>
    gsap.to(e.currentTarget, {
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
    });

  const handleLeave = (e) =>
    gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" });

  if (isLoading) return <FeaturedPostSkeleton />;
  if (isError)
    return <p className="text-gray-400 text-sm">Failed to load posts.</p>;

  const posts = data?.posts || [];
  if (!posts.length) return null;

  const [mainPost, ...sidePosts] = posts;

  return (
    <section
      ref={containerRef}
      className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.9fr] gap-8 mt-10"
    >
      {/* MAIN POST */}
      <Link
        to={`/${mainPost.slug}`}
        className="flex flex-col gap-3 animate-post group"
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        {(mainPost.img || mainPost.image) && (
          <div className="rounded-3xl overflow-hidden bg-[#f3ede4] border border-[#e8dfd2] aspect-[4/3]">
            <Img
              src={mainPost.img || mainPost.image}
              alt={mainPost.title}
              className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              noSize
            />
          </div>
        )}

        <div className="flex items-center gap-2.5 mt-1">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            01.
          </span>
          <CategoryPill label={mainPost.category} />
          <span className="text-xs text-gray-400">
            {format(mainPost.createdAt)}
          </span>
        </div>

        <h2 className="text-3xl lg:text-[2.2rem] font-semibold leading-[1.2] tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
          {mainPost.title}
        </h2>
      </Link>

      {/* SIDE POSTS */}
      <div className="flex flex-col divide-y divide-gray-100">
        {sidePosts.map((post, index) => (
          <Link
            key={post._id}
            to={`/${post.slug}`}
            className="flex gap-4 py-4 first:pt-0 last:pb-0 animate-post group"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            {(post.img || post.image) && (
              <div className="w-[130px] h-[90px] rounded-2xl overflow-hidden bg-[#f3ede4] border border-[#e8dfd2] flex-shrink-0 transition duration-300 group-hover:scale-[1.04]">
                <Img
                  src={post.img || post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  noSize
                />
              </div>
            )}

            <div className="flex flex-col gap-1.5 pt-0.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  {String(index + 2).padStart(2, "0")}.
                </span>
                <CategoryPill label={post.category} />
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {format(post.createdAt)}
                </span>
              </div>

              <p className="text-[15px] font-medium leading-snug line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
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
