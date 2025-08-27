const express = require("express");
const Application = require("../models/Application");
const Candidate = require("../models/Candidate");
const router = express.Router();

// Get candidate's job applications
router.get("/:candidateId/applications", async (req, res) => {
  try {
    const applications = await Application.find({ candidateId: req.params.candidateId });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

module.exports = router;
