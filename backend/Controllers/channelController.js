import Channel from "../Models/Channel.js";
import Video from "../Models/Video.js"

// Create a new channel
export const createChannel = async (req, res) => {
  try {
    const { channelName, description, channelBanner } = req.body;

    const newChannel = new Channel({
      channelName,
      description,
      channelBanner,
      owner: req.user.id,
    });
    await newChannel.save();
    res.status(201).json(newChannel);
  } catch (error) {
    console.error("Create Channel Error:", error);
    res.status(500).json({ error: "Failed to create channel" });
  }
};

// Get all channels
export const getAllChannels = async (req, res) => {
  try {
    const channels = await Channel.find().populate('owner', 'username');
    res.status(200).json(channels);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch channels' });
  }
};

// Get channel by user ID
export const getChannelByUser = async (req, res) => {
  try {
    const channel = await Channel.findOne({ owner: req.params.userId })
      .populate('videos')
      .populate('owner', 'username');
    if (!channel) return res.status(404).json({ error: 'Channel not found' });
    res.status(200).json(channel);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch channel' });
  }
};

// Get a specific channel by ID
export const getChannelById = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.channelId)
      .populate('owner', 'username')
      .populate('videos');
    if (!channel) return res.status(404).json({ error: 'Channel not found' });

    res.status(200).json(channel);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch channel' });
  }
};