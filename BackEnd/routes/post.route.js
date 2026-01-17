import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  uploadAuth,
  featurePost,
  deleteUpload, // <- import the updated one
} from "../controllers/post.controller.js";

import increaseVisit from "../middleware/increaseVisit.js";

const router = express.Router();

/* ------------------------- */
// IMAGEKIT AUTH
router.get("/upload-auth", uploadAuth);

/* ------------------------- */
// DELETE SINGLE IMAGE (POST)
router.post("/uploads/delete", deleteUpload);

/* ------------------------- */
// FEATURE POST
router.patch("/feature", featurePost);

/* ------------------------- */
// GET POSTS
router.get("/", increaseVisit, getPosts);

/* ------------------------- */
// CREATE POST
router.post("/", createPost);

/* ------------------------- */
// DELETE POST
router.delete("/:id", deletePost);

/* ------------------------- */
// GET POST BY SLUG (MUST BE LAST)
router.get("/:slug", getPost);

export default router;
