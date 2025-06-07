import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const categories = [
  "Movies",
  "Music",
  "TV Show",
  "Gaming",
  "Education",
  "News",
  "Sports",
  "Travel",
  "Food",
  "Other",
];

function EditVideo() {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnailUrl: "",
    category: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`/videos/${videoId}`);
        setVideo(res.data);
        setFormData({
          title: res.data.title,
          description: res.data.description,
          thumbnailUrl: res.data.thumbnailUrl,
          category: res.data.category || "Other",
        });
      } catch (err) {
        setError("Failed to load video");
      }
    };

    fetchVideo();
  }, [videoId]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.put(`/videos/${videoId}`, formData, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });

      navigate("/channel/my");
    } catch (err) {
      setError("Failed to update video");
    }
  };

  if (!video) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Edit Video</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleUpdate} className="space-y-4">
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
        <input
          name="thumbnailUrl"
          placeholder="Thumbnail URL"
          value={formData.thumbnailUrl}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-800"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditVideo;
