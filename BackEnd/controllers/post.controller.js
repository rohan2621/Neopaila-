import ImageKit from "imagekit";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { getUserIdFromToken } from "../utils/auth.js";
import dotenv from "dotenv";

dotenv.config();

/* -------------------------
   IMAGEKIT CONFIG
------------------------- */
const imagekit = new ImageKit({
  urlEndpoint: process.env.IK_URL_ENDPOINT,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
});

/* -------------------------
   SIMPLE CACHE (IMPORTANT)
------------------------- */
let postsCache = new Map();

/* -------------------------
   CREATE POST
------------------------- */
export const createPost = async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const user = await User.findOne({ clerkUserId: userId });
    if (!user) return res.status(404).json({ error: "User not found" });

    const { title, content, location } = req.body;

    if (!title || !content || !location) {
      return res.status(400).json({ error: "Missing fields" });
    }

    let baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    let slug = baseSlug;
    let count = 2;

    while (await Post.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    const post = new Post({
      ...req.body,
      slug,
      user: user._id,
    });

    const saved = await post.save();

    // clear cache (important after create)
    postsCache.clear();

    res.status(201).json(saved);
  } catch (err) {
    console.error("Create Post Error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* -------------------------
   GET POSTS (OPTIMIZED)
------------------------- */
export const getPosts = async (req, res) => {
  try {
    const cacheKey = JSON.stringify(req.query);

    // return cached response if valid (60s)
    const cached = postsCache.get(cacheKey);
    if (cached && Date.now() - cached.time < 60000) {
      return res.json(cached.data);
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    let query = {};
    let sortObj = { createdAt: -1 };

    const { cat, author, search, sort, featured } = req.query;

    if (cat) query.category = cat;
    if (featured === "true") query.isFeatured = true;

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (author) {
      const user = await User.findOne({ username: author }).select("_id");
      if (!user) return res.status(404).json({ error: "User not found" });
      query.user = user._id;
    }

    if (sort === "oldest") sortObj = { createdAt: 1 };
    if (sort === "popular") sortObj = { visit: -1 };

    if (sort === "trending") {
      query.createdAt = {
        $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      };
    }

    const posts = await Post.find(query)
      .select("title slug createdAt image category user isFeatured visit")
      .populate("user", "username")
      .sort(sortObj)
      .skip(skip)
      .limit(limit);

    // lightweight "hasMore" check (no countDocuments)
    const nextPosts = await Post.find(query)
      .skip(skip + limit)
      .limit(1);

    const result = {
      posts,
      hasMore: nextPosts.length > 0,
    };

    postsCache.set(cacheKey, {
      data: result,
      time: Date.now(),
    });

    res.json(result);
  } catch (err) {
    console.error("Get Posts Error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* -------------------------
   GET SINGLE POST
------------------------- */
export const getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate(
      "user",
      "username img"
    );

    if (!post) return res.status(404).json({ error: "Post not found" });

    res.json(post);
  } catch (err) {
    console.error("Get Post Error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* -------------------------
   DELETE POST
------------------------- */
export const deletePost = async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req);
    if (!userId) return res.status(401).json({ error: "Not authorized" });

    const role = req.auth?.sessionClaims?.metadata?.role;

    if (role === "admin") {
      await Post.findByIdAndDelete(req.params.id);
      postsCache.clear();
      return res.json({ message: "Post deleted" });
    }

    const user = await User.findOne({ clerkUserId: userId });
    if (!user) return res.status(404).json({ error: "User not found" });

    const deleted = await Post.findOneAndDelete({
      _id: req.params.id,
      user: user._id,
    });

    if (!deleted) {
      return res.status(404).json({ error: "Not found or unauthorized" });
    }

    postsCache.clear();

    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error("Delete Post Error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* -------------------------
   FEATURE POST
------------------------- */
export const featurePost = async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req);
    if (!userId) return res.status(401).json({ error: "Not authorized" });

    const role = req.auth?.sessionClaims?.metadata?.role;
    if (role !== "admin") {
      return res.status(403).json({ error: "Not allowed" });
    }

    const { postId } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Not found" });

    const updated = await Post.findByIdAndUpdate(
      postId,
      { isFeatured: !post.isFeatured },
      { new: true }
    );

    postsCache.clear();

    res.json(updated);
  } catch (err) {
    console.error("Feature Error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* -------------------------
   IMAGEKIT AUTH
------------------------- */
export const uploadAuth = async (req, res) => {
  try {
    const auth = imagekit.getAuthenticationParameters();
    res.json(auth);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
