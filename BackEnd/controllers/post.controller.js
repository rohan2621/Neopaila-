import ImageKit from "imagekit";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { getUserIdFromToken } from "../utils/auth.js";
import dotenv from "dotenv";

dotenv.config();

// -------------------------
// IMAGEKIT CONFIG
// -------------------------
const imagekit = new ImageKit({
  urlEndpoint: process.env.IK_URL_ENDPOINT,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
});

// -------------------------
// CREATE POST
// -------------------------
export const createPost = async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const user = await User.findOne({ clerkUserId: userId });
    if (!user) return res.status(404).json({ error: "User not found" });

    const { title, content, location } = req.body;

    if (!title || !content || !location)
      return res.status(400).json({ error: "Missing fields" });

    // Generate unique slug
    let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    let count = 2;
    while (await Post.findOne({ slug })) {
      slug = `${slug}-${count++}`;
    }

    const post = new Post({
      ...req.body,
      slug,
      user: user._id,
    });

    const saved = await post.save();
    res.status(201).json(saved);
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

    const role = req.auth?.sessionClaims?.metadata?.role;
    if (role === "admin") {
      await Post.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "Post deleted" });
    }

    const user = await User.findOne({ clerkUserId: userId });
    if (!user) return res.status(404).json({ error: "User not found" });

    const deletedPost = await Post.findOneAndDelete({
      _id: req.params.id,
      user: user._id,
    });
    if (!deletedPost)
      return res.status(404).json({ error: "Post not found or unauthorized" });

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.error("Delete Post Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// -------------------------
// FEATURE / UNFEATURE POST (ADMIN)
// -------------------------
export const featurePost = async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req);
    if (!userId) return res.status(401).json({ error: "Not authorized" });

    const role = req.auth?.sessionClaims?.metadata?.role;
    if (role !== "admin")
      return res.status(403).json({ message: "You cannot feature posts" });

    const { postId } = req.body;
    if (!postId) return res.status(400).json({ error: "Post ID required" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { isFeatured: !post.isFeatured },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error("Feature Post Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// -------------------------
// DELETE SINGLE IMAGE UPLOAD
// -------------------------
// -------------------------
// DELETE SINGLE IMAGE (POST STYLE)
// -------------------------
export const deleteUpload = async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req);
    if (!userId) return res.status(401).json({ error: "Not authorized" });

    const { fileId } = req.body; // <- now from POST body
    if (!fileId) return res.status(400).json({ error: "fileId is required" });

    imagekit.deleteFile(fileId, (err, result) => {
      if (err) {
        console.error("ImageKit delete error:", err);
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: "File deleted successfully", result });
    });
  } catch (err) {
    console.error("Delete upload error:", err);
    res.status(500).json({ error: err.message });
  }
};

// -------------------------
// DELETE MULTIPLE IMAGE UPLOADS
// -------------------------
export const deleteMultipleUploads = async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req);
    if (!userId) return res.status(401).json({ error: "Not authorized" });

    const { fileIds } = req.body;
    if (!fileIds || !Array.isArray(fileIds) || fileIds.length === 0)
      return res.status(400).json({ error: "fileIds array is required" });

    const results = [];

    for (let fileId of fileIds) {
      try {
        const result = await new Promise((resolve, reject) => {
          imagekit.deleteFile(fileId, (err, res) => {
            if (err) reject(err);
            else resolve(res);
          });
        });
        results.push({ fileId, status: "deleted", result });
      } catch (err) {
        results.push({ fileId, status: "error", error: err.message });
      }
    }

    res.status(200).json({ message: "Deletion processed", results });
  } catch (err) {
    console.error("Delete Multiple Uploads Error:", err);
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
    const skip = (page - 1) * limit;

    let query = {};
    let sortObj = { createdAt: -1 };
    const { cat, author, search, sort, featured } = req.query;

    if (cat) query.category = cat;
    if (featured && (featured === "true" || featured === true))
      query.isFeatured = true;
    if (search) query.title = { $regex: search, $options: "i" };
    if (author) {
      const user = await User.findOne({ username: author }).select("_id");
      if (!user) return res.status(404).json({ error: "User not found" });
      query.user = user._id;
    }

    if (sort) {
      switch (sort) {
        case "newest":
          sortObj = { createdAt: -1 };
          break;
        case "oldest":
          sortObj = { createdAt: 1 };
          break;
        case "popular":
          sortObj = { visit: -1 };
          break;
        case "trending":
          sortObj = { createdAt: -1 };
          query.createdAt = {
            $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          };
          break;
      }
    }

    const posts = await Post.find(query)
      .populate("user", "username")
      .sort(sortObj)
      .skip(skip)
      .limit(limit);

    const totalPosts = await Post.countDocuments(query);
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

// -------------------------
// IMAGEKIT AUTH
// -------------------------
export const uploadAuth = async (req, res) => {
  try {
    const authParams = imagekit.getAuthenticationParameters();
    res.status(200).json(authParams);
  } catch (err) {
    console.error("ImageKit Auth Error:", err);
    res.status(500).json({ error: err.message });
  }
};
