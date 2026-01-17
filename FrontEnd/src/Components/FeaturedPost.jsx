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

const FeaturedPost = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: fetchFeaturedPosts,
  });

  const containerRef = useRef(null);

  useEffect(() => {
    if (!data || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const allPosts = containerRef.current.querySelectorAll(".animate-post");

      // Initial state
      gsap.set(allPosts, { opacity: 0, y: 60 });

      // Animate each post individually when it enters viewport
      allPosts.forEach((post, index) => {
        gsap.to(post, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: post,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play reverse play reverse",
          },
          delay: index * 0.1,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [data]);

  // Hover animations
  const handleHover = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.03,
      boxShadow: "0px 10px 20px rgba(0,0,0,0.15)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      boxShadow: "0px 0px 0px rgba(0,0,0,0)",
      duration: 0.3,
      ease: "power2.inOut",
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading posts</p>;

  const posts = data?.posts || [];
  if (!posts.length) return null;

  const mainPost = posts[0];
  const sidePosts = posts.slice(1);

  return (
    <section
      ref={containerRef}
      className="flex flex-col lg:flex-row gap-8 mt-8"
    >
      {/* MAIN POST */}
      <Link
        to={`/${mainPost.slug}`}
        className="w-full lg:w-1/2 flex flex-col gap-4 animate-post main-post rounded-xl overflow-hidden"
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
        <div className="text-2xl lg:text-4xl font-bold">{mainPost.title}</div>
      </Link>

      {/* SIDE POSTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        {sidePosts.map((post, index) => (
          <Link
            to={`/${post.slug}`}
            key={post._id}
            className="flex gap-4 animate-post side-post rounded-xl overflow-hidden"
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
