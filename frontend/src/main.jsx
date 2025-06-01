import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import "./index.css";
import { VideoProvider } from "./context/VideoContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <VideoProvider>
    {" "}
    <AuthProvider>
      <App />
    </AuthProvider>
  </VideoProvider>
);
