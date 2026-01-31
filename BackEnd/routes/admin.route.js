import express from "express";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { getAdminStats } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/stats", requireAdmin, getAdminStats);

export default router;
