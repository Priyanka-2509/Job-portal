import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getEmployerStats } from "../../services/api";
import { Briefcase, Users, Star } from 'lucide-react';

// Animated Background for a professional, tech-focused feel
const AnimatedBackground = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:36px_54px]"></div>
            <motion.div
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(147,51,234,0.15),transparent_50%)]"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.15),transparent_50%)]"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
};

// Reusable Stat Card Component
const StatCard = ({ icon: Icon, title, value, color }) => {
    const colors = {
        blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
        purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
        cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    };

    return (
        <div className="bg-black/20 backdrop-blur-lg p-6 rounded-2xl border border-white/10 flex items-center gap-5 transition-transform duration-300 hover:-translate-y-2">
            <div className={`p-4 rounded-lg ${colors[color]}`}>
                <Icon className="h-8 w-8" />
            </div>
            <div>
                <p className="text-sm text-foreground/70">{title}</p>
                <p className="text-4xl font-bold">{value}</p>
            </div>
        </div>
    );
};

const Stats = () => {
    // --- YOUR ORIGINAL LOGIC - UNCHANGED ---
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await getEmployerStats();
                setStats(data);
            } catch (err) {
                console.error("Error fetching stats:", err);
            }
        };
        fetchStats();
    }, []);
    // --- END OF YOUR LOGIC ---

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
    };

    return (
        <div className="relative w-full min-h-full">
            <AnimatedBackground />
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10"
            >
                <motion.h1 variants={itemVariants} className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                    Company Statistics
                </motion.h1>

                {stats ? (
                    <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <motion.div variants={itemVariants}>
                            <StatCard icon={Briefcase} title="Total Jobs Posted" value={stats.totalJobs} color="blue" />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <StatCard icon={Users} title="Total Applicants" value={stats.totalApplicants} color="purple" />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <StatCard icon={Star} title="Most Popular Job" value={stats.mostPopularJob} color="cyan" />
                        </motion.div>
                    </motion.div>
                ) : (
                    <div className="text-center p-20 text-foreground/70">
                        <p>Loading stats...</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Stats;
