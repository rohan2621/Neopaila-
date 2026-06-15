import React from "react";
import { Img } from "../Components/Img";
import { Link, useParams } from "react-router-dom";
import { PostMenuAction } from "../Components/PostMenuAction";
import { MainCateValues } from "../utils/Resource";
import { Search } from "../Components/Search";
import Comments from "../Components/Comments";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import axios from "axios";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
};

export const SinglePostPage = () => {
  const { slug } = useParams();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!!</p>;
  if (!data) return <p>Post not found!</p>;

  return (
    <div className="flex flex-col gap-8 px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-40 py-8 max-w-screen-xl mx-auto">
      {/* ---------------- Hero: Title + Cover Image ---------------- */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left: title, meta, desc */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl md:text-4xl xl:text-5xl font-semibold leading-tight">
            {data.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <Link className="text-blue-800 hover:underline">
              {data.user?.username || "Unknown"}
            </Link>
            <span>on</span>
            <Link className="text-blue-800 hover:underline capitalize">
              {data.category}
            </Link>
            <span>{format(data.createdAt)}</span>
          </div>

          <p className="text-gray-500 font-medium text-base md:text-lg">
            {data.desc}
          </p>
        </div>

        {/* Right: cover image */}
        {data.img && (
          <div className="w-full lg:w-[420px] shrink-0">
            <Img
              src={data.img}
              w={1000}
              className="rounded-2xl object-cover w-full h-[300px] md:h-[420px]"
              alt={data.title}
            />
          </div>
        )}
      </div>

      {/* ---------------- Content + Sidebar ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-12">
        {/* Main content */}
        <div className="flex-1 min-w-0 max-w-none flex flex-col gap-6 lg:text-lg">
          {data.content ? (
            <div
              className="quill-content"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          ) : (
            <p className="text-gray-500">No content available.</p>
          )}

          {/* ---------------- Map ---------------- */}
          {data.location?.lat && data.location?.lng && (
            <div className="mt-8 w-full">
              <h2 className="text-lg font-medium mb-2">📍 Location</h2>
              <div className="h-[350px] w-full overflow-hidden">
                <MapContainer
                  center={[data.location.lat, data.location.lng]}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                  className="rounded-xl shadow-md"
                >
                  <TileLayer
                    attribution="© OpenStreetMap"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[data.location.lat, data.location.lng]} />
                </MapContainer>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-[300px] shrink-0 lg:sticky lg:top-24">
          <h1 className="mb-4 text-sm font-medium">Author</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Img
                src={data.user?.img || "userImg.jpg"}
                className="w-12 h-12 rounded-full object-cover"
                w={48}
                h={48}
              />
              <Link className="hover:underline">
                {data.user?.username || "John Doe"}
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              {data.user?.bio || "No bio available."}
            </p>
          </div>

          <PostMenuAction post={data} />

          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            {MainCateValues.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                className="underline hover:text-[#540000]"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search />
        </div>
      </div>

      {/* ---------------- Comments ---------------- */}
      <Comments postId={data._id} />
    </div>
  );
};
