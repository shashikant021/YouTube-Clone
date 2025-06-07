import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "../api/axios";

function UploadVideo() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    videoUrl: "",
    thumbnailUrl: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const generateVideoId = () => {
    return "vid_" + Date.now().toString(36);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const channelId = localStorage.getItem("channelId"); // stored after login/channel creation
    console.log("Uploading to channelId:", channelId);
    if (!channelId) {
      setError("No channel found. Please create a channel first.");
      return;
    }

    const payload = {
      videoId: generateVideoId(),
      title: formData.title,
      description: formData.description,
      thumbnailUrl: formData.thumbnailUrl,
      videoUrl: formData.videoUrl,
      channelId,
      category: formData.category || "Other",
    };

    try {
      await axios.post("/videos", payload, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      navigate("/channel/my");
    } catch (err) {
      setError(err.response?.data?.error || "Upload failed");
    }
    console.log("Uploading:", payload);
  };

  if (!user) return <p className="text-center mt-10">Please login first.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Upload New Video</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Video Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Video Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        {/* Category Dropdown */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded bg-white"
        >
          <option value="">Select a Category</option>
          <option value="Movies">Movies</option>
          <option value="Music">Music</option>
          <option value="TV Show">TV Show</option>
          <option value="Gaming">Gaming</option>
          <option value="Education">Education</option>
          <option value="News">News</option>
          <option value="Sports">Sports</option>
          <option value="Travel">Travel</option>
          <option value="Food">Food</option>
          <option value="Other">Other</option>
        </select>
        <input
          name="videoUrl"
          placeholder="Video URL"
          value={formData.videoUrl}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="thumbnailUrl"
          placeholder="Thumbnail URL"
          value={formData.thumbnailUrl}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-800"
        >
          Upload Video
        </button>
      </form>
    </div>
  );
}

export default UploadVideo;
