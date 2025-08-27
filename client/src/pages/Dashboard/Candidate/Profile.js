// src/pages/Dashboard/Candidate/Profile.js
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, Plus, X, UploadCloud, CheckCircle } from 'lucide-react';
import Navbar from "../../../components/Navbar"; // Assuming Navbar is in components folder

// --- UI Components ---


// Enhanced input component for the form
const EnhancedInput = ({ name, value, onChange, placeholder, type = "text" }) => (
    <div className="relative w-full">
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full p-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-foreground placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
        />
    </div>
);

// --- Main Profile Component ---

const Profile = () => {
    // --- YOUR ORIGINAL LOGIC - UNCHANGED ---
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        skills: [],
        education: [{ degree: "", institution: "", year: "" }],
        resume: null,
    });

    const [newSkill, setNewSkill] = useState("");
    const [saved, setSaved] = useState(false);

    const skillOptions = ["React", "Node.js", "Python", "Java", "SQL", "DevOps"];

    useEffect(() => {
        const savedProfile = localStorage.getItem("candidateProfile");
        if (savedProfile) {
            setProfile(JSON.parse(savedProfile));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
        setSaved(false);
    };

    const handleSkillSelect = (e) => {
        const value = e.target.value;
        if (value && !profile.skills.includes(value)) {
            setProfile({ ...profile, skills: [...profile.skills, value] });
            setSaved(false);
        }
    };

    const handleAddCustomSkill = () => {
        if (newSkill && !profile.skills.includes(newSkill)) {
            setProfile({ ...profile, skills: [...profile.skills, newSkill] });
            setNewSkill("");
            setSaved(false);
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setProfile({
            ...profile,
            skills: profile.skills.filter((skill) => skill !== skillToRemove),
        });
        setSaved(false);
    };

    const handleEducationChange = (index, e) => {
        const { name, value } = e.target;
        const updatedEdu = [...profile.education];
        updatedEdu[index][name] = value;
        setProfile({ ...profile, education: updatedEdu });
        setSaved(false);
    };

    const addEducation = () => {
        setProfile({
            ...profile,
            education: [...profile.education, { degree: "", institution: "", year: "" }],
        });
        setSaved(false);
    };

    const handleResumeUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfile({ ...profile, resume: { name: file.name } }); // Storing only file name for display
        }
        setSaved(false);
    };

    const handleSave = () => {
        localStorage.setItem("candidateProfile", JSON.stringify(profile));
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
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

    return (
        <>
            <Navbar />
            <div className="relative min-h-screen w-full p-4 md:p-8 pt-24">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative z-10 max-w-4xl mx-auto bg-black/20 backdrop-blur-lg rounded-2xl shadow-2xl shadow-blue-500/10 border border-white/10 p-8 md:p-10"
                >
                    <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                        Your Professional Profile
                    </motion.h2>

                    {/* Basic Info */}
                    <motion.div variants={itemVariants} className="mb-8 p-6 bg-black/20 rounded-xl border border-white/10">
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><User className="text-blue-400" /> Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <EnhancedInput name="name" value={profile.name} onChange={handleChange} placeholder="Full Name" />
                            <EnhancedInput name="email" value={profile.email} onChange={handleChange} placeholder="Email Address" type="email" />
                            <EnhancedInput name="phone" value={profile.phone} onChange={handleChange} placeholder="Phone Number" />
                        </div>
                    </motion.div>

                    {/* Skills */}
                    <motion.div variants={itemVariants} className="mb-8 p-6 bg-black/20 rounded-xl border border-white/10">
                        <h3 className="text-xl font-semibold mb-4">Skills</h3>
                        <div className="flex flex-col md:flex-row gap-4 mb-4">
                            <select onChange={handleSkillSelect} className="w-full md:w-1/3 p-3 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                                <option value="">Select a skill</option>
                                {skillOptions.map((skill, index) => <option key={index} value={skill}>{skill}</option>)}
                            </select>
                            <EnhancedInput name="newSkill" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Add custom skill" />
                            <button onClick={handleAddCustomSkill} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"><Plus size={16} /> Add</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <AnimatePresence>
                                {profile.skills.map((skill) => (
                                    <motion.span
                                        key={skill}
                                        layout
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        className="flex items-center gap-2 bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm font-medium border border-cyan-500/30"
                                    >
                                        {skill}
                                        <button onClick={() => handleRemoveSkill(skill)} className="hover:text-white"><X size={14} /></button>
                                    </motion.span>
                                ))}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* Education */}
                    <motion.div variants={itemVariants} className="mb-8 p-6 bg-black/20 rounded-xl border border-white/10">
                        <h3 className="text-xl font-semibold mb-4">Education</h3>
                        <div className="space-y-4">
                            {profile.education.map((edu, index) => (
                                <motion.div key={index} layout className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <EnhancedInput name="degree" value={edu.degree} onChange={(e) => handleEducationChange(index, e)} placeholder="Degree (e.g., B.S. in CS)" />
                                    <EnhancedInput name="institution" value={edu.institution} onChange={(e) => handleEducationChange(index, e)} placeholder="Institution" />
                                    <EnhancedInput name="year" value={edu.year} onChange={(e) => handleEducationChange(index, e)} placeholder="Year of Completion" />
                                </motion.div>
                            ))}
                        </div>
                        <button onClick={addEducation} className="mt-4 px-4 py-2 text-sm bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/40 transition-colors flex items-center gap-2"><Plus size={16} /> Add Education</button>
                    </motion.div>

                    {/* Resume */}
                    <motion.div variants={itemVariants} className="mb-8 p-6 bg-black/20 rounded-xl border border-white/10">
                        <h3 className="text-xl font-semibold mb-4">Resume</h3>
                        <label htmlFor="resume-upload" className="w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-700/50 rounded-lg cursor-pointer hover:bg-slate-800/50 transition-colors">
                            <UploadCloud className="h-10 w-10 text-blue-400 mb-2" />
                            <span className="font-semibold">Click to upload your resume</span>
                            <span className="text-xs text-slate-400">PDF, DOC, DOCX</span>
                        </label>
                        <input id="resume-upload" type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} className="hidden" />
                        {profile.resume && <p className="text-center mt-4 text-green-400"><strong>Uploaded:</strong> {profile.resume.name}</p>}
                    </motion.div>

                    {/* Save Button */}
                    <motion.div variants={itemVariants} className="text-center">
                        <button onClick={handleSave} className="relative w-full md:w-auto px-10 py-4 font-bold text-lg text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
                            Save Profile
                            <AnimatePresence>
                                {saved && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-lg text-sm border border-green-500/30"
                                    >
                                        <CheckCircle size={16} /> Profile Saved!
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
};

export default Profile;
