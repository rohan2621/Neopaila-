import React, { useState, useRef, useLayoutEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Uploads from "../Components/Uploads";
import MapPicker from "../Components/MapPicker";
import { ClipLoader } from "react-spinners";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Write = () => {
  const { isSignedIn, isLoaded } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [progress, setProgress] = useState(0);
  const [cover, setCover] = useState(null);
  const [media, setMedia] = useState([]);
  const [location, setLocation] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [deletingFileId, setDeletingFileId] = useState(null);

  // Scroll animation refs
  const refs = useRef([]);
  refs.current = [];
  const addToRefs = (el) => {
    if (el && !refs.current.includes(el)) refs.current.push(el);
  };

  // POST mutation
  const createPostMutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: (res) => {
      toast.success("Post created successfully");
      navigate(`/${res.data.slug}`);
    },
    onError: () => toast.error("Error creating post"),
  });

  // DELETE media mutation
  const deleteMediaMutation = useMutation({
    mutationFn: async (fileId) => {
      const token = await getToken();
      return axios.post(
        `${import.meta.env.VITE_API_URL}/posts/uploads/delete`,
        { fileId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => toast.success("Media deleted successfully"),
    onError: () => toast.error("Failed to delete media"),
  });

  // Auto insert uploaded images into editor
  React.useEffect(() => {
    if (!media.length) return;
    const newMedia = media.filter(
      (m) => !value.includes(m.url) && m.type === "image"
    );
    if (!newMedia.length) return;
    const newContent = newMedia
      .map((m) => `<p><img src="${m.url}" /></p>`)
      .join("");
    setValue((prev) => prev + newContent);
  }, [media]);

  // Scroll animations
  useLayoutEffect(() => {
    if (!isLoaded) return;

    refs.current.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play reverse play reverse", // animate down & up
            // scrub: 0.2, // optional: smooth scroll animation
          },
        }
      );

      // Special handling for ReactQuill container
      if (el.querySelector(".ql-editor")) {
        const quillContent = el.querySelector(".ql-editor");
        gsap.fromTo(
          quillContent,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [cover, media, isLoaded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      img: cover?.url || "",
      images: media.filter((m) => m.type === "image").map((i) => i.url),
      video: media.find((m) => m.type === "video")?.url || "",
      content: value,
      location,
    };
    createPostMutation.mutate(data);
  };

  const handleDeleteMedia = (file, isCover = false) => {
    if (!file?.fileId) return;
    setDeletingFileId(file.fileId);
    deleteMediaMutation.mutate(file.fileId, {
      onSuccess: () => {
        if (isCover) setCover(null);
        else setMedia(media.filter((m) => m.fileId !== file.fileId));
      },
      onSettled: () => setDeletingFileId(null),
    });
  };

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>You must be logged in.</div>;

  const hasMedia = media.length > 0;

  return (
    <div className="min-h-[calc(100vh-64px)] px-2 md:px-4 lg:px-8 xl:px-16 2xl:px-32 md:min-h-[calc(100vh-80px)] flex flex-col gap-8 p-6 bg-gray-50">
      {/* Header */}
      <h1
        ref={addToRefs}
        className="text-4xl md:text-3xl font-extrabold text-gray-900 drop-shadow-sm mb-6"
      >
        ✨ Create a New Post
      </h1>

      <form className="flex flex-col gap-6 flex-1" onSubmit={handleSubmit}>
        {/* Cover Upload */}
        <Uploads
          type="image"
          setProgress={setProgress}
          setData={(data) => {
            setUploading(true);
            setCover(data);
            setUploading(false);
          }}
        >
          <button
            ref={addToRefs}
            className="p-3 w-max shadow-lg rounded-xl font-medium text-gray-700 bg-white hover:bg-gray-100 transition transform hover:scale-105"
          >
            {uploading ? (
              <ClipLoader size={16} color="#540000" />
            ) : (
              "Add Cover Image"
            )}
          </button>
        </Uploads>

        {/* Cover Preview */}
        {cover?.url && (
          <div
            ref={addToRefs}
            className="relative w-full max-w-md h-48 mt-2 border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300"
          >
            <img
              src={cover.url}
              alt="Cover Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-600 transition"
              onClick={() => handleDeleteMedia(cover, true)}
            >
              {deletingFileId === cover.fileId ? (
                <ClipLoader size={12} color="#fff" />
              ) : (
                "×"
              )}
            </button>
          </div>
        )}

        {/* Title */}
        <input
          ref={addToRefs}
          className="text-3xl md:text-2xl font-semibold bg-white p-3 rounded-xl border border-gray-200 shadow-sm focus:border-[#540000] focus:ring focus:ring-[#540000]/20 transition"
          name="title"
          type="text"
          placeholder="My Awesome Story"
          required
        />

        {/* Category */}
        <div
          ref={addToRefs}
          className="flex flex-col md:flex-row items-start md:items-center gap-3"
        >
          <label className="text-sm font-medium text-gray-700">
            Choose a category:
          </label>
          <select
            name="category"
            className="p-2 rounded-xl bg-white shadow-sm hover:shadow-md transition w-full md:w-auto"
            defaultValue="general"
          >
            <option value="general">General</option>
            <option value="history">History</option>
            <option value="culture">Culture</option>
            <option value="heritage">Heritage</option>
          </select>
        </div>

        {/* Description */}
        <textarea
          ref={addToRefs}
          className="p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition min-h-[100px] border border-gray-200 focus:border-[#540000] focus:ring focus:ring-[#540000]/20"
          name="desc"
          placeholder="Short description..."
          required
        />

        {/* Media + Editor */}
        <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-4">
          {/* Upload buttons */}
          <div className="flex flex-row md:flex-col gap-2 md:w-auto">
            <Uploads
              type="image"
              setProgress={setProgress}
              setData={(data) => setMedia((prev) => [...prev, data])}
            >
              <button className="p-3 shadow-lg rounded-xl bg-white hover:bg-gray-100 transition transform hover:scale-105">
                🌆
              </button>
            </Uploads>

            <Uploads
              type="video"
              setProgress={setProgress}
              setData={(data) =>
                setMedia((prev) => [
                  ...prev.filter((m) => m.type !== "video"),
                  data,
                ])
              }
            >
              <button className="p-3 shadow-lg rounded-xl bg-white hover:bg-gray-100 transition transform hover:scale-105">
                ▶
              </button>
            </Uploads>
          </div>

          {/* Media Previews */}
          {hasMedia && (
            <div className="flex flex-row gap-2 overflow-x-auto md:flex-1">
              {media.map((m) => (
                <div
                  key={m.fileId}
                  className="relative w-32 h-32 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition transform hover:scale-105"
                  ref={addToRefs} // animate each media preview
                >
                  {m.type === "image" ? (
                    <img
                      src={m.url}
                      alt="Uploaded"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={m.url}
                      className="w-full h-full object-cover"
                      controls
                    />
                  )}
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition"
                    onClick={() => handleDeleteMedia(m)}
                  >
                    {deletingFileId === m.fileId ? (
                      <ClipLoader size={12} color="#fff" />
                    ) : (
                      "×"
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Editor */}
          <div
            ref={addToRefs} // animate container
            className={`flex-1 rounded-xl bg-white shadow-sm hover:shadow-md transition min-h-[160px] relative ${
              hasMedia ? "h-40 md:h-60" : "h-60 md:h-[400px]"
            } overflow-hidden`}
          >
            <ReactQuill
              value={value}
              onChange={setValue}
              theme="snow"
              readOnly={progress > 0 && progress < 100}
              className="h-full rounded-xl"
            />
          </div>
        </div>

        {/* Map Picker */}
        <div ref={addToRefs} className="mt-6 flex flex-col gap-2">
          <label className="text-sm text-gray-600 font-medium">
            📍 Select historical location
          </label>
          <MapPicker setLocation={setLocation} coverImage={cover?.url} />
          {location && (
            <p className="text-xs text-gray-500">
              Latitude: {location.lat} | Longitude: {location.lng}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          ref={addToRefs}
          type="submit"
          disabled={
            createPostMutation.isPending || (progress > 0 && progress < 100)
          }
          className="bg-[#540000] disabled:cursor-not-allowed disabled:bg-gray-400 mt-6 p-3 w-44 text-white font-semibold rounded-xl hover:scale-105 transition transform shadow-md hover:shadow-lg"
        >
          {createPostMutation.isPending ? "Posting..." : "Publish"}
        </button>

        <span className="text-sm text-gray-500 mt-2">
          Progress: {progress}%
        </span>
      </form>
    </div>
  );
};
