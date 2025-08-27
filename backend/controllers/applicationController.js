const sendMail = require('../utils/emailService'); // adjust path if needed
const Application = require('../models/Application');

const applyForJob = async (req, res) => {
  try {
    const { name, email, jobId } = req.body;
    const resume = req.file.path; // if you use multer for file upload

    // Save to DB
    const application = new Application({
  job: jobId,
  candidate: req.user.id,
  resumeUrl: resume, // path from multer
});


    await application.save();

    // Send confirmation email
    await transporter.sendMail({
  from: '"Job Portal" <kumari.priyanka2707@gmail.com>',
  to: user.email,
  subject: "Job Application Received",
  text: "You have successfully applied for the job. We’ll get back to you soon.",
});


    res.status(200).json({ message: 'Application submitted and confirmation email sent.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong while applying.' });
  }
};

module.exports = { applyForJob };
