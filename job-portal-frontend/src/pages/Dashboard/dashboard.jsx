import React from "react";
import { FaChartBar, FaBriefcase, FaUsers, FaBuilding, FaPlus } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-700 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold tracking-wide border-b border-blue-600">
          Employer Dashboard
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-4">
            <li className="flex items-center space-x-3 p-3 rounded-md hover:bg-blue-600 cursor-pointer">
              <FaChartBar /> <span>Stats</span>
            </li>
            <li className="flex items-center space-x-3 p-3 rounded-md hover:bg-blue-600 cursor-pointer">
              <FaBriefcase /> <span>Job Management</span>
            </li>
            <li className="flex items-center space-x-3 p-3 rounded-md hover:bg-blue-600 cursor-pointer">
              <FaUsers /> <span>Applicants</span>
            </li>
            <li className="flex items-center space-x-3 p-3 rounded-md hover:bg-blue-600 cursor-pointer">
              <FaBuilding /> <span>Company Profile</span>
            </li>
            <li className="flex items-center space-x-3 p-3 rounded-md hover:bg-blue-600 cursor-pointer">
              <FaPlus /> <span>Post a Job</span>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-blue-600 text-sm text-gray-200">
          © 2025 JobPortal
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back 👋</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-700">Total Jobs</h2>
            <p className="mt-2 text-2xl font-bold text-blue-700">24</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-700">Applicants</h2>
            <p className="mt-2 text-2xl font-bold text-blue-700">102</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-700">Profile Views</h2>
            <p className="mt-2 text-2xl font-bold text-blue-700">356</p>
          </div>
        </div>

        {/* Placeholder for Detailed Components */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
          <p className="text-gray-600">
            Here you can manage jobs, track applicants, update your company profile, and monitor stats.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
