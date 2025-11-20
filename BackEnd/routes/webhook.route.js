import express from "express";
import bodyParser from "body-parser";
import { clerkWebHook } from "../controllers/webhook.controller.js";

const router = express.Router();

// Clerk requires the raw body (not parsed JSON)
router.post(
  "/clerk",
  bodyParser.raw({ type: "application/json" }),
  clerkWebHook
);

export default router;
