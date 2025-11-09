import express from "express";
import { getPosts } from "../controllers/post.controller.js";
import { getPost } from "../controllers/post.controller.js";
import { createPost } from "../controllers/post.controller.js";
import { deletePost } from "../controllers/post.controller.js";
const router = express.Router();

router.get("/", getPosts);
router.get("/:slug", getPost);
router.post("/", createPost);
router.delete("/:id", deletePost);

export default router;
