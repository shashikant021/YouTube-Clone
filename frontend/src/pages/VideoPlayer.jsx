import axios from "../api/axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

function VideoPlayer() {
  const { id } = useParams(); // videoId from URL
  const { user } = useContext(AuthContext);
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");

  const fetchVideoData = async () => {
    try {
      const res = await axios.get(`/videos/${id}`);
      setVideo(res.data);
    } catch (err) {
      setError("Failed to load video");
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/comments/${id}`);
      setComments(res.data);
    } catch (err) {
      console.error("Failed to fetch comments");
    }
  };

  useEffect(() => {
    fetchVideoData();
    fetchComments();
  }, [id]);

  const handleLike = async () => {
    try {
      await axios.post(
        `/videos/${id}/like`,
        {},
        {
          headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
        }
      );
      fetchVideoData();
    } catch (err) {
      console.error("Like failed");
    }
  };

  const handleDislike = async () => {
    try {
      await axios.post(
        `/videos/${id}/dislike`,
        {},
        {
          headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
        }
      );
      fetchVideoData();
    } catch (err) {
      console.error("Dislike failed");
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    try {
      await axios.post(
        `/comments/${id}`,
        { text: commentText },
        {
          headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
        }
      );
      setCommentText("");
      fetchComments();
    } catch (err) {
      console.error("Comment failed");
    }
  };

  const getEmbedUrl = (url) => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : "";
};

  if (error) return <p className="text-center mt-10">{error}</p>;
  if (!video) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="aspect-video w-full mb-4 rounded overflow-hidden">
        <iframe
          src={getEmbedUrl(video.videoUrl)}
          className="w-full h-full"
          title="Video Player"
          allowFullScreen
        ></iframe>
      </div>

      <h2 className="text-xl font-bold">{video.title}</h2>

      <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
        <div className="flex gap-2 items-center">
          <FaEye /> {video.views} views
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleLike}
            className="hover:text-blue-600 flex items-center gap-1"
          >
            <AiFillLike /> {video.likes.length}
          </button>
          <button
            onClick={handleDislike}
            className="hover:text-red-600 flex items-center gap-1"
          >
            <AiFillDislike /> {video.dislikes.length}
          </button>
        </div>
      </div>

      <p className="text-gray-800 my-4">{video.description}</p>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Comments</h3>

        {user ? (
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 border rounded px-3 py-1"
            />
            <button
              onClick={handleComment}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Post
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-500">Login to post a comment</p>
        )}

        <div className="flex flex-col gap-3">
          {comments.map((c) => (
            <div key={c._id} className="border-b pb-2">
              <p className="font-medium text-sm">{c.userId.username}</p>
              <p className="text-gray-700">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
