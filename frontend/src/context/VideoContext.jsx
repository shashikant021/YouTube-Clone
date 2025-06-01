import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";

const VideoContext = createContext();

export const useVideo = () => useContext(VideoContext);

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("/videos");
        setVideos(res.data);
        setFilteredVideos(res.data);
      } catch (err) {
        console.error("Error fetching videos", err);
      }
    };
    fetchVideos();
  }, []);

  const handleSearch = () => {
    const filtered = videos.filter((video) =>
      video.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredVideos(filtered);
    setSearch("");
  };

  return (
    <VideoContext.Provider
      value={{
        videos,
        filteredVideos,
        setFilteredVideos,
        search,
        setSearch,
        handleSearch,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
