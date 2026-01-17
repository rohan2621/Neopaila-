import ImageKit from "imagekit";
import dotenv from "dotenv";
import { getUserIdFromToken } from "../utils/auth.js";

dotenv.config();

/* ----------------------------------
   IMAGEKIT CONFIG
---------------------------------- */
const imagekit = new ImageKit({
  urlEndpoint: process.env.IK_URL_ENDPOINT,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
});

/* ----------------------------------
   GET GALLERY FILES
   GET /images/gallery
---------------------------------- */
export const getGallery = async (req, res, next) => {
  try {
    const {
      limit = 100,
      skip = 0,
      type, // image | video (optional)
    } = req.query;

    let files = await imagekit.listFiles({
      path: "gallery",
      limit: Number(limit),
      skip: Number(skip),
    });

    if (type) {
      files = files.filter((file) => file.fileType === type);
    }

    res.status(200).json(files);
  } catch (err) {
    console.error("Get Gallery Error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* ----------------------------------
   DELETE SINGLE FILE (ADMIN)
   POST /images/delete
---------------------------------- */
export const deleteImage = async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const role = req.auth?.sessionClaims?.metadata?.role;
    if (role !== "admin") return res.status(403).json({ error: "Admin only" });

    const { fileId } = req.body;
    if (!fileId) return res.status(400).json({ error: "fileId is required" });

    imagekit.deleteFile(fileId, (err, result) => {
      if (err) {
        console.error("ImageKit Delete Error:", err);
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({
        message: "File deleted successfully",
        result,
      });
    });
  } catch (err) {
    console.error("Delete Image Error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* ----------------------------------
   DELETE MULTIPLE FILES (ADMIN)
   POST /images/delete-multiple
---------------------------------- */
export const deleteMultipleImages = async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const role = req.auth?.sessionClaims?.metadata?.role;
    if (role !== "admin") return res.status(403).json({ error: "Admin only" });

    const { fileIds } = req.body;
    if (!Array.isArray(fileIds) || fileIds.length === 0) {
      return res.status(400).json({ error: "fileIds array is required" });
    }

    const results = [];

    for (const fileId of fileIds) {
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

    res.status(200).json({
      message: "Deletion completed",
      results,
    });
  } catch (err) {
    console.error("Delete Multiple Images Error:", err);
    res.status(500).json({ error: err.message });
  }
};
export const uploadImage = async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const role = req.auth?.sessionClaims?.metadata?.role;
    if (role !== "admin") return res.status(403).json({ error: "Admin only" });

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
      folder: "/gallery",
    });

    res.status(201).json(result);
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: err.message });
  }
};
