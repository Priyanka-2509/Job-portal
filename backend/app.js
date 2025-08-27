///backend/app.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Route imports
const applicationRoutes = require('./routes/api/applications'); 
const applyRoute = require('./routes/apply');
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const employerRoutes = require("./routes/employerRoutes.js");
const candidateRoutes = require("./routes/CandidateRoutes");


// Load environment variables
dotenv.config();


// Connect to the database
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use('/api/apply', applyRoute); // ✅ correctly moved here
app.use('/api/employers', employerRoutes);
app.use("/api/candidate", candidateRoutes);
app.use("/uploads", express.static("uploads"));




// Start server
//const PORT = process.env.PORT || 5000;
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


