import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, DollarSign, Building, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';

// Floating Particles Component
const FloatingParticles = () => {
    const particles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full opacity-30"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        background: `linear-gradient(45deg, 
                            rgba(139, 92, 246, 0.3), 
                            rgba(59, 130, 246, 0.3), 
                            rgba(16, 185, 129, 0.3))`,
                    }}
                    animate={{
                        y: [-20, -100, -20],
                        x: [-10, 10, -10],
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};

// Enhanced Spiral Background with more visual effects
const SpiralBackground = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
            >
                <div className="absolute h-[100vh] w-[100vh] rounded-full border-2 border-t-cyan-400/40 border-l-purple-400/40 border-b-blue-400/40 border-r-transparent filter blur-2xl opacity-60" />
                <div className="absolute h-[80vh] w-[80vh] rounded-full border-2 border-t-blue-400/30 border-l-cyan-400/30 border-b-purple-400/30 border-r-transparent filter blur-2xl opacity-50" />
                <div className="absolute h-[60vh] w-[60vh] rounded-full border-2 border-t-purple-400/20 border-l-blue-400/20 border-b-cyan-400/20 border-r-transparent filter blur-xl opacity-40" />
            </motion.div>
            
            {/* Additional animated background elements */}
            <motion.div
                className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full filter blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-gradient-to-r from-cyan-500/10 to-green-500/10 rounded-full filter blur-3xl"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.6, 0.3, 0.6],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
};

// Enhanced Glow Card Component
const GlowCard = ({ children, className = "" }) => {
    return (
        <motion.div
            className={`relative group ${className}`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm" />
            <div className="relative bg-card/60 backdrop-blur-xl rounded-2xl shadow-2xl shadow-purple-500/10 border border-white/10 group-hover:border-white/20 transition-all duration-300">
                {children}
            </div>
        </motion.div>
    );
};

export default function JobDetails() {
    // --- YOUR ORIGINAL LOGIC - PRESERVED EXACTLY ---
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        coverLetter: '',
        resume: null,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                // RESTORED your original fetch call
                const res = await fetch(`/api/jobs/${id}`);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                setJob(data);
            } catch (err) {
                console.error("Failed to fetch job", err);
                setError("Failed to load job details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'resume') {
            setFormData({ ...formData, resume: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('jobId', job._id);
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('coverLetter', formData.coverLetter);
        data.append('resume', formData.resume);

        try {
            await axios.post('http://localhost:5000/api/apply/', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Your application has been submitted successfully!');
            setShowForm(false);
            setFormData({ name: '', email: '', coverLetter: '', resume: null });
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('There was an error submitting your application. Please try again.');
        }
    };
    // --- END OF YOUR ORIGINAL LOGIC ---

    // Enhanced UI logic
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
    useEffect(() => {
        const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { 
                staggerChildren: 0.15, 
                delayChildren: 0.2,
                duration: 0.6
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { 
                duration: 0.6, 
                ease: [0.16, 1, 0.3, 1] 
            } 
        }
    };

    const iconVariants = {
        hidden: { scale: 0, rotate: -180 },
        visible: { 
            scale: 1, 
            rotate: 0,
            transition: { 
                type: "spring", 
                stiffness: 260, 
                damping: 20 
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-background text-foreground relative overflow-hidden">
                <SpiralBackground />
                <FloatingParticles />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 text-center"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full mx-auto mb-4"
                    />
                    <div className="text-xl font-semibold animate-pulse">Loading job details...</div>
                </motion.div>
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-background text-foreground p-4 relative overflow-hidden">
                <SpiralBackground />
                <FloatingParticles />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                        <XCircle className="h-16 w-16 text-red-500 mb-4 mx-auto" />
                    </motion.div>
                    <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong.</h2>
                    <p className="text-foreground/70 mb-6">{error || "This job could not be found."}</p>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link to="/browse-jobs" className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
                            Back to Listings
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        );
    }

    return (
        <>
            {/* Enhanced Custom Cursor */}
            <motion.div
                style={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
                className="fixed top-0 left-0 h-8 w-8 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full pointer-events-none z-[9999] backdrop-filter backdrop-blur-sm border border-white/30"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
            
            <Navbar />
            
            <div className="relative min-h-screen bg-background text-foreground p-4 md:p-8 pt-24 flex items-center justify-center overflow-hidden cursor-none">
                {/* Enhanced Background Effects */}
                <SpiralBackground />
                <FloatingParticles />

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 max-w-4xl w-full"
                >
                    <GlowCard>
                        <div className="p-8 md:p-12">
                            <motion.div 
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="space-y-8"
                            >
                                {/* Back Button */}
                                <motion.div variants={itemVariants}>
                                    <motion.div
                                        whileHover={{ x: -5 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        <Link to="/browse-jobs" className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors w-fit">
                                            <ArrowLeft className="h-4 w-4" />
                                            Back to all jobs
                                        </Link>
                                    </motion.div>
                                </motion.div>
                                
                                {/* Job Title */}
                                <motion.div variants={itemVariants}>
                                    <motion.h1 
                                        className="text-3xl md:text-4xl font-bold text-foreground mb-3 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent"
                                        initial={{ backgroundPosition: "0% 50%" }}
                                        animate={{ backgroundPosition: "100% 50%" }}
                                        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                                    >
                                        {job.title}
                                    </motion.h1>
                                </motion.div>
                                
                                {/* Job Meta Information */}
                                <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-x-6 gap-y-3 text-foreground/80">
                                    <motion.span variants={iconVariants} className="flex items-center gap-2">
                                        <Building className="h-4 w-4 text-purple-400" /> {job.company}
                                    </motion.span>
                                    <motion.span variants={iconVariants} className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-cyan-400" /> {job.location}
                                    </motion.span>
                                    <motion.span variants={iconVariants} className="flex items-center gap-2">
                                        <Briefcase className="h-4 w-4 text-amber-400" /> {job.type}
                                    </motion.span>
                                    <motion.span variants={iconVariants} className="flex items-center gap-2">
                                        <DollarSign className="h-4 w-4 text-green-400" /> {job.salary}
                                    </motion.span>
                                </motion.div>

                                {/* Job Description */}
                                <motion.div variants={itemVariants} className="prose prose-invert max-w-none text-foreground/80">
                                    <motion.h3 
                                        className="text-xl font-semibold text-foreground mb-3"
                                        whileInView={{ scale: [0.95, 1] }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        Job Description
                                    </motion.h3>
                                    <motion.p 
                                        className="whitespace-pre-line leading-relaxed"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5, duration: 0.8 }}
                                    >
                                        {job.description || "No description provided."}
                                    </motion.p>
                                </motion.div>

                                {/* Requirements */}
                                {job.requirements?.length > 0 && (
                                    <motion.div variants={itemVariants}>
                                        <motion.h3 
                                            className="text-xl font-semibold text-foreground mb-4"
                                            whileInView={{ scale: [0.95, 1] }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            Key Requirements
                                        </motion.h3>
                                        <motion.ul className="space-y-3">
                                            {job.requirements.map((req, index) => (
                                                <motion.li 
                                                    key={index} 
                                                    className="flex items-start gap-3 group"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
                                                    whileHover={{ x: 5 }}
                                                >
                                                    <motion.div
                                                        initial={{ scale: 0, rotate: -90 }}
                                                        animate={{ scale: 1, rotate: 0 }}
                                                        transition={{ delay: index * 0.1 + 0.8, type: "spring", stiffness: 300 }}
                                                    >
                                                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0 group-hover:text-green-300 transition-colors" />
                                                    </motion.div>
                                                    <span className="text-foreground/80 group-hover:text-foreground transition-colors">{req}</span>
                                                </motion.li>
                                            ))}
                                        </motion.ul>
                                    </motion.div>
                                )}

                                {/* Apply Section */}
                                <motion.div variants={itemVariants} className="border-t border-white/10 pt-8">
                                    <motion.button
                                        onClick={() => setShowForm(!showForm)}
                                        className="w-full md:w-auto bg-gradient-to-r from-blue-500 via-purple-600 to-cyan-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg relative overflow-hidden group"
                                        whileHover={{ 
                                            scale: 1.05,
                                            boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)"
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            initial={false}
                                        />
                                        <span className="relative z-10">
                                            {showForm ? 'Cancel Application' : 'Apply for this Job'}
                                        </span>
                                    </motion.button>

                                    {/* Enhanced Application Form */}
                                    <AnimatePresence mode="wait">
                                        {showForm && (
                                            <motion.form
                                                onSubmit={handleSubmit}
                                                initial={{ opacity: 0, height: 0, y: -20 }}
                                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                                exit={{ opacity: 0, height: 0, y: -20 }}
                                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                                className="overflow-hidden mt-8"
                                            >
                                                <motion.div 
                                                    className="p-8 bg-gradient-to-br from-card/80 to-card/60 border border-white/20 rounded-xl backdrop-blur-lg shadow-2xl"
                                                    initial={{ scale: 0.95 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ delay: 0.2, duration: 0.4 }}
                                                >
                                                    <motion.h3 
                                                        className="text-2xl font-bold text-foreground mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.3 }}
                                                    >
                                                        Application Form
                                                    </motion.h3>
                                                    <div className="space-y-6">
                                                        {[
                                                            { name: 'name', placeholder: 'Your Full Name', type: 'text' },
                                                            { name: 'email', placeholder: 'Your Email Address', type: 'email' },
                                                        ].map((field, index) => (
                                                            <motion.div
                                                                key={field.name}
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: 0.4 + index * 0.1 }}
                                                            >
                                                                <motion.input 
                                                                    type={field.type}
                                                                    name={field.name}
                                                                    placeholder={field.placeholder}
                                                                    required
                                                                    onChange={handleChange}
                                                                    value={formData[field.name]}
                                                                    className="w-full p-4 bg-background/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm hover:border-white/30 text-black"
                                                                    whileFocus={{ scale: 1.02 }}
                                                                />
                                                            </motion.div>
                                                        ))}
                                                        
                                                        <motion.div
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.6 }}
                                                        >
                                                            <motion.textarea 
                                                                name="coverLetter"
                                                                placeholder="Cover Letter (Optional)"
                                                                onChange={handleChange}
                                                                value={formData.coverLetter}
                                                                rows="4"
                                                                className="w-full p-4 bg-background/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm hover:border-white/30 resize-none text-black"
                                                                whileFocus={{ scale: 1.02 }}
                                                            />
                                                        </motion.div>
                                                        
                                                        <motion.div
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.7 }}
                                                        >
                                                            <label htmlFor="resume" className="block text-sm font-medium text-foreground/70 mb-3">Upload Resume</label>
                                                            <motion.input 
                                                                type="file"
                                                                name="resume"
                                                                id="resume"
                                                                required
                                                                onChange={handleChange}
                                                                className="w-full text-foreground/80 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-500/20 file:to-purple-500/20 file:text-blue-300 hover:file:from-blue-500/30 hover:file:to-purple-500/30 cursor-pointer transition-all duration-300"
                                                                whileHover={{ scale: 1.02 }}
                                                            />
                                                        </motion.div>
                                                        
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.8 }}
                                                        >
                                                            <motion.button 
                                                                type="submit"
                                                                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-500/30"
                                                                whileHover={{ scale: 1.02, y: -2 }}
                                                                whileTap={{ scale: 0.98 }}
                                                            >
                                                                Submit Application
                                                            </motion.button>
                                                        </motion.div>
                                                    </div>
                                                </motion.div>
                                            </motion.form>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </motion.div>
                        </div>
                    </GlowCard>
                </motion.div>
            </div>
        </>
    );
}
