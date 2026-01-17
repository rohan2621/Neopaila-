import React from "react";
import { FaBookmark, FaRegBookmark, FaFacebookF } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineStarOutline, MdOutlineStarPurple500 } from "react-icons/md";
import { useNavigate } from "react-router";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const PostMenuAction = ({ post }) => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isAdmin = user?.publicMetadata?.role === "admin";

  /* ---------------- SAVED POSTS ---------------- */
  const { data: savedPosts, isLoading } = useQuery({
    queryKey: ["savedPosts"],
    queryFn: async () => {
      const token = await getToken();
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/saved`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    enabled: !!user,
  });

  const isSaved = savedPosts?.includes(post._id);

  /* ---------------- DELETE POST ---------------- */
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast.success("Post deleted");
      queryClient.invalidateQueries(["posts"]);
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.response?.data || "Failed to delete");
    },
  });

  /* ---------------- SAVE POST ---------------- */
  const saveMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/users/save`,
        { postId: post._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["savedPosts"]);
    },
  });

  /* ---------------- FEATURE POST ---------------- */
  const featureMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/posts/feature`,
        { postId: post._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      toast.success("Feature updated");
      queryClient.invalidateQueries(["post", post.slug]);
    },
  });

  if (!isLoaded) return null;

  const handleSave = () => {
    if (!user) return navigate("/login");
    saveMutation.mutate();
  };

  return (
    <div
      className="
        mt-8
        text-sm
        [&_svg]:text-[14px]
        [&_img]:w-4
        [&_img]:h-4
      "
    >
      <h1 className="mb-4 font-medium">Action</h1>

      {/* SAVE */}
      {isLoading ? (
        <p className="text-sm">Loading...</p>
      ) : (
        <div
          className="flex items-center gap-2 py-2 cursor-pointer"
          onClick={handleSave}
        >
          {isSaved ? <FaBookmark /> : <FaRegBookmark />}
          <span>{isSaved ? "Unsave Post" : "Save this Post"}</span>
          {saveMutation.isPending && (
            <span className="text-xs text-gray-500">saving...</span>
          )}
        </div>
      )}

      {/* FEATURE (ADMIN) */}
      {isAdmin && (
        <div
          className="flex items-center gap-2 py-2 cursor-pointer"
          onClick={() => featureMutation.mutate()}
        >
          {post.isFeatured ? (
            <MdOutlineStarPurple500 />
          ) : (
            <MdOutlineStarOutline />
          )}
          <span>Feature</span>
          {featureMutation.isPending && (
            <span className="text-xs text-gray-500">in progress</span>
          )}
        </div>
      )}

      {/* SHARE (FB EXAMPLE) */}
      <div className="flex items-center gap-2 py-2 cursor-pointer">
        <FaFacebookF />
        <span>Share on Facebook</span>
      </div>

      {/* DELETE */}
      {user && (post.user?.username === user?.username || isAdmin) && (
        <div
          className="flex items-center gap-2 py-2 cursor-pointer text-red-600"
          onClick={() => deleteMutation.mutate()}
        >
          <RiDeleteBin6Line />
          <span>Delete this Post</span>
          {deleteMutation.isPending && (
            <span className="text-xs text-gray-500">in progress</span>
          )}
        </div>
      )}
    </div>
  );
};
