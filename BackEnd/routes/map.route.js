import express from "express";
import {
  getMaps,
  getMap,
  createMap,
  deleteMap,
  uploadAuth,
  featureMap,
  deleteUpload,
} from "../controllers/map.controller.js";

import increaseVisit from "../middleware/increaseVisit.js";

const router = express.Router();

/* ------------------------- */
// IMAGEKIT AUTH (MAPS)
router.get("/upload-auth", uploadAuth);

/* ------------------------- */
// DELETE SINGLE IMAGE (MAP)
router.post("/uploads/delete", deleteUpload);

/* ------------------------- */
// FEATURE MAP
router.patch("/feature", featureMap);

/* ------------------------- */
// GET MAPS
router.get("/", increaseVisit, getMaps);

/* ------------------------- */
// CREATE MAP
router.post("/", createMap);

/* ------------------------- */
// DELETE MAP
router.delete("/:id", deleteMap);

/* ------------------------- */
// GET MAP BY SLUG (⚠️ MUST BE LAST)
router.get("/:slug", getMap);

export default router;
