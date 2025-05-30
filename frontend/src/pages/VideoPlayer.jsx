import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios"; // your configured axios instance
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";

function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`/videos/${id}`);
        setVideo(res.data);
      } catch (err) {
        setError("Failed to load video");
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `/videos/${id}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      window.location.reload();
    } catch (err) {
      console.error("Like error", err);
    }
  };

  const handleDislike = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `/videos/${id}/dislike`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      window.location.reload();
    } catch (err) {
      console.error("Dislike error", err);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!video) return null;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Mock Video */}
      <div className="w-full aspect-video bg-black mb-4">
        <img
          src={video.thumbnailUrl}
          alt="thumbnail"
          className="object-cover w-full h-full"
        />
      </div>

      <h1 className="text-xl font-bold mb-2">{video.title}</h1>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-600">
          Uploaded by: {video.uploader.username}
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleLike}
            className="flex items-center gap-1 hover:text-blue-500"
          >
            <FiThumbsUp /> {video.likes?.length || 0}
          </button>
          <button
            onClick={handleDislike}
            className="flex items-center gap-1 hover:text-red-500"
          >
            <FiThumbsDown /> {video.dislikes?.length || 0}
          </button>
        </div>
      </div>

      <p className="text-sm mb-4">{video.description}</p>

      <hr className="my-4" />

      <h2 className="text-lg font-semibold mb-2">Comments</h2>
      {video.comments?.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul className="space-y-2">
          {video.comments.map((comment) => (
            <li key={comment._id} className="border-b pb-2">
              <p className="text-sm text-gray-800">{comment.text}</p>
              <p className="text-xs text-gray-500">
                {new Date(comment.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default VideoPlayer;
