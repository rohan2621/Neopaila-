import React from "react";
import PostListItem from "./PostListItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from "framer-motion";

// fetch posts
const fetchPost = async (pageParam, searchParams) => {
  const params = Object.fromEntries([...searchParams]);
  params.page = pageParam;
  params.limit = 3;

  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params,
  });

  return res.data;
};

const PostList = () => {
  const [searchParams] = useSearchParams();

  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ["posts", searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchPost(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error fetching posts</p>;

  const allPosts = data?.pages?.flatMap((p) => p.posts) || [];

  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4 className="text-center">Loading more posts...</h4>}
      endMessage={
        <p className="text-center font-medium">
          <b>All posts loaded!</b>
        </p>
      }
    >
      {/* WRAPPER TO PREVENT X-OVERFLOW */}
      <div className="flex flex-col gap-6 min-w-0 overflow-x-hidden">
        {allPosts.map((post, index) => {
          const fromLeft = index % 2 === 0;

          return (
            <motion.div
              key={post._id}
              className="overflow-hidden min-w-0"
              initial={{
                opacity: 0,
                x: fromLeft ? -80 : 80,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: fromLeft ? -80 : 80,
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
              viewport={{
                once: false,
                amount: 0.3,
              }}
            >
              <PostListItem post={post} />
            </motion.div>
          );
        })}
      </div>
    </InfiniteScroll>
  );
};

export default PostList;
