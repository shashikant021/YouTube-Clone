import express from "express";
import {
  createChannel,
  getAllChannels,
  getChannelById,
  getChannelByUser,
} from "../Controllers/channelController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

// POST /api/channels/ → Create a new channel
router.post("/", authMiddleware, createChannel);

// GET /api/channels/ → Get all channels
router.get("/", getAllChannels);

// GET /api/channels/user/:userId → Get a specific channel by user ID
router.get("/user/:userId", getChannelByUser);

// GET /api/channels/:channelId → Get a specific channel
router.get("/:channelId", getChannelById);

export default router;
