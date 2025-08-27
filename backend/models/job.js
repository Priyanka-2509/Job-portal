// backend/models/job.js
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // or "Candidate" if that’s your model name
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
    appliedAt: { type: Date, default: Date.now }
  },
  { _id: true }
);

const jobSchema = new mongoose.Schema(
  {
    company: String,
    title: String,
    type: { type: String, enum: ["full-time", "part-time", "contract", "internship", "freelance"] },
    location: String,
    salary: String,
    description: String,
    employer: { type: mongoose.Schema.Types.ObjectId, ref: "Employer", required: true }, // <-- IMPORTANT
    applications: [applicationSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);


