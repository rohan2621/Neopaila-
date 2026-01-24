import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Uploads from "./Uploads";
import MapPicker from "./MapPicker";

import { ClipLoader } from "react-spinners";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WriteMap = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  /* ---------------- ROLE ---------------- */
  const isAdmin = user?.publicMetadata?.role === "admin";

  /* ---------------- STATE ---------------- */
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState(null);
  const [location, setLocation] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  /* ---------------- VALIDATION ---------------- */
  const titleError = title.trim() === "";
  const imageError = !cover?.url;
  const locationError = !location;

  const isFormInvalid = titleError || imageError || locationError || uploading;

  /* ---------------- REDIRECT GUEST ---------------- */
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/maps");
    }
  }, [isLoaded, isSignedIn, navigate]);

  /* ---------------- GSAP ---------------- */
  const refs = useRef([]);
  const addToRefs = (el) => {
    if (el && !refs.current.includes(el)) refs.current.push(el);
  };

  useLayoutEffect(() => {
    refs.current.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  /* ---------------- API ---------------- */
  const createMapMutation = useMutation({
    mutationFn: async (data) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/maps`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast.success("🗺️ Map created successfully");
      navigate("/maps");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.error || "Failed to create map");
    },
  });

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormInvalid) {
      toast.error("Please complete all required fields");
      return;
    }

    createMapMutation.mutate({
      title,
      img: cover.url, // ✅ backend requires this
      location: {
        lat: location.lat,
        lng: location.lng,
      },
    });
  };

  /* ---------------- LOADING ---------------- */
  if (!isLoaded) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center">
        <ClipLoader size={32} color="#540000" />
      </div>
    );
  }

  /* ---------------- NOT ADMIN UI ---------------- */
  if (!isAdmin) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-50">
        <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800">
            🚫 Access Restricted
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Only admins can create map locations.
          </p>

          <button
            onClick={() => navigate("/maps")}
            className="mt-6 rounded-xl bg-[#540000] px-6 py-2 text-white transition hover:scale-105"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- ADMIN FORM ---------------- */
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 px-4 py-6 md:px-8 lg:px-16 flex flex-col gap-8">
      <h1 ref={addToRefs} className="text-4xl font-extrabold text-gray-900">
        🗺️ Create Map Location
      </h1>

      <form onSubmit={handleSubmit} className="flex max-w-3xl flex-col gap-6">
        {/* IMAGE */}
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
            type="button"
            className="w-max rounded-xl bg-white px-4 py-2 font-medium shadow-md transition hover:scale-105"
          >
            {uploading ? <ClipLoader size={16} /> : "Upload Cover Image *"}
          </button>
        </Uploads>

        {imageError && (
          <span className="text-xs text-red-500">
            ⚠️ Cover image is required
          </span>
        )}

        {cover?.url && (
          <div
            ref={addToRefs}
            className="relative h-48 max-w-md overflow-hidden rounded-xl shadow-md"
          >
            <img
              src={cover.url}
              alt="Cover"
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* TITLE */}
        <div className="flex flex-col gap-1">
          <input
            ref={addToRefs}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Location title *"
            className={`rounded-xl border p-3 shadow-sm ${
              titleError ? "border-red-400" : "border-gray-200"
            }`}
          />
          {titleError && (
            <span className="text-xs text-red-500">⚠️ Title is required</span>
          )}
        </div>

        {/* MAP */}
        <div ref={addToRefs} className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            📍 Select location *
          </label>

          <MapPicker setLocation={setLocation} coverImage={cover?.url} />

          {locationError && (
            <span className="text-xs text-red-500">
              ⚠️ Please select a location
            </span>
          )}
        </div>

        {/* SUBMIT */}
        <button
          ref={addToRefs}
          type="submit"
          disabled={isFormInvalid || createMapMutation.isPending}
          className="
            w-48 rounded-xl bg-[#540000] p-3 font-semibold text-white
            shadow-md transition hover:scale-105
            disabled:cursor-not-allowed disabled:opacity-50
          "
        >
          {createMapMutation.isPending ? "Publishing..." : "Publish Map"}
        </button>

        {uploading && (
          <p className="text-xs text-gray-500">Uploading image… {progress}%</p>
        )}
      </form>
    </div>
  );
};

export default WriteMap;
