// backend/models/Candidate.js
// backend/models/Candidate.js
const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  skills: [String],
  education: [
    {
      degree: String,
      institution: String,
      year: Number,
    }
  ],
  resume: String, // path to uploaded resume
  role: { type: String, default: "candidate" }
});

//Prevent "Cannot overwrite model" error
module.exports =
  mongoose.models.Candidate || mongoose.model("Candidate", candidateSchema);
