import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import { useLocation } from "react-router-dom";
import { useVideo } from "../context/VideoContext";

function Home() {
  const categories = [
    "All",
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

  const [activeCategory, setActiveCategory] = useState("All");
  const { videos, filteredVideos, setFilteredVideos } = useVideo();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    let filtered = [...videos];

    if (activeCategory !== "All") {
      filtered = filtered.filter(
        (video) =>
          video.category?.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    if (search) {
      filtered = filtered.filter((video) =>
        video.title.toLowerCase().includes(search)
      );
    }

    setFilteredVideos(filtered);
  }, [videos, activeCategory, search]);

  return (
    <div className="flex">
      <main className="flex-1 p-4 ml-0">
        {/* Category Filters */}
        <div className="flex justify-center flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1 text-sm rounded-full ${
                activeCategory === cat
                  ? "bg-zinc-900 text-white font-semibold"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        {filteredVideos.length === 0 ? (
          <p className="text-center text-gray-500">No videos found.</p>
        ) : (
          <div className="grid m-6 sm:m-0 gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
