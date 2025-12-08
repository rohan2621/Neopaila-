import React from "react";
import { Img } from "./Img";
import { Link, useParams } from "react-router";
import { format } from "timeago.js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const PostListItem = ({ post }) => {
  return (
    <div className="flex flex-col mb-12 xl:flex-row gap-6 xl:gap-8">
      {/* Image */}
      {post.img && (
        <div className="w-full xl:w-1/3">
          <Img
            src={post.img}
            alt="Post thumbnail"
            className="w-full h-64 sm:h-80 xl:h-full rounded-2xl object-cover"
          />
        </div>
      )}

      {/* Details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link
          to={`/${post.slug}`}
          className="text-lg sm:text-xl md:text-2xl font-semibold hover:underline"
        >
          {post.title}
        </Link>

        <div className="flex flex-wrap items-center gap-1 text-gray-500 text-xs sm:text-sm">
          <span>Written by</span>
          <Link
            className="text-blue-800 hover:underline"
            to={`/posts?author=${post.user?.username}`}
          >
            {post.user?.username || "Unknown Author"}
          </Link>
          <span>on</span>
          <Link
            to={`/posts?cat=${post.category}`}
            className="text-blue-800 hover:underline"
          >
            {post.category}
          </Link>

          <span>{format(post.createdAt)}</span>
        </div>

        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          {post.desc}
        </p>

        <Link
          to={`/${post.slug}`}
          className="underline text-blue-800 text-sm hover:text-blue-600"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;
