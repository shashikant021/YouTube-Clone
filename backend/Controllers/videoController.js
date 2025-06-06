import Video from "../Models/Video.js";
import Channel from "../Models/Channel.js";
import mongoose from "mongoose";

// Upload a new video
export const uploadVideo = async (req, res) => {
  try {
    const { videoId, title, description, thumbnailUrl, channelId } = req.body;

    const newVideo = new Video({
      videoId,
      title,
      description,
      thumbnailUrl,
      videoUrl: req.body.videoUrl,
      channelId,
      category: req.body.category || "Other", // Default to "Other" if not provided
      uploader: req.user.id,
      views: 0,
      likes: [],
      dislikes: [],
    });

    const savedVideo = await newVideo.save();

    // Link to channel if exists
    const channel = await Channel.findById(channelId);
    if (channel) {
      channel.videos.push(savedVideo._id);
      await channel.save();
    }

    res.status(201).json(savedVideo);
  } catch (err) {
    console.error("Upload Video Error:", err);
    res.status(500).json({ error: "Failed to upload video" });
  }
};

// Get all videos
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate("uploader", "username")
      .populate("channelId", "channelName");
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};

// Get single video by ID
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId)
      .populate("uploader", "username")
      .populate("channelId", "channelName");
    if (!video) return res.status(404).json({ error: "Video not found" });
    res.status(200).json(video);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch video" });
  }
};

//  Update video
export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) return res.status(404).json({ error: "Video not found" });

    if (video.uploader.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const { title, description, thumbnailUrl, category } = req.body;

    if (title) video.title = title;
    if (description) video.description = description;
    if (thumbnailUrl) video.thumbnailUrl = thumbnailUrl;
    if (category) video.category = category;

    await video.save();
    res.status(200).json(video);
  } catch (err) {
    res.status(500).json({ error: "Failed to update video" });
  }
};

//  Delete video
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) return res.status(404).json({ error: "Video not found" });

    if (video.uploader.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await video.deleteOne();
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete video" });
  }
};

// Like a video
export const likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) return res.status(404).json({ error: "Video not found" });

    const userId = req.user.id;

    // Remove user from dislikes if present
    video.dislikes = video.dislikes.filter((id) => id.toString() !== userId);

    // Toggle like
    if (video.likes.includes(userId)) {
      video.likes = video.likes.filter((id) => id.toString() !== userId);
    } else {
      video.likes.push(userId);
    }

    await video.save();
    res
      .status(200)
      .json({ message: "Like updated", likes: video.likes.length });
  } catch (err) {
    // console.error(' Like Error:', err);
    res.status(500).json({ error: "Failed to update like" });
  }
};

// Dislike a video
export const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) return res.status(404).json({ error: "Video not found" });

    const userId = req.user.id;

    // Remove user from likes if present
    video.likes = video.likes.filter((id) => id.toString() !== userId);

    // Toggle dislike
    if (video.dislikes.includes(userId)) {
      video.dislikes = video.dislikes.filter((id) => id.toString() !== userId);
    } else {
      video.dislikes.push(userId);
    }

    await video.save();
    res
      .status(200)
      .json({ message: "Dislike updated", dislikes: video.dislikes.length });
  } catch (err) {
    res.status(500).json({ error: "Failed to update dislike" });
  }
};
