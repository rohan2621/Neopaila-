import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";
import { getUserIdFromToken } from "../utils/auth.js";
export const getUserSavedPosts = async (req, res) => {
  const clerkUserId = await getUserIdFromToken(req);

  if (!clerkUserId) {
    return res.status(401).json({ error: "Not authorized" });
  }
  const user = await User.findOne({ clerkUserId });

  res.status(200).json(user.savedPosts);
};
export const savedPosts = async (req, res) => {
  const clerkUserId = await getUserIdFromToken(req);
  const postId = req.body.postId;
  if (!clerkUserId) {
    return res.status(401).json({ error: "Not authorized" });
  }
  const user = await User.findOne({ clerkUserId });
  const isSaved = user.savedPosts.some((p) => p == postId);
  if (!isSaved) {
    await User.findOneAndUpdate(user._id, {
      $push: { savedPosts: postId },
    });
  } else {
    await User.findOneAndUpdate(user._id, {
      $pull: { savedPosts: postId },
    });
  }
  res.status(200).json(isSaved ? "Post unsaved" : "Post saved!");
};
