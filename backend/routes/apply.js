// backend/routes/apply.js
const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const router = express.Router();
const Job = require('../models/job'); // IMPORTANT: Use the Job model to find the employer

// Configure Multer for file uploads (storing in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Configure Nodemailer transporter with Gmail App Password
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS  // Your Gmail App Password
  }
});

// POST /api/apply — Handles job application
router.post('/', upload.single('resume'), async (req, res) => {
  try {
    // 1. Extract data from the request
    const { name, email, coverLetter, jobId } = req.body;
    const resumeFile = req.file;

    if (!resumeFile) {
      return res.status(400).json({ message: 'Resume file is required.' });
    }

    // 2. Find the job and its associated employer's email
    const job = await Job.findById(jobId).populate('employer', 'email');
    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }
    if (!job.employer || !job.employer.email) {
        return res.status(500).json({ message: 'Could not find employer email for this job.' });
    }

    // 3. Add the new application to the job's applications array
    job.applications.push({
        // Assuming your applicationSchema needs a candidate ID, name, email etc.
        // This part depends on your exact 'applicationSchema' in the Job model.
        // For now, let's assume it stores name and email directly.
        name: name,
        email: email,
        // You would also save the resume path/buffer here if your schema supports it
    });
    await job.save();


    // 4. Send Email with the dynamic employer's email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: job.employer.email, // Use the fetched employer's email
      subject: `New Application for "${job.title}": ${name}`,
      text: `You have a new application for your job posting "${job.title}".\n\nName: ${name}\nEmail: ${email}\n\nCover Letter:\n${coverLetter}`,
      attachments: [
        {
          filename: resumeFile.originalname,
          content: resumeFile.buffer,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send({ message: 'Application sent and saved successfully!' });
  } catch (error) {
    console.error('❌ Error submitting application:', error);
    res.status(500).send({ error: 'Failed to send application.' });
  }
});

module.exports = router;
