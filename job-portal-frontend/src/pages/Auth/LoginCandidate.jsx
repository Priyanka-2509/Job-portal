// src/pages/Auth/LoginCandidate.jsx
// src/pages/Auth/LoginCandidate.jsx
import React, { useState, useContext, useEffect } from "react";
import API from "../../services/api";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { motion, AnimatePresence } from "motion/react";
import { User, Lock, Mail, Eye, EyeOff, Briefcase, Sparkles, ArrowRight, CheckCircle, Star, Users, Building } from "lucide-react";

// Enhanced floating particles with better distribution
const EnhancedFloatingParticles = () => {
    const particles = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 25 + 15,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.6 + 0.2,
        type: Math.random() > 0.8 ? 'star' : 'circle',
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                    }}
                    animate={{
                        y: [-40, -140, -40],
                        x: [-30, 30, -30],
                        rotate: particle.type === 'star' ? [0, 360] : [0, 180, 360],
                        scale: [1, 1.5, 1],
                        opacity: [particle.opacity * 0.3, particle.opacity, particle.opacity * 0.3],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    {particle.type === 'star' ? (
                        <Star className="h-3 w-3 text-blue-400/60" fill="currentColor" />
                    ) : (
                        <div
                            className="rounded-full"
                            style={{
                                width: `${particle.size}px`,
                                height: `${particle.size}px`,
                                background: `linear-gradient(135deg, 
                                    rgba(59, 130, 246, ${particle.opacity}), 
                                    rgba(147, 51, 234, ${particle.opacity * 0.8}))`,
                            }}
                        />
                    )}
                </motion.div>
            ))}
        </div>
    );
};

// Unified background with better integration
const UnifiedBackground = () => {
    return (
        <div className="absolute inset-0 z-0">
            {/* Main gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
            
            {/* Animated gradient overlay */}
            <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                    background: `
                        radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
                        radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)
                    `
                }}
                animate={{
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            
            {/* Animated mesh gradient */}
            <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{
                    backgroundImage: `
                        linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.1) 50%, transparent 70%),
                        linear-gradient(-45deg, transparent 30%, rgba(147, 51, 234, 0.1) 50%, transparent 70%)
                    `,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Floating job icons */}
            <motion.div
                className="absolute top-1/4 left-1/6 w-8 h-8 text-blue-400/20"
                animate={{
                    y: [-20, 20, -20],
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <Briefcase className="w-full h-full" />
            </motion.div>
            
            <motion.div
                className="absolute top-2/3 right-1/5 w-6 h-6 text-purple-400/20"
                animate={{
                    y: [20, -20, 20],
                    rotate: [360, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <Users className="w-full h-full" />
            </motion.div>
            
            <motion.div
                className="absolute bottom-1/4 left-1/3 w-7 h-7 text-cyan-400/20"
                animate={{
                    x: [-15, 15, -15],
                    y: [-10, 10, -10],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <Building className="w-full h-full" />
            </motion.div>
        </div>
    );
};

// Enhanced input component with better visibility
const EnhancedInput = ({ icon: Icon, type, name, placeholder, value, onChange, required }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <motion.div 
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative">
                {/* Input field with better visibility */}
                <input
                    type={type === 'password' && showPassword ? 'text' : type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full h-14 pl-14 pr-14 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl text-white placeholder:text-slate-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:bg-slate-800/70 transition-all duration-300 hover:border-slate-600/50"
                />
                
                {/* Icon */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                    <Icon className={`h-5 w-5 transition-colors duration-300 ${isFocused ? 'text-blue-400' : 'text-slate-400'}`} />
                </div>
                
                {/* Password toggle */}
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                    >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                )}
            </div>
            
            {/* Focus glow effect */}
            <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 -z-10 blur-xl"
                animate={{ opacity: isFocused ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
};

const LoginCandidate = () => {
    // --- YOUR ORIGINAL LOGIC - PRESERVED EXACTLY ---
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await API.post("/auth/login", formData);

            // ✅ Update AuthContext
            login(res.data.user, res.data.token);

            // ✅ Candidate goes to home, then navbar shows Candidate Dashboard
            navigate("/");
        } catch (err) {
            console.error("Login failed:", err);
            alert("Invalid credentials. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    // --- END OF YOUR ORIGINAL LOGIC ---

    // Enhanced UI logic
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { 
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.6, 
                ease: [0.16, 1, 0.3, 1] 
            } 
        }
    };

    return (
        <>
            {/* Enhanced Custom Cursor */}
            <motion.div
                style={{ x: mousePosition.x - 20, y: mousePosition.y - 20 }}
                className="fixed top-0 left-0 h-10 w-10 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full pointer-events-none z-[9999] backdrop-filter backdrop-blur-sm border border-white/20"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
            
            <div className="min-h-screen text-white relative overflow-hidden cursor-none flex items-center justify-center p-4">
                {/* Unified Background */}
                <UnifiedBackground />
                <EnhancedFloatingParticles />

                {/* Main Content Container */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative z-10 w-full max-w-md"
                >
                    {/* Main Card */}
                    <motion.div
                        className="relative group"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Card glow effects */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 rounded-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-sm" />
                        
                        {/* Main card content */}
                        <div className="relative bg-slate-900/70 backdrop-blur-2xl rounded-3xl border border-slate-700/50 shadow-2xl shadow-blue-500/10 overflow-hidden">
                            {/* Header Section */}
                            <div className="relative p-8 pb-6">
                                {/* Background decoration */}
                                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent" />
                                
                                <motion.div variants={itemVariants} className="relative z-10 text-center">
                                    {/* Logo */}
                                    <motion.div 
                                        className="flex items-center justify-center gap-3 mb-6"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <motion.div 
                                            className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm border border-blue-400/30"
                                            animate={{ 
                                                boxShadow: [
                                                    "0 0 20px rgba(59, 130, 246, 0.1)",
                                                    "0 0 30px rgba(59, 130, 246, 0.2)",
                                                    "0 0 20px rgba(59, 130, 246, 0.1)"
                                                ]
                                            }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                        >
                                            <Briefcase className="h-8 w-8 text-blue-400" />
                                        </motion.div>
                                        <div>
                                            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                                JobPortal
                                            </h1>
                                            <p className="text-xs text-slate-400">Find Your Dream Job</p>
                                        </div>
                                    </motion.div>

                                    {/* Welcome message */}
                                    <motion.h2 
                                        variants={itemVariants}
                                        className="text-2xl font-bold mb-2 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent"
                                    >
                                        Welcome Back!
                                    </motion.h2>
                                    <motion.p 
                                        variants={itemVariants}
                                        className="text-slate-400 mb-6"
                                    >
                                        Sign in to continue your job search journey
                                    </motion.p>
                                </motion.div>
                            </div>

                            {/* Form Section */}
                            <div className="px-8 pb-8">
                                {/* PRESERVED YOUR ORIGINAL FORM LOGIC */}
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <motion.div variants={itemVariants}>
                                        <EnhancedInput
                                            icon={Mail}
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email address"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <EnhancedInput
                                            icon={Lock}
                                            type="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </motion.div>

                                    {/* Form extras */}
                                    <motion.div variants={itemVariants} className="flex items-center justify-between text-sm">
                                        <label className="flex items-center gap-2 text-slate-300 cursor-pointer group">
                                            <input 
                                                type="checkbox" 
                                                className="rounded border-slate-600 bg-slate-800 focus:ring-blue-400 focus:ring-offset-0 text-blue-500 focus:ring-2"
                                            />
                                            <span className="group-hover:text-white transition-colors">Remember me</span>
                                        </label>
                                        <Link 
                                            to="/forgot-password" 
                                            className="text-blue-400 hover:text-blue-300 transition-colors hover:underline"
                                        >
                                            Forgot password?
                                        </Link>
                                    </motion.div>

                                    {/* Buttons */}
                                    <motion.div variants={itemVariants} className="space-y-4">
                                        {/* Login Button */}
                                        <motion.button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full h-14 group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                            whileHover={{ 
                                                scale: 1.02,
                                                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                                            }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {/* Button shine effect */}
                                            <motion.div
                                                className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                                                initial={{ x: "-100%" }}
                                                whileHover={{ x: "100%" }}
                                                transition={{ duration: 0.6 }}
                                            />
                                            
                                            <span className="relative flex items-center justify-center gap-2">
                                                {isLoading ? (
                                                    <>
                                                        <motion.div
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                                        />
                                                        Signing in...
                                                    </>
                                                ) : (
                                                    <>
                                                        <User className="h-5 w-5" />
                                                        Sign In
                                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                                    </>
                                                )}
                                            </span>
                                        </motion.button>

                                        {/* Sign up Button */}
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Link 
                                                to="/signup-candidate" 
                                                className="w-full h-14 flex items-center justify-center gap-2 bg-slate-800/50 text-slate-300 font-semibold rounded-xl border-2 border-slate-600/50 hover:border-slate-500/50 hover:bg-slate-700/50 hover:text-white transition-all duration-300 group"
                                            >
                                                <Sparkles className="h-5 w-5 text-purple-400" />
                                                Create New Account
                                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </motion.div>
                                    </motion.div>
                                </form>
                            </div>

                            {/* Footer Section */}
                            <motion.div 
                                variants={itemVariants}
                                className="px-8 pb-6 border-t border-slate-700/50"
                            >
                                <div className="pt-6 text-center">
                                    <div className="flex items-center justify-center gap-4 text-slate-500 mb-3">
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                                        >
                                            <CheckCircle className="h-4 w-4" />
                                        </motion.div>
                                        <span className="text-xs">Secure & Trusted</span>
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                                        >
                                            <Star className="h-4 w-4" />
                                        </motion.div>
                                    </div>
                                    <p className="text-xs text-slate-400">
                                        Join thousands of professionals finding their perfect career match
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
};

export default LoginCandidate;