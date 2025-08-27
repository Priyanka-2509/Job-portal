const express = require("express");
const router = express.Router();

const { register, login, getProfile } = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");

// Register new user
router.post("/register", register);

// Login user
router.post("/login", login);

// Get user profile (protected route)
router.get("/profile", verifyToken, getProfile);

module.exports = router;

