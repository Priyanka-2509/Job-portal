import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { getMyJobs } from "../../services/api";
import { getApplicantsByJob } from "../../services/api";
import { Briefcase, MapPin, Users, X, FileText, MailCheck } from 'lucide-react';

// Animated Background
const AnimatedBackground = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_36px]"></div>
            <motion.div
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(147,51,234,0.15),transparent_50%)]"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
};

// --- NEW STYLISH NOTIFICATION COMPONENT ---
const StylishNotification = ({ message, show }) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    className="fixed bottom-5 right-5 z-[100] flex items-center gap-3 rounded-xl border border-white/10 bg-card/60 p-4 text-white shadow-lg backdrop-blur-lg"
                >
                    <MailCheck className="h-6 w-6 text-purple-400" />
                    <span className="font-medium">{message}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


// Main JobList Component
const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [applicants, setApplicants] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showNotification, setShowNotification] = useState(false); // State for the new notification

    useEffect(() => {
        const run = async () => {
            try {
                const { data } = await getMyJobs();
                setJobs(data);
            } catch (e) {
                console.error("Error loading jobs:", e);
            } finally {
                setLoading(false);
            }
        };
        run();
    }, []);

    // --- UPDATED LOGIC ---
    const handleViewApplicants = async (job) => {
        if (job.applications && job.applications.length > 0) {
            // Show the stylish notification instead of the alert
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000); // Hide after 3 seconds
        }

        try {
            const { data } = await getApplicantsByJob(job._id);
            setSelectedJob(job);
        } catch (err) {
            console.error("Error fetching applicants:", err);
            setApplicants(job.applications || []);
            setSelectedJob(job);
        }
    };
    // --- END OF UPDATED LOGIC ---

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
    };

    if (loading) {
        return <div className="text-center p-20 text-foreground/70">Loading jobs...</div>;
    }

    return (
        <div className="relative w-full min-h-full">
            <AnimatedBackground />
            <StylishNotification show={showNotification} message="Check your mail for applicant details." />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative z-10"
            >
                <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                    My Job Listings
                </h1>

                {!jobs.length ? (
                    <div className="text-center p-20 text-foreground/70 bg-black/20 rounded-lg">
                        <p>You haven't posted any jobs yet.</p>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {jobs.map((job) => (
                            <motion.div
                                key={job._id}
                                variants={itemVariants}
                                className="bg-black/20 backdrop-blur-lg p-6 rounded-2xl border border-white/10 flex flex-col"
                            >
                                <h3 className="text-xl font-semibold text-white truncate">{job.title}</h3>
                                <p className="text-sm text-gray-400 mt-1">{job.company} - {job.location}</p>
                                <p className="text-sm text-gray-400">{job.type}</p>
                                <p className="text-gray-300 mt-4 text-sm line-clamp-3 flex-grow">{job.description}</p>
                                <div className="mt-4 pt-4 border-t border-gray-700">
                                    <button
                                        onClick={() => handleViewApplicants(job)}
                                        className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm flex items-center gap-2"
                                    >
                                        <Users size={16} />
                                        View Applicants ({job.applications ? job.applications.length : 0})
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Applicants Modal */}
                <AnimatePresence>
                    {selectedJob && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            onClick={() => setSelectedJob(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="w-full max-w-2xl bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg p-6"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold">Applicants for {selectedJob.title}</h2>
                                    <button onClick={() => setSelectedJob(null)} className="p-2 rounded-full hover:bg-white/10">
                                        <X size={20} />
                                    </button>
                                </div>
                                {!applicants.length ? (
                                    <p className="text-gray-400">No applicants yet for this position.</p>
                                ) : (
                                    <ul className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                                        {applicants.map((app, idx) => (
                                            <li key={idx} className="bg-black/20 p-4 rounded-lg border border-white/10">
                                                {/* THIS IS THE FIX */}
                                                <p className="text-white font-medium">
                                                    {app.candidate ? `${app.candidate.name} (${app.candidate.email})` : "Check your mail for details"}
                                                </p>
                                                <p className="text-gray-400 mt-1 text-sm">{app.coverLetter}</p>
                                                {app.resume && (
                                                    <a
                                                        href={`http://localhost:5000/${app.resume}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-purple-400 hover:text-purple-300 underline mt-2 inline-flex items-center gap-2 text-sm"
                                                    >
                                                        <FileText size={14} /> View Resume
                                                    </a>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default JobList;
