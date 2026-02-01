import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import { Img } from "./Img";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ----------------------------------
   API
----------------------------------- */
const fetchFeaturedPosts = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params: { featured: true, limit: 5, sort: "newest" },
  });
  return res.data;
};

/* ----------------------------------
   SKELETON COMPONENT
----------------------------------- */
const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const FeaturedPostSkeleton = () => {
  return (
    <section className="flex flex-col lg:flex-row gap-8 mt-8">
      {/* MAIN POST */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <Skeleton className="w-full aspect-video rounded-3xl" />

        <div className="flex gap-4">
          <Skeleton className="w-10 h-4" />
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-20 h-4" />
        </div>

        <Skeleton className="w-3/4 h-8" />
        <Skeleton className="w-2/3 h-8" />
      </div>

      {/* SIDE POSTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="w-1/3 aspect-video rounded-xl" />

            <div className="flex-1 flex flex-col gap-2">
              <div className="flex gap-3">
                <Skeleton className="w-8 h-4" />
                <Skeleton className="w-20 h-4" />
                <Skeleton className="w-16 h-4" />
              </div>

              <Skeleton className="w-full h-5" />
              <Skeleton className="w-4/5 h-5" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ----------------------------------
   MAIN COMPONENT
----------------------------------- */
const FeaturedPost = () => {
  const containerRef = useRef(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: fetchFeaturedPosts,
  });

  /* ----------------------------------
     GSAP SCROLL ANIMATION
  ----------------------------------- */
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
            toggleActions: "play reverse play reverse",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [data]);

  /* ----------------------------------
     HOVER EFFECT
  ----------------------------------- */
  const handleHover = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.03,
      boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
      duration: 0.3,
    });
  };

  const handleLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      duration: 0.3,
    });
  };

  /* ----------------------------------
     STATES
  ----------------------------------- */
  if (isLoading) return <FeaturedPostSkeleton />;
  if (isError) return <p>Failed to load posts</p>;

  const posts = data?.posts || [];
  if (!posts.length) return null;

  const mainPost = posts[0];
  const sidePosts = posts.slice(1);

  /* ----------------------------------
     UI
  ----------------------------------- */
  return (
    <section
      ref={containerRef}
      className="flex flex-col lg:flex-row gap-8 mt-8"
    >
      {/* MAIN POST */}
      <Link
        to={`/${mainPost.slug}`}
        className="w-full lg:w-1/2 flex flex-col gap-4 animate-post rounded-xl"
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        {mainPost.img && (
          <Img
            src={mainPost.img}
            className="rounded-3xl aspect-video object-cover"
          />
        )}

        <div className="flex gap-4 text-sm">
          <span className="font-semibold">01.</span>
          <span className="text-blue-600">{mainPost.category}</span>
          <span className="text-gray-400">{format(mainPost.createdAt)}</span>
        </div>

        <h2 className="text-2xl lg:text-4xl font-bold">{mainPost.title}</h2>
      </Link>

      {/* SIDE POSTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        {sidePosts.map((post, index) => (
          <Link
            key={post._id}
            to={`/${post.slug}`}
            className="flex gap-4 animate-post rounded-xl"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            {post.img && (
              <Img
                src={post.img}
                className="w-1/3 aspect-video rounded-xl object-cover"
              />
            )}

            <div>
              <div className="flex gap-3 text-sm mb-1">
                <span className="font-semibold">
                  {String(index + 2).padStart(2, "0")}.
                </span>
                <span className="text-blue-600">{post.category}</span>
                <span className="text-gray-400">{format(post.createdAt)}</span>
              </div>

              <div className="font-semibold line-clamp-2">{post.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPost;
