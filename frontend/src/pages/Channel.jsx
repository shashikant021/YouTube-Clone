import { useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ChannelPage = () => {
  const { user } = useContext(AuthContext);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    channelName: "",
    description: "",
    channelBanner: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/channels/user/${user._id}`, {
          headers: { Authorization: `JWT ${token}` },
        });
        setChannel(res.data);
      } catch (err) {
        // No channel found, keep form visible
        setChannel(null);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchChannel();
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateChannel = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/channels", formData, {
        headers: { Authorization: `JWT ${token}` },
      });
      localStorage.setItem("channelId", res.data._id);
      setChannel(res.data);
    } catch (err) {
      console.error("Create channel failed", err.response?.data || err.message);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/videos/${videoId}`, {
        headers: { Authorization: `JWT ${token}` },
      });
      setChannel((prev) => ({
        ...prev,
        videos: prev.videos.filter((v) => v._id !== videoId),
      }));
    } catch (err) {
      console.error("Failed to delete video", err);
    }
  };

  if (!user)
    return <p className="text-center text-xl mt-10">Please login first.</p>;
  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {!channel ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Create Your Channel</h2>
          <form onSubmit={handleCreateChannel} className="space-y-4">
            <input
              type="text"
              name="channelName"
              placeholder="Channel Name"
              value={formData.channelName}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              required
            />
            <textarea
              name="description"
              placeholder="Channel Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              required
            />
            <input
              type="text"
              name="channelBanner"
              placeholder="Banner URL (optional)"
              value={formData.channelBanner}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800"
            >
              Create Channel
            </button>
          </form>
        </div>
      ) : (
        <div>
          {channel.channelBanner && (
            <img
              src={channel.channelBanner}
              alt="Channel Banner"
              className="w-full h-48 object-cover rounded mb-6"
            />
          )}
          <h2 className="text-3xl font-bold">{channel.channelName}</h2>
          <p className="text-gray-600 mb-4">{channel.description}</p>
          {/* //Display channel owner */}
          <div className="text-sm mb-6 font-bold flex items-center gap-5">
            <p>
              {" "}
              Owned by:{" "}
              <span className="font-medium">
                {" "}
                {channel.owner?.username || "Unknown User"}
              </span>
            </p>

            <button className="font-bold bg-zinc-700 py-1 px-4 rounded-2xl hover:bg-zinc-900 text-white">
              Subscribe
            </button>
          </div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold mb-3">Your Videos</h3>
            <button
              onClick={() => navigate("/upload")}
              className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
            >
              Upload New Video
            </button>
          </div>
          {channel.videos.length === 0 ? (
            <p className="text-gray-500">No videos uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {channel.videos.map((video) => (
                <div
                  key={video._id}
                  className="border p-3 rounded shadow-md bg-white"
                >
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h4 className="font-bold mt-2 truncate">{video.title}</h4>
                  <p className="text-sm text-gray-500">
                    {video.description?.slice(0, 60)}...
                  </p>
                  <div className="flex justify-between mt-3 gap-4 flex-wrap">
                    <button
                      onClick={() => navigate(`/edit-video/${video._id}`)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteVideo(video._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChannelPage;
