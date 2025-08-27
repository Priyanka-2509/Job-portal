// src/pages/Auth/LoginEmployer.jsx
//src/pages/Auth/LoginEmployer.jsx
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { motion, AnimatePresence } from "motion/react";
import { Building, Lock, Mail, Eye, EyeOff, Users, Sparkles, ArrowRight, CheckCircle, Star, TrendingUp, Award, Target } from "lucide-react";

// Employer-focused floating particles
const EmployerFloatingParticles = () => {
    const particles = Array.from({ length: 55 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 22 + 18,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.6 + 0.2,
        type: Math.random() > 0.75 ? 'icon' : 'circle',
    }));

    const employerIcons = [Building, Users, TrendingUp, Award, Target];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => {
                const IconComponent = employerIcons[Math.floor(Math.random() * employerIcons.length)];
                
                return particle.type === 'icon' ? (
                    <motion.div
                        key={particle.id}
                        className="absolute opacity-15"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                        }}
                        animate={{
                            y: [-35, -125, -35],
                            x: [-25, 25, -25],
                            rotate: [0, 360],
                            scale: [1, 1.3, 1],
                            opacity: [particle.opacity * 0.3, particle.opacity * 0.8, particle.opacity * 0.3],
                        }}
                        transition={{
                            duration: particle.duration,
                            delay: particle.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <IconComponent className="h-4 w-4 text-purple-400" />
                    </motion.div>
                ) : (
                    <motion.div
                        key={particle.id}
                        className="absolute rounded-full"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            background: `linear-gradient(135deg, 
                                rgba(147, 51, 234, ${particle.opacity}), 
                                rgba(59, 130, 246, ${particle.opacity * 0.8}))`,
                        }}
                        animate={{
                            y: [-40, -130, -40],
                            x: [-20, 20, -20],
                            scale: [1, 1.4, 1],
                            opacity: [particle.opacity * 0.3, particle.opacity, particle.opacity * 0.3],
                        }}
                        transition={{
                            duration: particle.duration,
                            delay: particle.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                );
            })}
        </div>
    );
};

// Employer-focused background
const EmployerBackground = () => {
    return (
        <div className="absolute inset-0 z-0">
            {/* Main gradient background with purple emphasis */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />
            
            {/* Animated gradient overlay */}
            <motion.div
                className="absolute inset-0 opacity-25"
                style={{
                    background: `
                        radial-gradient(circle at 25% 25%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
                        radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.12) 0%, transparent 50%),
                        radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.08) 0%, transparent 50%)
                    `
                }}
                animate={{
                    opacity: [0.2, 0.35, 0.2],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            
            {/* Animated mesh gradient */}
            <motion.div
                className="absolute inset-0 opacity-15"
                animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{
                    backgroundImage: `
                        linear-gradient(60deg, transparent 30%, rgba(147, 51, 234, 0.1) 50%, transparent 70%),
                        linear-gradient(-60deg, transparent 30%, rgba(59, 130, 246, 0.08) 50%, transparent 70%)
                    `,
                    backgroundSize: '80px 80px',
                }}
            />

            {/* Floating employer icons */}
            <motion.div
                className="absolute top-1/3 left-1/5 w-10 h-10 text-purple-400/15"
                animate={{
                    y: [-25, 25, -25],
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <Building className="w-full h-full" />
            </motion.div>
            
            <motion.div
                className="absolute top-1/5 right-1/4 w-8 h-8 text-blue-400/20"
                animate={{
                    y: [25, -25, 25],
                    rotate: [360, 0],
                    scale: [1.1, 1, 1.1],
                }}
                transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <Users className="w-full h-full" />
            </motion.div>
            
            <motion.div
                className="absolute bottom-1/3 right-1/5 w-7 h-7 text-cyan-400/15"
                animate={{
                    x: [-20, 20, -20],
                    y: [-15, 15, -15],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 16,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <TrendingUp className="w-full h-full" />
            </motion.div>

            {/* Gradient orbs */}
            <motion.div
                className="absolute top-1/4 right-1/6 w-36 h-36 bg-gradient-to-r from-purple-500/8 to-blue-500/6 rounded-full filter blur-3xl"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            
            <motion.div
                className="absolute bottom-1/4 left-1/6 w-28 h-28 bg-gradient-to-r from-blue-500/6 to-cyan-500/8 rounded-full filter blur-3xl"
                animate={{
                    scale: [1.3, 1, 1.3],
                    opacity: [0.6, 0.4, 0.6],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
};

// Enhanced input component (same as candidate but with purple accent)
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
                    className="w-full h-14 pl-14 pr-14 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl text-white placeholder:text-slate-400 focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 focus:bg-slate-800/70 transition-all duration-300 hover:border-slate-600/50"
                />
                
                {/* Icon */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                    <Icon className={`h-5 w-5 transition-colors duration-300 ${isFocused ? 'text-purple-400' : 'text-slate-400'}`} />
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
            
            {/* Focus glow effect with purple theme */}
            <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 -z-10 blur-xl"
                animate={{ opacity: isFocused ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
};

const EmployerLogin = () => {
    // --- YOUR ORIGINAL LOGIC - PRESERVED EXACTLY ---
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post("http://localhost:5000/api/employers/login", formData);
            console.log("Login response:", res.data);


            setMessage("Login successful");

            console.log("Employer object:", res.data.employer);

            // ✅ Ensure user has role = employer
            const employerUser = {
                ...res.data.employer,
                role: "employer"
            };


            // Save employerId for ApplicantsList
            localStorage.setItem("employerId", res.data.employer.id);  // ✅ Add this line
            localStorage.setItem("role", "employer");
            localStorage.setItem("user", JSON.stringify(res.data.employer || {}));

            // ✅ Update AuthContext
            login(employerUser, res.data.token);

            // ✅ Redirect employer directly to dashboard
            navigate("/");
        } catch (err) {
            setMessage(err.response?.data?.message || "Error logging in");
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
                className="fixed top-0 left-0 h-10 w-10 bg-gradient-to-r from-purple-400/30 to-blue-400/30 rounded-full pointer-events-none z-[9999] backdrop-filter backdrop-blur-sm border border-white/20"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
            
            <div className="min-h-screen text-white relative overflow-hidden cursor-none flex items-center justify-center p-4">
                {/* Employer Background */}
                <EmployerBackground />
                <EmployerFloatingParticles />

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
                        {/* Card glow effects with purple theme */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-500/30 rounded-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-sm" />
                        
                        {/* Main card content */}
                        <div className="relative bg-slate-900/70 backdrop-blur-2xl rounded-3xl border border-slate-700/50 shadow-2xl shadow-purple-500/10 overflow-hidden">
                            {/* Header Section */}
                            <div className="relative p-8 pb-6">
                                {/* Background decoration with purple gradient */}
                                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-transparent" />
                                
                                <motion.div variants={itemVariants} className="relative z-10 text-center">
                                    {/* Logo */}
                                    <motion.div 
                                        className="flex items-center justify-center gap-3 mb-6"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <motion.div 
                                            className="p-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl backdrop-blur-sm border border-purple-400/30"
                                            animate={{ 
                                                boxShadow: [
                                                    "0 0 20px rgba(147, 51, 234, 0.1)",
                                                    "0 0 30px rgba(147, 51, 234, 0.2)",
                                                    "0 0 20px rgba(147, 51, 234, 0.1)"
                                                ]
                                            }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                        >
                                            <Building className="h-8 w-8 text-purple-400" />
                                        </motion.div>
                                        <div>
                                            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                                JobPortal
                                            </h1>
                                            <p className="text-xs text-slate-400">Hire Top Talent</p>
                                        </div>
                                    </motion.div>

                                    {/* Welcome message */}
                                    <motion.h2 
                                        variants={itemVariants}
                                        className="text-2xl font-bold mb-2 bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent"
                                    >
                                        Hello, Employer!
                                    </motion.h2>
                                    <motion.p 
                                        variants={itemVariants}
                                        className="text-slate-400 mb-6"
                                    >
                                        Post jobs and find the best talent for your company
                                    </motion.p>
                                </motion.div>
                            </div>

                            {/* Form Section */}
                            <div className="px-8 pb-8">
                                {/* Message Display - PRESERVED FROM YOUR ORIGINAL */}
                                <AnimatePresence>
                                    {message && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                            className={`mb-4 p-3 rounded-lg text-center text-sm ${
                                                message.includes('successful') 
                                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                            }`}
                                        >
                                            {message}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

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
                                                className="rounded border-slate-600 bg-slate-800 focus:ring-purple-400 focus:ring-offset-0 text-purple-500 focus:ring-2"
                                            />
                                            <span className="group-hover:text-white transition-colors">Remember me</span>
                                        </label>
                                        <Link 
                                            to="/forgot-password-employer" 
                                            className="text-purple-400 hover:text-purple-300 transition-colors hover:underline"
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
                                            className="w-full h-14 group relative overflow-hidden bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                            whileHover={{ 
                                                scale: 1.02,
                                                boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)"
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
                                                        <Building className="h-5 w-5" />
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
                                                to="/signup-employer" 
                                                className="w-full h-14 flex items-center justify-center gap-2 bg-slate-800/50 text-slate-300 font-semibold rounded-xl border-2 border-slate-600/50 hover:border-slate-500/50 hover:bg-slate-700/50 hover:text-white transition-all duration-300 group"
                                            >
                                                <Sparkles className="h-5 w-5 text-purple-400" />
                                                Create Company Account
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
                                            <Building className="h-4 w-4" />
                                        </motion.div>
                                        <span className="text-xs">Trusted by Companies</span>
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                                        >
                                            <Award className="h-4 w-4" />
                                        </motion.div>
                                    </div>
                                    <p className="text-xs text-slate-400">
                                        Connect with top talent and grow your business
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

export default EmployerLogin;