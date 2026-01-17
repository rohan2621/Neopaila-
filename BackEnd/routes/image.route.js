import express from "express";
import upload from "../middleware/upload.js";
import {
  getGallery,
  uploadImage,
  deleteImage,
  deleteMultipleImages,
} from "../controllers/image.controller.js";

const router = express.Router();

router.get("/gallery", getGallery);
router.post("/gallery", upload.single("file"), uploadImage);
router.post("/delete", deleteImage);
router.post("/delete-multiple", deleteMultipleImages);

export default router;
