import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";
import { getUserIdFromToken } from "../utils/auth.js";

/**
 * Get all saved posts for the logged-in user
 */
export const getUserSavedPosts = async (req, res) => {
  try {
    const clerkUserId = await getUserIdFromToken(req);

    if (!clerkUserId) {
      return res.status(401).json({ error: "Not authorized" });
    }

    const user = await User.findOne({ clerkUserId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return saved posts, empty array if none
    res.status(200).json(user.savedPosts || []);
  } catch (err) {
    console.error("Error in getUserSavedPosts:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Toggle saving a post for the logged-in user
 */
export const savedPosts = async (req, res) => {
  try {
    const clerkUserId = await getUserIdFromToken(req);
    const { postId } = req.body;

    if (!clerkUserId) {
      return res.status(401).json({ error: "Not authorized" });
    }

    if (!postId) {
      return res.status(400).json({ error: "Post ID is required" });
    }

    const user = await User.findOne({ clerkUserId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isSaved = user.savedPosts.some(
      (p) => p.toString() === postId.toString()
    );

    let updatedUser;

    if (!isSaved) {
      // Save the post
      updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $push: { savedPosts: postId } },
        { new: true }
      );
    } else {
      // Unsave the post
      updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $pull: { savedPosts: postId } },
        { new: true }
      );
    }

    res.status(200).json({
      message: isSaved ? "Post unsaved" : "Post saved!",
      savedPosts: updatedUser.savedPosts,
    });
  } catch (err) {
    console.error("Error in toggleSavedPost:", err);
    res.status(500).json({ error: "Server error" });
  }
};
