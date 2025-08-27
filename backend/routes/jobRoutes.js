// backend/routes/jobRoutes.js
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Job = require("../models/job");          // <- keep filename casing consistent
const { verifyToken } = require("../middleware/authMiddleware");

// Post a new job (employer only)
router.post("/post", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "employer") return res.status(403).json({ error: "Access denied" });

    const { company, title, type, location, salary, description } = req.body;

    const job = new Job({
      company,
      title,
      type,
      location,
      salary,
      description,
      employer: req.user.id, // <- IMPORTANT
    });

    await job.save();
    res.status(201).json({ message: "Job posted successfully", job });
  } catch (err) {
    console.error("POST /api/jobs/post error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

/**
 * NEW: List jobs posted by the logged-in employer
 * GET /api/jobs/employers/joblist
 */
router.get("/employers/joblist", verifyToken, async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.user.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error("GET /api/jobs/employers/joblist error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get applicants for a job (only the owner can see)
router.get("/:jobId/applicants", verifyToken, async (req, res) => {
  try {
    const applications = await Application.find({ jobId: { $in: jobIds } })
      .populate("candidateId", "name email resume")
      .populate("jobId", "title");


    if (!job) return res.status(404).json({ message: "Job not found" });
    if (String(job.employer) !== req.user.id) return res.status(403).json({ message: "Not authorized" });

    res.json(job.applications || []);
  } catch (err) {
    console.error("GET /api/jobs/:jobId/applicants error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Accept/Reject an applicant (owner only)
router.put("/:jobId/applicants/:appId", verifyToken, async (req, res) => {
  try {
    const { status } = req.body; // "accepted" | "rejected" | "pending"
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });
    if (String(job.employer) !== req.user.id) return res.status(403).json({ message: "Not authorized" });

    const applicant = job.applications.id(req.params.appId);
    if (!applicant) return res.status(404).json({ message: "Applicant not found" });

    applicant.status = status;
    await job.save();
    res.json({ message: "Applicant status updated", applicant });
  } catch (err) {
    console.error("PUT /api/jobs/:jobId/applicants/:appId error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Public list (unchanged)
router.get("/", async (_req, res) => {
  try {
    const jobs = await Job.find({});
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Server error while fetching jobs" });
  }
});

// Get single job (MODIFIED)
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid job ID format" });
  }

  try {
    // THIS IS THE CHANGE: .populate() will fetch the linked employer's email
    const job = await Job.findById(id).populate('employer', 'email'); 
    
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

