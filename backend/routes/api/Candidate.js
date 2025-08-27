// backend/routes/api/candidates.js
const express = require("express");
const Candidate = require("../models/Candidate");
const router = express.Router();

// Get all candidates
router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch candidates" });
  }
});

module.exports = router;
