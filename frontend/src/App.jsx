import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import VideoPlayer from "./pages/VideoPlayer";
import Channel from "./pages/Channel";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./routes/ProtectedRoute";
import UploadVideo from "./pages/UploadVideo";
import EditVideo from "./pages/EditVideo";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router>
      <Header toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      <div className="flex relative">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="flex-1 transition-all duration-300">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/video/:id"
              element={
                <ProtectedRoute>
                  {" "}
                  <VideoPlayer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/channel/:channelId"
              element={
                <ProtectedRoute>
                  <Channel />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/upload" element={<UploadVideo />} />
            <Route path="/edit-video/:videoId" element={<EditVideo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
