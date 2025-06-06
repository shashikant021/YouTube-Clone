import { Link } from "react-router-dom";

function VideoCard({ video }) {
  return (
    <Link to={`/video/${video._id}`} className="block my-2">
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="w-full rounded-md h-40 object-cover"
      />
      <div className="mt-2">
        <h3 className="font-semibol truncate">{video.title}</h3>

        <p className="text-sm text-gray-600">
          {video.channelId?.channelName || "Unknown Channel"}
        </p>
        <p>{video.views}</p>
      </div>
    </Link>
  );
}

export default VideoCard;
