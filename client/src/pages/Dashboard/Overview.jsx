import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';
import { Users, Briefcase, CheckCircle, Star, ArrowRight } from 'lucide-react';
import { getEmployerStats, getMyJobs } from '../../services/api'; // Import getMyJobs
import { Link } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const Overview = () => {
    const [employer, setEmployer] = useState({
        name: "",
        email: "",
        companyName: ""
    });
    const [stats, setStats] = useState({ totalJobs: 0, totalApplicants: 0 });
    const [applicantsChartData, setApplicantsChartData] = useState({
        labels: [],
        datasets: [],
    });
    const [featuredJob, setFeaturedJob] = useState(null); // State for the featured job

    useEffect(() => {
        const storedEmployer = JSON.parse(localStorage.getItem("user"));
        if (storedEmployer) {
            setEmployer({
                name: storedEmployer.name || "No Name",
                email: storedEmployer.email || "No Email",
                companyName: storedEmployer.companyName || "No Company"
            });
        }

        const fetchDashboardData = async () => {
            try {
                const statsRes = await getEmployerStats();
                setStats(statsRes.data);

                // --- NEW LOGIC: Fetch all jobs to find the most popular one ---
                const jobsRes = await getMyJobs();
                const allJobs = jobsRes.data || [];

                if (allJobs.length > 0) {
                    // Find the job with the most applicants to feature it
                    const mostPopularJob = allJobs.sort((a, b) => (b.applications?.length || 0) - (a.applications?.length || 0))[0];
                    setFeaturedJob(mostPopularJob);
                }
                // --- END OF NEW LOGIC ---

            } catch (err) {
                console.error("Error fetching dashboard data:", err);
            }
        };
        fetchDashboardData();

    }, []);
    
    // Chart options and variants remain the same
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { labels: { color: '#e0e0e0' } },
            tooltip: { mode: 'index', intersect: false, backgroundColor: 'rgba(0,0,0,0.8)' }
        },
        scales: {
            x: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#a0a0a0' } },
            y: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#a0a0a0', beginAtZero: true } },
        },
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full"
        >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                Employer Overview
            </motion.h2>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard icon={Briefcase} title="Total Jobs" value={stats.totalJobs} color="blue" />
                <StatCard icon={Users} title="Total Applicants" value={stats.totalApplicants} color="purple" />
                <StatCard icon={CheckCircle} title="Total Hires" value="0" color="cyan" />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <motion.div variants={itemVariants} className="lg:col-span-1 bg-black/20 backdrop-blur-lg p-6 rounded-xl border border-white/10 flex flex-col items-center text-center">
                    <img
                        src="https://placehold.co/100x100/8b5cf6/ffffff?text=C"
                        alt="Company Logo"
                        className="w-24 h-24 rounded-full object-cover border-4 border-purple-500 mb-4"
                    />
                    <h3 className="text-2xl font-bold text-white">{employer.companyName}</h3>
                    <p className="text-purple-400 text-sm font-semibold">{employer.name}</p>
                    <p className="text-foreground/70 text-sm mt-1">{employer.email}</p>
                </motion.div>
                
                {/* --- NEW "JOB SPOTLIGHT" SECTION --- */}
                <motion.div variants={itemVariants} className="lg:col-span-2 bg-black/20 backdrop-blur-lg p-6 rounded-xl border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <Star className="text-amber-400" /> Job Spotlight
                    </h3>
                    {featuredJob ? (
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                            <h4 className="font-bold text-lg text-white">{featuredJob.title}</h4>
                            <p className="text-sm text-foreground/70 mb-4">{featuredJob.location}</p>
                            <div className="flex items-center justify-between">
                                <div className="text-center">
                                    <p className="text-2xl font-bold">{featuredJob.applications?.length || 0}</p>
                                    <p className="text-xs text-foreground/60">Applicants</p>
                                </div>
                                <Link to="/browse-jobs" className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm flex items-center gap-2">
                                    Manage Job <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-foreground/70 text-center py-8">Post a job to see your spotlight here.</p>
                    )}
                </motion.div>
            </div>

            {/* Application Trends Chart (Dummy Data) */}
            <motion.div variants={itemVariants} className="bg-black/20 backdrop-blur-lg p-6 rounded-xl border border-white/10">
                 <h3 className="text-xl font-semibold text-white mb-4">Application Trends</h3>
                 <div className="h-80">
                    <Bar data={applicantsChartData} options={chartOptions} />
                 </div>
            </motion.div>
        </motion.div>
    );
};

// Reusable Stat Card Component
const StatCard = ({ icon: Icon, title, value, color }) => {
    const colors = {
        blue: 'text-blue-400 bg-blue-500/20',
        purple: 'text-purple-400 bg-purple-500/20',
        cyan: 'text-cyan-400 bg-cyan-500/20',
    };

    return (
        <div className="bg-black/20 backdrop-blur-lg p-6 rounded-xl border border-white/10 flex items-center gap-4">
            <div className={`p-3 rounded-lg ${colors[color]}`}>
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <p className="text-sm text-foreground/70">{title}</p>
                <p className="text-3xl font-bold">{value}</p>
            </div>
        </div>
    );
};

export default Overview;