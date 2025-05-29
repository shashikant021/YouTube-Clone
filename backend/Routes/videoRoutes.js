import express from "express";
import {
  deleteVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  uploadVideo,
} from "../Controllers/videoController.js";

import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, uploadVideo);
router.get("/", getAllVideos);
router.get("/:videoId", getVideoById);
router.put("/:videoId", authMiddleware, updateVideo);
router.delete("/:videoId", authMiddleware, deleteVideo);

export default router;
