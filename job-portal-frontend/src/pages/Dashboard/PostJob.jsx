import React, { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Building, MapPin, DollarSign, Type, FileText, Send } from 'lucide-react';

// Animated Background
const AnimatedBackground = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:36px_54px]"></div>
            <motion.div
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.15),transparent_60%)]"
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
};

// Reusable Input Field Component
const FormInput = ({ icon: Icon, name, value, onChange, placeholder, required = false, type = "text" }) => (
    <div className="relative">
        <label className="block text-sm font-medium text-foreground/70 mb-2">{placeholder}</label>
        <div className="relative">
            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 z-10" size={20} />
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full pl-12 pr-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            />
        </div>
    </div>
);

// Main PostJobForm Component
const PostJobForm = () => {
    // --- YOUR ORIGINAL LOGIC - UNCHANGED ---
    const [form, setForm] = useState({
        company: "",
        title: "",
        type: "full-time",
        location: "",
        salary: "",
        description: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const token = localStorage.getItem("token");

        try {
            const res = await fetch("http://localhost:5000/api/jobs/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (res.ok) {
                alert("Job posted successfully!");
                setForm({ company: "", title: "", type: "full-time", location: "", salary: "", description: "" });
            } else {
                alert(data.error || "Error posting job");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
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
                    Post a New Job
                </motion.h1>

                <motion.div
                    variants={itemVariants}
                    className="bg-black/20 backdrop-blur-lg p-8 rounded-2xl border border-white/10"
                >
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <FormInput icon={Building} name="company" value={form.company} onChange={handleChange} placeholder="Company Name" required />
                            <FormInput icon={Briefcase} name="title" value={form.title} onChange={handleChange} placeholder="Job Title" required />
                            
                            <div className="relative">
                                <label className="block text-sm font-medium text-foreground/70 mb-2">Job Type</label>
                                <div className="relative">
                                    <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 z-10" size={20} />
                                    <select
                                        name="type"
                                        value={form.type}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 appearance-none"
                                    >
                                        <option value="full-time">Full-time</option>
                                        <option value="part-time">Part-time</option>
                                        <option value="internship">Internship</option>
                                        <option value="contract">Contract</option>
                                        <option value="freelance">Freelance</option>
                                    </select>
                                </div>
                            </div>
                            
                            <FormInput icon={MapPin} name="location" value={form.location} onChange={handleChange} placeholder="Job Location" required />
                            <FormInput icon={DollarSign} name="salary" value={form.salary} onChange={handleChange} placeholder="Salary (e.g., $50,000)" />
                        </div>
                        
                        <div className="mb-6">
                             <label className="block text-sm font-medium text-foreground/70 mb-2">Job Description</label>
                             <div className="relative">
                                <FileText className="absolute left-4 top-4 text-purple-400 z-10" size={20} />
                                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Job Description" required rows="5" className="w-full pl-12 pr-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300" />
                             </div>
                        </div>
                        
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isSubmitting ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full"
                                    />
                                    Posting Job...
                                </>
                            ) : (
                                <>
                                    <Send size={18} /> Post Job
                                </>
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default PostJobForm;
