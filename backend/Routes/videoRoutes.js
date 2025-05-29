import express from "express";
import {
  deleteVideo,
  dislikeVideo,
  getAllVideos,
  getVideoById,
  likeVideo,
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
// Like a video
router.post("/:videoId/like", authMiddleware, likeVideo);

// Dislike a video
router.post("/:videoId/dislike", authMiddleware, dislikeVideo);

export default router;
