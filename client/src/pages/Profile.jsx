import React, { useEffect, useState } from "react";
import API from "../services/api";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:5000/api/auth/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
     .then(res => res.json())
     .then(data => {
        setUser(data);
        console.log("User data:", data);
     })
      .catch(err => console.error("Error fetching profile:", err));
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-page">
      <h2>Welcome, {user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <h3>Jobs Applied For:</h3>
      <ul>
        {user.appliedJobs.length === 0 ? (
          <li>No jobs applied yet.</li>
        ) : (
          user.appliedJobs.map((job) => (
            <li key={job._id}>{job.title}</li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Profile;
