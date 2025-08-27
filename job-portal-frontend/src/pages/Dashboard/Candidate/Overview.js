import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { motion } from "framer-motion";
import { Briefcase, CheckSquare, Clock } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Overview = () => {
    // --- YOUR ORIGINAL LOGIC - UNCHANGED ---
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const candidateId = localStorage.getItem("candidateId");
        if (candidateId) {
            axios.get(`/api/candidate/${candidateId}/applications`)
                .then(res => setApplications(res.data))
                .catch(err => console.error("Error fetching applications:", err));
        }
    }, []);

    const totalApplied = applications.length;

    const jobCountByMonth = {};
    applications.forEach(app => {
        const month = new Date(app.createdAt).toLocaleString("default", { month: "short" });
        jobCountByMonth[month] = (jobCountByMonth[month] || 0) + 1;
    });
    // --- END OF YOUR LOGIC ---

    // Chart.js configuration for dark theme
    const chartData = {
        labels: Object.keys(jobCountByMonth),
        datasets: [
            {
                label: "Jobs Applied",
                data: Object.values(jobCountByMonth),
                backgroundColor: "rgba(59, 130, 246, 0.6)",
                borderColor: "rgba(59, 130, 246, 1)",
                borderWidth: 1,
                borderRadius: 5,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#e0e0e0', // Light text for legend
                    font: {
                        size: 14
                    }
                }
            },
            title: {
                display: true,
                text: 'Monthly Application Trends',
                color: '#e0e0e0',
                font: {
                    size: 18
                }
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#a0a0a0', // Lighter ticks for x-axis
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)', // Subtle grid lines
                }
            },
            y: {
                ticks: {
                    color: '#a0a0a0',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                }
            }
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
    };

    // Dummy data for recent applications for UI demonstration
    const recentApplications = applications.slice(0, 3);

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full"
        >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                Dashboard Overview
            </motion.h2>

            {/* Stats Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-black/20 backdrop-blur-lg p-6 rounded-xl border border-white/10 flex items-center gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg"><Briefcase className="h-6 w-6 text-blue-400" /></div>
                    <div>
                        <p className="text-sm text-foreground/70">Total Applications</p>
                        <p className="text-2xl font-bold">{totalApplied}</p>
                    </div>
                </div>
                {/* Add more stats cards here if needed */}
                <div className="bg-black/20 backdrop-blur-lg p-6 rounded-xl border border-white/10 flex items-center gap-4">
                    <div className="p-3 bg-green-500/20 rounded-lg"><CheckSquare className="h-6 w-6 text-green-400" /></div>
                    <div>
                        <p className="text-sm text-foreground/70">Interviews</p>
                        <p className="text-2xl font-bold">3</p>
                    </div>
                </div>
                <div className="bg-black/20 backdrop-blur-lg p-6 rounded-xl border border-white/10 flex items-center gap-4">
                    <div className="p-3 bg-amber-500/20 rounded-lg"><Clock className="h-6 w-6 text-amber-400" /></div>
                    <div>
                        <p className="text-sm text-foreground/70">Pending</p>
                        <p className="text-2xl font-bold">5</p>
                    </div>
                </div>
            </motion.div>

            {/* Chart and Recent Applications */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div variants={itemVariants} className="lg:col-span-2 bg-black/20 backdrop-blur-lg p-6 rounded-xl border border-white/10">
                    <div className="h-96">
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-black/20 backdrop-blur-lg p-6 rounded-xl border border-white/10">
                    <h3 className="text-xl font-semibold mb-4">Recent Applications</h3>
                    <div className="space-y-4">
                        {recentApplications.length > 0 ? recentApplications.map(app => (
                            <div key={app._id} className="p-3 bg-slate-800/50 rounded-lg">
                                <p className="font-semibold">{app.jobTitle || "Job Title"}</p>
                                <p className="text-sm text-foreground/70">{app.company || "Company Name"}</p>
                            </div>
                        )) : (
                            <p className="text-sm text-foreground/70">No recent applications to show.</p>
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default Overview;
