import React, { useState } from "react";
import PostList from "../Components/PostList";
import SideMenu from "../Components/SideMenu";

export const PostListPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="px-5">
      <h1 className="mb-8 text-2xl">Development Blog</h1>

      <button
        onClick={() => setOpen((p) => !p)}
        className="md:hidden bg-[#540000] text-sm mb-4 text-white px-4 py-2 rounded-2xl"
      >
        {open ? "Close" : "Filter or Search"}
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        {/* POSTS */}
        <div className="w-full md:w-3/4">
          <PostList />
        </div>

        {/* SIDEBAR */}
        <div
          className={`${open ? "block" : "hidden"} md:block w-full md:w-1/4`}
        >
          <SideMenu />
        </div>
      </div>
    </div>
  );
};
