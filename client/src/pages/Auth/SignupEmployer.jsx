import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, Building, Landmark, Globe, MapPin, Eye, EyeOff, Sparkles, ArrowRight, Users, Award, Target } from 'lucide-react';
import { employerRegister } from "../../services/api";
// --- UI Components for Employer Theme ---

// New Dark Animated Background with a purple/blue theme
const AnimatedGradientBackground = () => {
    return (
        <motion.div
            className="absolute inset-0 z-0"
            animate={{
                background: [
                    "radial-gradient(circle at 15% 85%, rgba(80, 30, 120, 0.7), transparent 40%)",
                    "radial-gradient(circle at 85% 15%, rgba(30, 80, 120, 0.7), transparent 40%)",
                    "radial-gradient(circle at 50% 50%, rgba(80, 30, 120, 0.7), transparent 40%)",
                    "radial-gradient(circle at 15% 85%, rgba(80, 30, 120, 0.7), transparent 40%)",
                ]
            }}
            transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    );
};

// Employer-focused floating particles
const EmployerFloatingParticles = () => {
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
    }));
    const employerIcons = [Building, Users, Award, Target];

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {particles.map((p) => {
                const Icon = employerIcons[Math.floor(Math.random() * employerIcons.length)];
                return (
                    <motion.div
                        key={p.id}
                        className="absolute text-purple-400/20"
                        style={{ left: `${p.x}%`, top: `${p.y}%` }}
                        animate={{
                            y: [0, -120, 0],
                            rotate: [0, Math.random() * -180, 0],
                            scale: [1, 1.4, 1],
                        }}
                        transition={{
                            duration: p.duration,
                            delay: p.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <Icon style={{ width: p.size * 6, height: p.size * 6 }} />
                    </motion.div>
                );
            })}
        </div>
    );
};

// Enhanced input component with purple accent
const EnhancedInput = ({ icon: Icon, type, name, placeholder, value, onChange, required }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <motion.div
            className="relative"
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
            }}
        >
            <Icon className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-300 ${isFocused ? 'text-purple-400' : 'text-slate-400'}`} />
            <input
                type={type === 'password' && showPassword ? 'text' : type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full h-14 pl-12 pr-12 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
            />
            {type === 'password' && (
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
            )}
        </motion.div>
    );
};

// --- Main Signup Component ---

function EmployerSignup() {
    // --- YOUR ORIGINAL LOGIC - UNCHANGED ---
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        companyName: '',
        companyId: '',
        companyWebsite: '',
        companyAddress: '',
    });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsLoading(true);
        try {
            const res = await employerRegister(formData);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", (res.data.role || "employer").toLowerCase());
            localStorage.setItem("user", JSON.stringify(res.data.employer || {}));
            setMessage(res.data.message || 'Signup successful!');
            navigate('/employer-dashboard');
        } catch (err) {
            setMessage(err.response?.data?.message || 'Error signing up. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    // --- END OF YOUR LOGIC ---

    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
    const [clicks, setClicks] = useState([]);

    useEffect(() => {
        const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleMouseClick = (e) => {
        const newClick = { x: e.clientX, y: e.clientY, id: Date.now() };
        setClicks(prev => [...prev, newClick]);
        setTimeout(() => setClicks(prev => prev.filter(c => c.id !== newClick.id)), 1000);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
    };

    return (
        <>
            <motion.div
                style={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
                className="fixed top-0 left-0 h-8 w-8 bg-white/10 rounded-full pointer-events-none z-[9999] backdrop-filter backdrop-blur-sm border border-white/20"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
            <div className="min-h-screen bg-background text-foreground relative flex items-center justify-center p-4 overflow-hidden cursor-none" onClick={handleMouseClick}>
                <AnimatedGradientBackground />
                <EmployerFloatingParticles />
                <AnimatePresence>
                    {clicks.map(click => (
                        <motion.div
                            key={click.id}
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 10, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="absolute rounded-full bg-purple-400/30 pointer-events-none"
                            style={{ left: click.x - 25, top: click.y - 25, width: 50, height: 50 }}
                        />
                    ))}
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/10"
                >
                    {/* Left Panel */}
                    <div className="hidden md:flex flex-col justify-center p-12 bg-card/50 backdrop-blur-lg text-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}>
                            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-blue-400 bg-clip-text text-transparent">Find Top Talent</h2>
                            <p className="text-foreground/70 mb-8">Join the leading platform for connecting with skilled professionals ready for their next challenge.</p>
                            <Link to="/" className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors">
                                <Sparkles className="h-4 w-4" />
                                Learn More
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Panel (Form) */}
                    <div className="p-8 md:p-10 bg-card/80 backdrop-blur-xl">
                        <motion.div variants={containerVariants} initial="hidden" animate="visible">
                            <motion.h2 variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="text-3xl font-bold mb-2 text-center">Employer Sign Up</motion.h2>
                            <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="text-foreground/60 mb-8 text-center text-sm">Create your company profile</motion.p>
                            
                            {message && <p className={`p-3 mb-4 rounded-lg text-center text-sm ${message.includes('Error') ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>{message}</p>}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <EnhancedInput icon={User} type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                                <EnhancedInput icon={Mail} type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                                <EnhancedInput icon={Lock} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                                <EnhancedInput icon={Building} type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} required />
                                <EnhancedInput icon={Landmark} type="text" name="companyId" placeholder="Company ID" value={formData.companyId} onChange={handleChange} required />
                                <EnhancedInput icon={Globe} type="text" name="companyWebsite" placeholder="Company Website (optional)" value={formData.companyWebsite} onChange={handleChange} />
                                <EnhancedInput icon={MapPin} type="text" name="companyAddress" placeholder="Company Address (optional)" value={formData.companyAddress} onChange={handleChange} />
                                
                                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                                    <button type="submit" disabled={isLoading} className="w-full h-14 group relative overflow-hidden bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center">
                                        {isLoading ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full" /> : <span className="flex items-center gap-2">Create Account <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></span>}
                                    </button>
                                </motion.div>
                            </form>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}

export default EmployerSignup;