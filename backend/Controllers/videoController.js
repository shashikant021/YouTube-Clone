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
      channelId,
      uploader: req.user.id,
      views: 0,
      likes: 0,
      dislikes: 0,
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
    const videos = await Video.find().populate("uploader", "username");
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

    const { title, description, thumbnailUrl } = req.body;

    if (title) video.title = title;
    if (description) video.description = description;
    if (thumbnailUrl) video.thumbnailUrl = thumbnailUrl;

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
    if (!video) return res.status(404).json({ error: 'Video not found' });

    if (video.uploader.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await video.deleteOne();
    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete video' });
  }
};