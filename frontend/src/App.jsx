import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import VideoPlayer from "./pages/VideoPlayer";
import Channel from "./pages/Channel";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Router>
      <Header toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      <div className="flex">
        {isSidebarOpen && <Sidebar />}
        <div className="flex-1">
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
