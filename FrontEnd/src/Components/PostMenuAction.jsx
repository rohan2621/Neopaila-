import React from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
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

  // Fetch Saved Posts
  const { data: savedPosts, isLoading } = useQuery({
    queryKey: ["savedPosts"],
    queryFn: async () => {
      const token = await getToken();
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/saved`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    },
    enabled: !!user,
  });

  // Check if saved
  const isSaved = savedPosts?.includes(post._id);

  // Delete Post
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

  // Save Post
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

  // Feature Post (Admin)
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
    <div>
      <h1 className="mb-4 mt-8 text-sm font-medium">Action</h1>

      {/* SAVE */}
      {isLoading ? (
        <p className="text-sm">Loading...</p>
      ) : (
        <div
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
          onClick={handleSave}
        >
          {saveMutation.isPending ? (
            isSaved ? (
              <FaBookmark />
            ) : (
              <FaRegBookmark />
            )
          ) : isSaved ? (
            <FaBookmark />
          ) : (
            <FaRegBookmark />
          )}

          <span>{isSaved ? "Unsave Post" : "Save this Post"}</span>

          {saveMutation.isPending && (
            <span className="text-xs text-gray-500">saving...</span>
          )}
        </div>
      )}

      {/* FEATURE (ADMIN ONLY) */}
      {isAdmin && (
        <div
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
          onClick={() => featureMutation.mutate()}
        >
          {featureMutation.isPending ? (
            <MdOutlineStarOutline size="1.4em" />
          ) : post.isFeatured ? (
            <MdOutlineStarPurple500 size="1.4em" />
          ) : (
            <MdOutlineStarOutline size="1.4em" />
          )}

          <span>Feature</span>

          {featureMutation.isPending && (
            <span className="text-xs text-gray-500">in progress</span>
          )}
        </div>
      )}

      {/* DELETE (OWNER OR ADMIN) */}
      {user && (post.user?.username === user?.username || isAdmin) && (
        <div
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
          onClick={() => deleteMutation.mutate()}
        >
          <RiDeleteBin6Line size="1.22em" color="red" />
          <span>Delete this Post</span>

          {deleteMutation.isPending && (
            <span className="text-xs text-gray-500">in progress</span>
          )}
        </div>
      )}
    </div>
  );
};
