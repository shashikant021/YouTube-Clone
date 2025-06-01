import express from "express";
import { loginUser, registerUser } from "../Controllers/authController.js";
import authMiddleware from "../Middleware/authMiddleware.js";
import User from "../Models/User.js";

const router = express.Router();

//Register new user
router.post("/register", registerUser);

//Login user and return JWT
router.post("/login", loginUser);

// Get currently logged in user
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("/me error:", err);
    res.status(500).json({ error: "Failed to fetch user info" });
  }
});

export default router;
