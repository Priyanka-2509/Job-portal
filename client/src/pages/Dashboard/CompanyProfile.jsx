import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Building, Globe, MapPin, Image as ImageIcon, Save, CheckCircle } from 'lucide-react';
import { getEmployerProfile, updateEmployerProfile } from "../../services/api";

// Animated Background
const AnimatedBackground = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:36px_54px]"></div>
            <motion.div
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(147,51,234,0.15),transparent_50%)]"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
};

// Reusable Input Field Component
const ProfileInput = ({ icon: Icon, name, value, onChange, placeholder }) => (
    <div className="relative">
        <label className="block text-sm font-medium text-foreground/70 mb-2">{placeholder}</label>
        <div className="relative">
            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 z-10" size={20} />
            <input
                name={name}
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full pl-12 pr-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            />
        </div>
    </div>
);

// Main CompanyProfile Component
const CompanyProfile = () => {
    // --- YOUR ORIGINAL LOGIC - UNCHANGED ---
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await getEmployerProfile(token);
                setProfile(res.data);
            } catch (err) {
                console.error("Error fetching profile:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            await updateEmployerProfile(token, profile);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            console.error("Error updating profile:", err);
            alert("Failed to update profile.");
        }
    };
    // --- END OF YOUR LOGIC ---

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
    };

    if (loading) {
        return <div className="text-center p-20 text-foreground/70">Loading profile...</div>;
    }

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
                    Company Profile
                </motion.h1>

                <motion.div
                    variants={itemVariants}
                    className="bg-black/20 backdrop-blur-lg p-8 rounded-2xl border border-white/10"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <ProfileInput icon={Building} name="name" value={profile.name} onChange={handleChange} placeholder="Company Name" />
                        <ProfileInput icon={ImageIcon} name="logo" value={profile.logo} onChange={handleChange} placeholder="Logo URL" />
                        <ProfileInput icon={MapPin} name="location" value={profile.location} onChange={handleChange} placeholder="Location" />
                        <ProfileInput icon={Globe} name="website" value={profile.website} onChange={handleChange} placeholder="Website" />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-foreground/70 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={profile.description || ""}
                            onChange={handleChange}
                            placeholder="Tell us about your company..."
                            rows="5"
                            className="w-full p-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                        ></textarea>
                    </div>
                    
                    <div className="flex items-center justify-start gap-4">
                        <motion.button
                            onClick={handleSave}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Save size={18} /> Save Profile
                        </motion.button>
                        <AnimatePresence>
                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex items-center gap-2 text-green-400 text-sm font-medium"
                                >
                                    <CheckCircle size={16} /> Profile updated successfully!
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default CompanyProfile;