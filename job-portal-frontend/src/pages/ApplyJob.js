// src/pages/ApplyJob.js
import { useParams } from 'react-router-dom';

export default function ApplyJob() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-blue-50 px-6 py-10 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Apply for Job #{id}</h2>

      <form className="bg-white p-6 rounded-lg shadow space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border border-gray-300 px-4 py-2 rounded-md"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 px-4 py-2 rounded-md"
        />
        <input
          type="file"
          className="w-full border border-gray-300 px-4 py-2 rounded-md"
        />
        <textarea
          placeholder="Why are you a good fit?"
          rows="4"
          className="w-full border border-gray-300 px-4 py-2 rounded-md"
        ></textarea>

        <button
          type="submit"
          className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
