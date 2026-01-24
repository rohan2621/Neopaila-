import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

import { Img } from "./Img"; // ✅ ImageKit wrapper

const MapCard = ({ place }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  /* ---------------------------
     PERMISSIONS
  ---------------------------- */
  const isAdmin = user?.publicMetadata?.role === "admin";
  const isOwner = user?.id === place?.user || user?.id === place?.user?._id;
  const canDelete = isAdmin || isOwner;

  /* ---------------------------
     DELETE MUTATION
  ---------------------------- */
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(`${import.meta.env.VITE_API_URL}/maps/${place._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast.success("🗑️ Map deleted");
      queryClient.invalidateQueries(["maps"]);
    },
    onError: () => {
      toast.error("Failed to delete map");
    },
  });

  const handleDelete = (e) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this map?")) return;
    deleteMutation.mutate();
  };

  /* ---------------------------
     IMAGE SOURCE
  ---------------------------- */
  const imageSrc = place.img || place.coverImage || "/placeholder-map.jpg";

  /* ---------------------------
     RENDER
  ---------------------------- */
  return (
    <div
      onClick={() => navigate(`/maps/${place.slug}`)}
      className="
        group relative cursor-pointer overflow-hidden
        rounded-2xl bg-white shadow-lg
        transition-all hover:-translate-y-1 hover:shadow-2xl
      "
    >
      {/* DELETE BUTTON */}
      {canDelete && (
        <button
          onClick={handleDelete}
          className="
            absolute right-3 top-3 z-20
            rounded-full bg-black/70 p-2
            text-white opacity-0
            transition group-hover:opacity-100
            hover:bg-red-600
          "
          title="Delete map"
        >
          <RiDeleteBin6Line size={16} />
        </button>
      )}

      {/* IMAGE */}
      <div className="relative h-48 overflow-hidden">
        <Img
          src={imageSrc}
          alt={place.title}
          className="
            h-full w-full object-cover
            transition-transform duration-500
            group-hover:scale-110
          "
          noSize
        />
        <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/50" />
      </div>

      {/* CONTENT */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">{place.title}</h3>

        {place.placeName && (
          <p className="mt-1 text-xs text-gray-500">📍 {place.placeName}</p>
        )}
      </div>
    </div>
  );
};

export default MapCard;
