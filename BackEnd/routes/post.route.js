import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  uploadAuth,
  featurePost,
} from "../controllers/post.controller.js";

import increaseVisit from "../middleware/increaseVisit.js";

const router = express.Router();

router.get("/upload-auth", uploadAuth);

router.patch("/feature", featurePost);

router.get("/", increaseVisit, getPosts);

router.post("/", createPost);

router.delete("/:id", deletePost);

router.get("/:slug", getPost);

export default router;
