import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/jobs');
        if (!res.ok) throw new Error('Failed to fetch jobs');
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <div className="text-center mt-10 text-xl">Loading jobs...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600">Available Jobs</h1>
      <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div key={job._id} className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h2>
            <p className="text-gray-600 mb-1">Company: {job.company}</p>
            <p className="text-gray-600 mb-1">Location: {job.location}</p>
            <p className="text-gray-600 mb-4">Type: {job.type}</p>
            <Link
              to={`/jobs/${job._id}`}
              className="inline-block mt-2 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
