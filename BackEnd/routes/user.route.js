import express from "express";
import {
  getUserSavedPosts,
  savedPosts,
} from "../controllers/user.controller.js";
const router = express.Router();
router.get("/saved", getUserSavedPosts);
router.patch("/save", savedPosts);
export default router;
