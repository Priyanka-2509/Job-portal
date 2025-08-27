const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['candidate', 'employer'],
    default: 'candidate', // 🔥 this makes it optional
    required: true
  },

  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],

  resumeUrl: {
    type: String,
    default: null
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
