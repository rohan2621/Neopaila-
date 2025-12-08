import React from "react";
import { Img } from "./Img";
import { format } from "timeago.js";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Comment = ({ comment, postId }) => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  const role = user?.publicMetadata?.role;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(
        `${import.meta.env.VITE_API_URL}/comments/${comment._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      toast.success("Comment deleted successfully");
    },
    onError: () => {
      toast.error("Error deleting comment");
    },
  });

  const canDelete =
    user && (comment?.user?.username === user?.username || role === "admin");

  if (!comment) return null;

  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-4">
        {/* Safe user image render */}
        {comment?.user?.img && (
          <Img
            src={comment.user.img}
            className="w-10 h-10 rounded-full object-cover"
            w="40"
          />
        )}

        <span className="font-medium">{comment?.user?.username}</span>

        <span className="text-sm text-gray-500">
          {format(comment.createdAt)}
        </span>

        {/* Delete button logic */}
        {canDelete && (
          <>
            <span
              className="text-[#ac0000] hover:text-[#540000] text-md duration-200 cursor-pointer"
              onClick={() => mutation.mutate()}
            >
              Delete
            </span>

            {mutation.isPending && <span>Deleting...</span>}
          </>
        )}
      </div>

      <div className="mt-4">
        <p>{comment.desc}</p>
      </div>
    </div>
  );
};

export default Comment;
