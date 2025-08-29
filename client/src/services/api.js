// src/services/api.js
// src/services/api.js
import axios from "axios";

// Base URL comes from .env (frontend)
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Create axios instance
const API = axios.create({
  baseURL: API_URL,
});

// Attach JWT automatically to all requests
API.interceptors.request.use((req) => {
  const t = localStorage.getItem("token");
  if (t) req.headers.Authorization = `Bearer ${t}`;
  return req;
});

// All jobs
export const getJobs = () => API.get("/jobs");

export const employerRegister = (formData) => API.post("/employers/register", formData);



// Employer stats
export const getEmployerStats = () => API.get("/employers/stats");

// Employer-owned job list
export const getMyJobs = () => API.get("/jobs/employers/joblist");

// Applicants across employer’s jobs
export const getApplicants = async (employerId) => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/employers/${employerId}/applicants`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


// Company profile
export const getCompanyProfile = () => API.get("/employers/profile");

export const getEmployerProfile = async (token) => {
  return axios.get(`${API_URL}/employers/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateEmployerProfile = async (token, profileData) => {
  return axios.put(`${API_URL}/employers/profile`, profileData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ Fetch applicants for a given job
export const getApplicantsByJob = (jobId) =>
  API.get(`/jobs/${jobId}/applicants`);

export default API;
