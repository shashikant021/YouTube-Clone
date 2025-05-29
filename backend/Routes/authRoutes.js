import express from "express";
import { loginUser, registerUser } from "../Controllers/authController.js";

const router = express.Router();

//Register new user
router.post("/register", registerUser);

//Login user and return JWT
router.post("/login", loginUser);

export default router;
