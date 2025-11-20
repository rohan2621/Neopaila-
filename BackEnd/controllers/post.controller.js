import ImageKit from "imagekit";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { getUserIdFromToken } from "../utils/auth.js";
import dotenv from "dotenv";
dotenv.config();

export const createPost = async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req);
    if (!userId) return res.status(401).json({ error: "Not authorized" });

    const user = await User.findOne({ clerkUserId: userId });
    if (!user) return res.status(404).json({ error: "User not found" });

    const { title, content } = req.body;
    if (!title || !content)
      return res.status(400).json({ error: "Title and content are required" });

    // Create a unique slug
    let baseSlug = title.trim().replace(/\s+/g, "-").toLowerCase();
    let slug = baseSlug;
    let counter = 2;
    while (await Post.findOne({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    const newPost = new Post({
      user: user._id,
      slug,
      ...req.body,
    });

    // Save first, then log
    const savedPost = await newPost.save();
    console.log("Post created:", savedPost);

    res.status(201).json(savedPost);
  } catch (err) {
    console.error("Create Post Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// -------------------------
// DELETE POST
// -------------------------
export const deletePost = async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req);
    if (!userId) return res.status(401).json({ error: "Not authorized" });

    const user = await User.findOne({ clerkUserId: userId });
    if (!user) return res.status(404).json({ error: "User not found" });

    const deletedPost = await Post.findOneAndDelete({
      _id: req.params.id,
      user: user._id,
    });

    if (!deletedPost)
      return res.status(404).json({ error: "Post not found or unauthorized" });

    res.status(200).json({ message: "Post has been deleted" });
  } catch (err) {
    console.error("Delete Post Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// -------------------------
// GET ALL POSTS
// -------------------------
export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const posts = await Post.find()
      .limit(limit)
      .skip((page - 1) * limit) // FIXED
      .populate("user", "username")
      .sort({ createdAt: -1 });

    const totalPosts = await Post.countDocuments();
    const hasMore = page * limit < totalPosts;

    res.status(200).json({ posts, hasMore });
  } catch (err) {
    console.error("Get Posts Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// -------------------------
// GET POST BY SLUG
// -------------------------
export const getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate(
      "user",
      "username img"
    );
    if (!post) return res.status(404).json({ error: "Post not found" });

    res.status(200).json(post);
  } catch (err) {
    console.error("Get Post Error:", err);
    res.status(500).json({ error: err.message });
  }
};
const imagekit = new ImageKit({
  urlEndpoint: process.env.IK_URL_ENDPOINT,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
});

export const uploadAuth = async (req, res) => {
  try {
    const result = imagekit.getAuthenticationParameters();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};
