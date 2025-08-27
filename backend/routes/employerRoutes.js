// backend/routes/employerRoutes.js
const express = require("express");
const router = express.Router();
const Employer = require("../models/Employer");
const Job = require("../models/job");
const { registerEmployer, loginEmployer } = require("../controllers/employerController");
const { verifyToken } = require("../middleware/authMiddleware");

// Signup / Login
router.post("/register", registerEmployer);
router.post("/login", loginEmployer);

// Profile (protected)
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const employer = await Employer.findById(req.user.id).select("-password");
    if (!employer) return res.status(404).json({ message: "Employer not found" });
    res.json(employer.company || {});
  } catch (err) {
    console.error("GET /api/employers/profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/profile", verifyToken, async (req, res) => {
  try {
    const employer = await Employer.findById(req.user.id);
    if (!employer) return res.status(404).json({ message: "Employer not found" });
    employer.company = { ...employer.company, ...req.body };
    await employer.save();
    res.json({ message: "Profile updated", company: employer.company });
  } catch (err) {
    console.error("PUT /api/employers/profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Dashboard Stats (protected)
router.get("/stats", verifyToken, async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.user.id }).lean();
    const totalJobs = jobs.length;
    const totalApplicants = jobs.reduce((sum, j) => sum + (j.applications?.length || 0), 0);
    let mostPopularJob = "N/A";
    if (jobs.length) {
      const top = [...jobs].sort(
        (a, b) => (b.applications?.length || 0) - (a.applications?.length || 0)
      )[0];
      mostPopularJob = top?.title || "N/A";
    }
    res.json({ totalJobs, totalApplicants, mostPopularJob });
  } catch (err) {
    console.error("GET /api/employers/stats error:", err);
    res.status(500).json({ message: "Server error in /stats" });
  }
});

/**
 * NEW: List all applicants across all jobs owned by this employer
 * GET /api/employers/:employerId/applicants
 */
router.get("/:employerId/applicants", verifyToken, async (req, res) => {
  try {
    // only allow self
    if (req.params.employerId !== req.user.id) return res.status(403).json({ message: "Not authorized" });

    const jobs = await Job.find({ employer: req.params.employerId })
      .populate("applications.candidate", "name email skills resume")
      .lean();

    const applicants = [];
    for (const job of jobs) {
      for (const app of (job.applications || [])) {
        applicants.push({
          _id: app._id,
          status: app.status,
          candidate: app.candidate || null,
          appliedAt: app.appliedAt,
          job: { id: job._id, title: job.title },
        });
      }
    }

    res.json(applicants);
  } catch (err) {
    console.error("GET /api/employers/:employerId/applicants error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
