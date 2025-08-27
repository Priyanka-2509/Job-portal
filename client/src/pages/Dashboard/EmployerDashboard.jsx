import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, BarChart3, Briefcase, Users, Building, PlusCircle } from 'lucide-react';
import Joblist from "../../pages/Dashboard/Joblist";
import Overview from "../../pages/Dashboard/Overview";
import PostJobForm from "../../pages/Dashboard/PostJob";
import CompanyProfile from "../../pages/Dashboard/CompanyProfile";
import Stats from "../../pages/Dashboard/Stats";
import Navbar from "../../components/Navbar";

// Animated Background for a professional feel
const AnimatedBackground = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_36px]"></div>
            <motion.div
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.1),transparent_70%)]"
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
};

// Sidebar Component
const Sidebar = ({ activeTab, setActiveTab }) => {
    const navItems = [
        { name: 'overview', label: 'Overview', icon: LayoutDashboard },
        { name: 'stats', label: 'Stats', icon: BarChart3 },
        { name: 'jobs', label: 'Job Management', icon: Briefcase },
        { name: 'profile', label: 'Company Profile', icon: Building },
        { name: 'post', label: 'Post a Job', icon: PlusCircle },
    ];

    return (
        <aside className="w-64 flex-shrink-0 bg-black/20 backdrop-blur-lg border-r border-white/10 p-6 z-10">
            <h2 className="text-xl font-bold mb-8 text-white">Employer Panel</h2>
            <nav className="space-y-2">
                {navItems.map(item => (
                    <button
                        key={item.label}
                        onClick={() => setActiveTab(item.name)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                            activeTab === item.name
                                ? 'bg-purple-600 text-white'
                                : 'text-foreground/70 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium text-sm">{item.label}</span>
                    </button>
                ))}
            </nav>
        </aside>
    );
};

// Main Dashboard Component
const EmployerDashboard = () => {
    // --- YOUR ORIGINAL LOGIC - UNCHANGED ---
    const [activeTab, setActiveTab] = useState("stats");

    const contentVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 }
    };

    return (
        <>
            <Navbar />
            <div className="relative min-h-screen w-full flex pt-16">
                <AnimatedBackground />
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                <main className="relative flex-1 p-4 md:p-8 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            {activeTab === "overview" && <Overview />}
                            {activeTab === "stats" && <Stats />}
                            {activeTab === "jobs" && <Joblist />}
                            {activeTab === "profile" && <CompanyProfile />}
                            {activeTab === "post" && <PostJobForm />}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </>
    );
};

export default EmployerDashboard;