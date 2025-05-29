import express from "express";
import {
  createChannel,
  getAllChannels,
  getChannelById,
} from "../Controllers/channelController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

// POST /api/channels/ → Create a new channel
router.post("/", authMiddleware, createChannel);

// GET /api/channels/ → Get all channels
router.get("/", getAllChannels);

// GET /api/channels/:channelId → Get a specific channel
router.get("/:channelId", getChannelById);

export default router;
