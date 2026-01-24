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
    <div className="flex flex-col gap-8 px-2 md:px-4 lg:px-8 xl:px-16 2xl:px-32">
      {/* ---------------- Details ---------------- */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {data.title}
          </h1>

          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <Link className="text-blue-800">
              {data.user?.username || "Unknown"}
            </Link>
            <span>on</span>
            <Link className="text-blue-800">{data.category}</Link>
            <span>{format(data.createdAt)}</span>
          </div>

          <p className="text-gray-500 font-medium">{data.desc}</p>
        </div>

        {/* ---------------- Cover Image ---------------- */}
        <div className="hidden lg:flex w-2/5  items-center justify-center">
          {data.img && (
            <div className="w-full lg:w-[50%] flex justify-center items-start">
              <Img
                src={data.img}
                w={1000}
                className="rounded-2xl object-cover w-full max-h-[450px] lg:max-h-[550px]"
                alt={data.title}
              />
            </div>
          )}
        </div>
      </div>

      {/* ---------------- Content & Sidebar ---------------- */}
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Post Text */}
        <div className="flex-1 lg:text-lg flex flex-col gap-6 text-justify">
          {data.content ? (
            <div
              className="quill-content"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          ) : (
            <p className="text-gray-500">No content available.</p>
          )}

          {/* ---------------- Map ---------------- */}
          {data.location && data.location.lat && data.location.lng && (
            <div className="mt-8">
              <h2 className="text-lg font-medium mb-2">📍 Location</h2>
              <MapContainer
                center={[data.location.lat, data.location.lng]}
                zoom={13}
                style={{ height: "300px", width: "100%" }}
                className="rounded-xl shadow-md"
              >
                <TileLayer
                  attribution="© OpenStreetMap"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[data.location.lat, data.location.lng]} />
              </MapContainer>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-[300px] px-5 h-max sticky top-8">
          <h1 className="mb-4 text-sm font-medium">Author</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Img
                src={data.user?.img || "userImg.jpg"}
                className="w-12 h-12 rounded-full object-cover"
                w={48}
                h={48}
              />
              <Link>{data.user?.username || "John Doe"}</Link>
            </div>
            <p className="text-sm text-gray-500">
              {data.user?.bio || "No bio available."}
            </p>
            0
          </div>

          <PostMenuAction post={data} />

          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            {MainCateValues.map((link, i) => (
              <Link key={i} to={link.path} className="underline">
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
