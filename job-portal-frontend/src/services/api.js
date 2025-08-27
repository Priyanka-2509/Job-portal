// src/services/api.js
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Attach JWT automatically
API.interceptors.request.use((req) => {
  const t = localStorage.getItem("token");
  if (t) req.headers.Authorization = `Bearer ${t}`;
  return req;
});

export const getEmployerStats = () => API.get("/employers/stats");

// new helper for job list (employer-owned)
export const getMyJobs = () => API.get("/jobs/employers/joblist");


// list all applicants across this employer’s jobs
export const getApplicants = async (employerId) => {
  const token = localStorage.getItem("token");
  return axios.get(`http://localhost:5000/api/employers/${employerId}/applicants`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getApplicantsByJob = async (jobId) => {
  const token = localStorage.getItem("token");
  return axios.get(`http://localhost:5000/api/applications/${jobId}/applicants`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getCompanyProfile = () => API.get("/employers/profile");

export default API;

