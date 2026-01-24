import ImageKit from "imagekit";
import Map from "../models/map.model.js";
import User from "../models/user.model.js";
import { getUserIdFromToken } from "../utils/auth.js";
import dotenv from "dotenv";

dotenv.config();

/* -------------------------
   IMAGEKIT CONFIG
-------------------------- */
const imagekit = new ImageKit({
  urlEndpoint: process.env.IK_URL_ENDPOINT,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
});

/* -------------------------
   CREATE MAP
-------------------------- */
export const createMap = async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const user = await User.findOne({ clerkUserId: userId });
    if (!user) return res.status(404).json({ error: "User not found" });

    const { title, location } = req.body;
    if (!title || !location?.lat || !location?.lng)
      return res.status(400).json({ error: "Missing required fields" });

    // Generate unique slug
    let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    let count = 2;
    while (await Map.findOne({ slug })) {
      slug = `${slug}-${count++}`;
    }

    const map = new Map({
      ...req.body,
      slug,
      user: user._id,
    });

    const saved = await map.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Create Map Error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* -------------------------
   DELETE MAP
-------------------------- */
export const deleteMap = async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req);
    if (!userId) return res.status(401).json({ error: "Not authorized" });

    const role = req.auth?.sessionClaims?.metadata?.role;

    // Admin can delete any map
    if (role === "admin") {
      await Map.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "Map deleted" });
    }

    const user = await User.findOne({ clerkUserId: userId });
    if (!user) return res.status(404).json({ error: "User not found" });

    const deletedMap = await Map.findOneAndDelete({
      _id: req.params.id,
      user: user._id,
    });

    if (!deletedMap)
      return res.status(404).json({ error: "Map not found or unauthorized" });

    res.status(200).json({ message: "Map deleted" });
  } catch (err) {
    console.error("Delete Map Error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* -------------------------
   FEATURE / UNFEATURE MAP (ADMIN)
-------------------------- */
export const featureMap = async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req);
    if (!userId) return res.status(401).json({ error: "Not authorized" });

    const role = req.auth?.sessionClaims?.metadata?.role;
    if (role !== "admin")
      return res.status(403).json({ message: "You cannot feature maps" });

    const { mapId } = req.body;
    if (!mapId) return res.status(400).json({ error: "Map ID required" });

    const map = await Map.findById(mapId);
    if (!map) return res.status(404).json({ error: "Map not found" });

    const updatedMap = await Map.findByIdAndUpdate(
      mapId,
      { isFeatured: !map.isFeatured },
      { new: true }
    );

    res.status(200).json(updatedMap);
  } catch (err) {
    console.error("Feature Map Error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* -------------------------
   GET ALL MAPS
-------------------------- */
export const getMaps = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    let query = {};
    let sortObj = { createdAt: -1 };

    const { search, author, featured, sort } = req.query;

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
      }
    }

    const maps = await Map.find(query)
      .populate("user", "username")
      .sort(sortObj)
      .skip(skip)
      .limit(limit);

    const totalMaps = await Map.countDocuments(query);
    const hasMore = page * limit < totalMaps;

    res.status(200).json({ maps, hasMore });
  } catch (err) {
    console.error("Get Maps Error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* -------------------------
   GET MAP BY SLUG
-------------------------- */
export const getMap = async (req, res) => {
  try {
    const map = await Map.findOne({ slug: req.params.slug }).populate(
      "user",
      "username img"
    );

    if (!map) return res.status(404).json({ error: "Map not found" });

    res.status(200).json(map);
  } catch (err) {
    console.error("Get Map Error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* -------------------------
   IMAGEKIT AUTH
-------------------------- */
export const uploadAuth = async (req, res) => {
  try {
    const authParams = imagekit.getAuthenticationParameters();
    res.status(200).json(authParams);
  } catch (err) {
    console.error("ImageKit Auth Error:", err);
    res.status(500).json({ error: err.message });
  }
};
export const deleteUpload = async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req);
    if (!userId) return res.status(401).json({ error: "Not authorized" });

    const { fileId } = req.body;
    if (!fileId) return res.status(400).json({ error: "fileId is required" });

    imagekit.deleteFile(fileId, (err, result) => {
      if (err) {
        console.error("ImageKit delete error:", err);
        return res.status(500).json({ error: err.message });
      }

      res.status(200).json({
        message: "File deleted successfully",
        result,
      });
    });
  } catch (err) {
    console.error("Delete upload error:", err);
    res.status(500).json({ error: err.message });
  }
};
