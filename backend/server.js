import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./Routes/authRoutes.js";
import commentRoutes from "./Routes/commentRoutes.js";
import channelRoutes from "./Routes/channelRoutes.js";
import videoRoutes from "./Routes/videoRoutes.js";

//Load environment variable
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.json());
app.use(cors());

//API Routes
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/videos", videoRoutes);

//Routes placeholder
// app.get("/", (req, res) => {
//   res.send("Youtube Clone API is running");
// });

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost: ${PORT}`)
    );
  })
  .catch((err) => console.log("MongoDB connection error:", err));
