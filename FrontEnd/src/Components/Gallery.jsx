import React, { useEffect, useState } from "react";
import { Img } from "./Img";
import Lightbox from "./Lightbox";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RiDeleteBin6Line, RiUploadCloud2Line } from "react-icons/ri";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const API = `${import.meta.env.VITE_API_URL}/images`;

const Gallery = () => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const isAdmin = user?.publicMetadata?.role === "admin";

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  /* FETCH */
  useEffect(() => {
    fetch(`${API}/gallery`)
      .then((res) => res.json())
      .then(setFiles)
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    filter === "all" ? files : files.filter((f) => f.fileType === filter);

  /* UPLOAD */
  const uploadMutation = useMutation({
    mutationFn: async (file) => {
      const token = await getToken();
      const formData = new FormData();
      formData.append("file", file);
      return axios.post(`${API}/gallery`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onMutate: () => setUploading(true),
    onSuccess: (res) => {
      toast.success("Uploaded");
      setFiles((p) => [res.data, ...p]);
    },
    onError: () => toast.error("Upload failed"),
    onSettled: () => setUploading(false),
  });

  /* DELETE */
  const deleteMutation = useMutation({
    mutationFn: async (fileId) => {
      const token = await getToken();
      return axios.post(
        `${API}/delete`,
        { fileId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onMutate: setDeletingId,
    onSuccess: (_, id) => {
      toast.success("Deleted");
      setFiles((p) => p.filter((f) => f.fileId !== id));
    },
    onError: () => toast.error("Delete failed"),
    onSettled: () => setDeletingId(null),
  });

  if (loading) {
    return <div className="py-20 text-center">Loading gallery…</div>;
  }

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-10">
        {/* HEADER */}
        <div className="flex flex-wrap gap-3 mb-6">
          {["all", "image", "video"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-full ${
                filter === t ? "bg-black text-white" : "bg-gray-100"
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}

          {isLoaded && isAdmin && (
            <label className="ml-auto flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full cursor-pointer">
              {uploading ? (
                <ClipLoader size={16} color="#fff" />
              ) : (
                <RiUploadCloud2Line />
              )}
              Upload
              <input
                type="file"
                hidden
                accept="image/*,video/*"
                onChange={(e) => {
                  const f = e.target.files[0];
                  if (f) uploadMutation.mutate(f);
                  e.target.value = "";
                }}
              />
            </label>
          )}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filtered.map((file, i) => {
            const deleting = deletingId === file.fileId;

            return (
              <div
                key={file.fileId}
                className="relative aspect-square overflow-hidden rounded-xl bg-black"
              >
                <button
                  onClick={() => !deleting && setActiveIndex(i)}
                  className="absolute inset-0"
                >
                  {file.fileType === "image" ? (
                    <Img
                      src={file.filePath}
                      w="600"
                      h="600"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={file.url}
                      muted
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </button>

                {deleting && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                    <ClipLoader color="#fff" size={40} />
                  </div>
                )}

                {isLoaded && isAdmin && !deleting && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteMutation.mutate(file.fileId);
                    }}
                    className="absolute top-2 right-2 bg-black/70 p-2 rounded-full"
                  >
                    <RiDeleteBin6Line color="red" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {activeIndex !== null && filtered[activeIndex] && (
        <Lightbox
          files={filtered}
          index={activeIndex}
          setIndex={setActiveIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </>
  );
};

export default Gallery;
