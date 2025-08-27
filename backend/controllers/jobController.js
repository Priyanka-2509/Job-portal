const Job = require("../models/job"); // Adjust the path as needed

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get job by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const createJob = async (req, res) => {
  try {
    const { title, description, location, salary } = req.body;

    const job = new Job({
      title,
      description,
      location,
      salary,
      employer: req.user.id // link job to logged-in employer
    });

    await job.save();
    res.status(201).json({ message: "Job created successfully", job });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllJobs, getJobById ,createJob };
