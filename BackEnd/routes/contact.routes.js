import express from "express";
import {
  createContact,
  getContacts,
  replyContact,
} from "../controllers/contact.controller.js";

import { requireAdmin } from "../middleware/requireAdmin.js";
import { contactRateLimit } from "../middleware/contactRateLimit.js";

const router = express.Router();

/* 🌍 PUBLIC */
router.post("/", contactRateLimit, createContact);

/* 🔐 ADMIN */
router.get("/", requireAdmin, getContacts);
router.post("/:id/reply", requireAdmin, replyContact);

export default router;
