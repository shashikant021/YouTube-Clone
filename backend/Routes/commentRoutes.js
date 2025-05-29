import express from "express";
import {
  addComment,
  deleteComment,
  getCommentsByVideo,
  updateComment,
} from "../Controllers/commentController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

// POST /api/comments/:videoId - Add comment
router.post("/:videoId", authMiddleware, addComment);

// GET /api/comments/:videoId - Get all comments for video
router.get("/:videoId", getCommentsByVideo);

// PUT /api/comments/:commentId - Update comment
router.put("/:commentId", authMiddleware, updateComment);

// DELETE /api/comments/:commentId - Delete comment
router.delete("/:commentId", authMiddleware, deleteComment);

export default router;
