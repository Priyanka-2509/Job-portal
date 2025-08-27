//backend\models\Employer.js
// backend/models/Employer.js
const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  company: {
    name: String,
    id: String,
    website: String,
    email: String,
    phone: String,
    address: String,
    logo: String,
    description: String,
    location: String
  },
  role: { type: String, default: "employer" }
});

module.exports = mongoose.model("Employer", employerSchema);

