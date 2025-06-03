import axios from "../api/axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

function VideoPlayer() {
  const { id } = useParams(); // Using dynamic routing to get the video ID from the URL.
  const { user } = useContext(AuthContext);

  const [video, setVideo] = useState([]);
  const [error, setError] = useState("");
  const [commentText, setCommentText] = useState("");

  // Here you would typically fetch the video data using the id.
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`/videos/${id}`);
        setVideo(response.data);
      } catch (error) {
        console.error("Error fetching video data:", error);
        setError("Failed to Load Video");
      }
    };
    fetchVideo();
  }, [id]);

  const handleLike = async () => {
    try {
      await axios.put(`/videos/${id}/like`);
      setVideo({ ...video, likes: [...video.likes, user._id] }); // simple re-render
    } catch (err) {
      console.error("Like error");
    }
  };

  const handleDislike = async () => {
    try {
      await axios.put(`/videos/${id}/dislike`);
      setVideo({ ...video, dislikes: [...video.dislikes, user._id] });
    } catch (err) {
      console.error("Dislike error");
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    try {
      const res = await axios.post(`/comments/${id}`, {
        text: commentText,
      });
      setVideo((prev) => ({
        ...prev,
        comments: [...prev.comments, res.data],
      }));
      setCommentText("");
    } catch (err) {
      console.error("Comment failed");
    }
  };

  if (error) return <p className="text-center mt-10">{error}</p>;
  if (!video) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Video player (placeholder or embed) */}
      <div className="w-full aspect-video bg-black mb-4 rounded-md" />

      {/* Title and info */}
      <h2 className="text-xl font-bold">{video.title}</h2>
      <div className="flex justify-between items-center text-sm text-gray-600">
        <div>
          <span className="flex gap-1 items-center">{video.views} views <FaEye />{" "}</span>
          {new Date(video.uploadDate).toLocaleDateString()}
        </div>
        <div className="flex gap-3">
          <button onClick={handleLike} className="hover:text-blue-500 flex">
            {" "}
            <AiFillLike className="text-xl" /> {video.likes?.length}
          </button>
          <button onClick={handleDislike} className="hover:text-red-500 flex">
            {" "}
            <AiFillDislike className="text-xl" /> {video.dislikes?.length}
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="my-3 text-gray-800">{video.description}</p>

      {/* Comments */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Comments</h3>

        {user ? (
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
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
          <p className="text-sm text-gray-500">Sign in to post a comment.</p>
        )}

        <div className="flex flex-col gap-3">
          {video.comments?.map((comment) => (
            <div key={comment._id} className="border-b pb-2">
              <p className="font-medium text-sm">
                {comment.userId?.username || "User"}
              </p>
              <p className="text-gray-700">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
