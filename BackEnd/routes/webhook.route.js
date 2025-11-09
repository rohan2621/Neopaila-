import express from "express";
import bodyParser from "body-parser";
import { clerkWebHook } from "../controllers/webhook.controller.js";

const router = express.Router();

// Clerk webhooks need raw body and NO auth guard
router.post(
  "/clerk",
  bodyParser.raw({ type: "application/json" }),
  clerkWebHook
);

export default router;
