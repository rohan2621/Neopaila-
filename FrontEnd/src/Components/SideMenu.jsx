import React from "react";
import { Search } from "./Search";
import { Link, useSearchParams } from "react-router-dom";

const SideMenu = () => {
  const [params, setParams] = useSearchParams();

  // ❌ Do NOT auto-select newest
  const currentSort = params.get("sort") || "";

  const handleSortChange = (e) => {
    params.set("sort", e.target.value);
    params.set("page", 1); // reset pagination
    setParams(params);
  };

  return (
    <div className="px-4 h-max sticky top-20">
      {/* SEARCH */}
      <h1 className="mb-4 text-sm font-medium">Search</h1>
      <Search />

      {/* FILTER */}
      <h1 className="mb-4 mt-6 text-sm font-medium">Filter</h1>

      <div className="flex flex-col gap-2 text-sm">
        {["newest", "popular", "trending", "oldest"].map((value) => (
          <label key={value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="sort"
              value={value}
              checked={currentSort === value}
              onChange={handleSortChange}
              className="appearance-none bg-white w-4 h-4 border-[1.5px]
                border-blue-800 cursor-pointer rounded-sm
                checked:bg-blue-800 checked:border-blue-800"
            />
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </label>
        ))}
      </div>

      {/* CATEGORIES */}
      <h1 className="mb-4 mt-6 text-sm font-medium">Categories</h1>
      <div className="flex flex-col gap-2 text-sm">
        <Link className="underline" to="/posts">
          All
        </Link>
        <Link className="underline" to="/posts?cat=web-design">
          Web Design
        </Link>
        <Link className="underline" to="/posts?cat=development">
          Development
        </Link>
        <Link className="underline" to="/posts?cat=databases">
          Databases
        </Link>
        <Link className="underline" to="/posts?cat=seo">
          Search Engine
        </Link>
        <Link className="underline" to="/posts?cat=marketing">
          Marketing
        </Link>
      </div>
    </div>
  );
};

export default SideMenu;
