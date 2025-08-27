//backend\controllers\employerController.jss
// backend/controllers/employerController.js
const Employer = require("../models/Employer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerEmployer = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      companyName,
      companyId,
      companyWebsite,
      companyEmail,
      companyPhone,
      companyAddress
    } = req.body;

    const existing = await Employer.findOne({ email });
    if (existing) return res.status(400).json({ message: "Employer already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const employer = new Employer({
      name,
      email,
      password: hashed,
      role: "employer",
      company: {
        name: companyName,
        id: companyId,
        website: companyWebsite,
        email: companyEmail,
        phone: companyPhone,
        address: companyAddress
      }
    });

    await employer.save();

    const token = jwt.sign({ id: employer._id, role: "employer" }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({
      message: "Employer registered successfully",
      token,
      role: "employer",
      employer: { id: employer._id, email: employer.email, name: employer.name }
    });
  } catch (err) {
    console.error("registerEmployer error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.loginEmployer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employer = await Employer.findOne({ email });
    if (!employer) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, employer.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: employer._id, role: "employer" }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({
      message: "Login successful",
      token,
      role: "employer",
      employer: {
        id: employer._id,      // NOTE: `id` (not `_id`)
        email: employer.email,
        companyName: employer.companyName,
        name: employer.name
      }
    });

  } catch (err) {
    console.error("loginEmployer error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getEmployerProfile = async (req, res) => {
  try {
    const employer = await Employer.findById(req.user.id).select("-password");
    if (!employer) return res.status(404).json({ message: "Employer not found" });
    res.json(employer);
  } catch (err) {
    console.error("getEmployerProfile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
