//backend\routes\api\applications.js
// backend/routes/api/applications.js
const express = require("express");
const multer = require("multer");
const Job = require("../../models/job");
const Candidate = require("../../models/Candidate"); // ✅ Import Candidate model
const { authenticateUser } = require('../../middleware/authMiddleware.js'); 
const { applyForJob } = require("../../controllers/applicationController"); 

const router = express.Router();

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// ✅ Route to upload resume and save candidate data
// backend/routes/api/applications.js
router.post('/upload-resume', upload.single('resume'), async (req, res) => {
  try {
    const { candidateId, jobId, name, email, coverLetter } = req.body;

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) return res.status(404).json({ error: 'Candidate not found' });

    const application = new Application({
      name,
      email,
      coverLetter,
      jobId,
      candidateId, // 👈 link candidate
      resume: {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
      },
    });

    await application.save();

    res.status(200).json({ success: true, application });
  } catch (err) {
    console.error("Upload Resume Error:", err);
    res.status(500).json({ error: 'Failed to upload resume' });
  }
});


// ✅ Route to get applicants for a job
router.get("/:jobId/applicants", async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId)
      .populate({
        path: "applications",
        populate: {
          path: "candidateId", // ✅ populate candidate info inside application
          model: "Candidate"
        }
      });

    if (!job) return res.status(404).json({ error: "Job not found" });

    res.json(job.applications);
  } catch (err) {
    console.error("Error fetching applicants:", err);
    res.status(500).json({ error: "Failed to fetch applicants" });
  }
});

module.exports = router;
