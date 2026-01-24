import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

import MapCard from "../Components/MapCard";

/* ---------------------------
   Fetch maps
---------------------------- */
const fetchMaps = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/maps`);
  return Array.isArray(res.data) ? res.data : res.data.maps || [];
};

const MapsPage = () => {
  const { user } = useUser();

  /* ✅ ADMIN CHECK */
  const isAdmin = user?.publicMetadata?.role === "admin";

  const {
    data: maps = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["maps"],
    queryFn: fetchMaps,
  });

  return (
    <div className="min-h-screen px-4 py-8 md:px-8">
      {/* Header */}
      <div className="mx-auto mb-10 flex max-w-6xl items-center justify-between">
        <h1 className="text-3xl font-extrabold text-gray-900">
          🗺️ Explore Locations
        </h1>

        {/* ✅ ADMIN ONLY */}
        {isAdmin && (
          <Link
            to="/maps/write"
            className="
              group flex items-center gap-2
              rounded-full bg-[#540000]
              px-5 py-2.5
              text-sm font-semibold text-white
              shadow-lg transition-transform
              hover:scale-105
            "
          >
            <FiPlus className="text-lg transition-transform group-hover:rotate-90" />
            Add Map
          </Link>
        )}
      </div>

      {/* 🔄 LOADING */}
      {isLoading && (
        <div className="flex h-60 flex-col items-center justify-center gap-4">
          <ClipLoader size={42} color="#540000" />
          <p className="text-sm text-gray-500">Loading map locations...</p>
        </div>
      )}

      {/* ❌ ERROR */}
      {isError && (
        <div className="flex h-60 items-center justify-center text-red-500">
          Failed to load map locations
        </div>
      )}

      {/* 📭 EMPTY */}
      {!isLoading && !isError && maps.length === 0 && (
        <div className="flex h-60 flex-col items-center justify-center gap-3 text-gray-500">
          <p>No map locations yet</p>

          {/* Admin only create shortcut */}
          {isAdmin && (
            <Link
              to="/maps/write"
              className="
                rounded-full border border-[#540000]
                px-4 py-2 text-sm font-medium text-[#540000]
                transition hover:bg-[#540000] hover:text-white
              "
            >
              Create first map
            </Link>
          )}
        </div>
      )}

      {/* 🧱 GRID */}
      {!isLoading && !isError && maps.length > 0 && (
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 md:grid-cols-3">
          {maps.map((place) => (
            <MapCard key={place._id} place={place} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MapsPage;
