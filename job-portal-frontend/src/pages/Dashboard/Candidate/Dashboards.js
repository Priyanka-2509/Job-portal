//job-portal-frontend\src\pages\Dashboard\Candidate\Dashboards.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LayoutDashboard } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Overview from './Overview'; // Import your Overview component
import Profile from './Profile';   // Import your Profile component

// Animated Background Component
const AnimatedBackground = () => {
    return (
        <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://i.pinimg.com/1200x/b1/3a/03/b13a032f1a7ed8af529cc28736e305ab.jpg)' }}
        >
            <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
        </div>
    );
};

// Sidebar Component
const Sidebar = ({ activeTab, setActiveTab }) => {
    const navItems = [
        { name: 'overview', label: 'Overview', icon: LayoutDashboard },
        { name: 'profile', label: 'Profile', icon: User },
    ];

    return (
        <aside className="w-64 flex-shrink-0 bg-black/20 backdrop-blur-lg border-r border-white/10 p-6 z-10">
            <h2 className="text-xl font-bold mb-8 text-white">Dashboard</h2>
            <nav className="space-y-2">
                {navItems.map(item => (
                    <button
                        key={item.label}
                        onClick={() => setActiveTab(item.name)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                            activeTab === item.name
                                ? 'bg-blue-500 text-white'
                                : 'text-foreground/70 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                    </button>
                ))}
            </nav>
        </aside>
    );
};

// Main Dashboard Component
const CandidateDashboard = () => {
    // --- Restored your original useState logic ---
    const [activeTab, setActiveTab] = useState("overview");

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
                    {/* --- AnimatePresence for opening/closing transitions --- */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab} // Key is essential for AnimatePresence to detect changes
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            {activeTab === "overview" && <Overview />}
                            {activeTab === "profile" && <Profile />}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </>
    );
};

export default CandidateDashboard;