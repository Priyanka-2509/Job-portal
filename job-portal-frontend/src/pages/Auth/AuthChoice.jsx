import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Briefcase, Building, Users, MapPin, Search, TrendingUp } from "lucide-react";

// Floating Particles Component with job-themed elements
const JobFloatingParticles = () => {
    const particles = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 2,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
        type: Math.random() > 0.7 ? 'icon' : 'particle',
    }));

    const jobIcons = [Briefcase, Building, Users, MapPin, Search, TrendingUp];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => {
                const IconComponent = jobIcons[Math.floor(Math.random() * jobIcons.length)];
                
                return particle.type === 'icon' ? (
                    <motion.div
                        key={particle.id}
                        className="absolute opacity-20"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                        }}
                        animate={{
                            y: [-20, -80, -20],
                            x: [-10, 10, -10],
                            rotate: [0, 180, 360],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: particle.duration,
                            delay: particle.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <IconComponent className="h-6 w-6 text-blue-400" />
                    </motion.div>
                ) : (
                    <motion.div
                        key={particle.id}
                        className="absolute rounded-full opacity-40"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            background: `linear-gradient(45deg, 
                                rgba(59, 130, 246, 0.4), 
                                rgba(139, 92, 246, 0.4), 
                                rgba(16, 185, 129, 0.4))`,
                        }}
                        animate={{
                            y: [-20, -100, -20],
                            x: [-15, 15, -15],
                            scale: [1, 1.3, 1],
                            opacity: [0.2, 0.6, 0.2],
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

// Job-themed Background Animation
const JobBackground = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            {/* Main rotating ring */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            >
                <div className="absolute h-[120vh] w-[120vh] rounded-full border-2 border-t-blue-400/30 border-l-purple-400/30 border-b-cyan-400/30 border-r-transparent filter blur-3xl opacity-50" />
                <div className="absolute h-[90vh] w-[90vh] rounded-full border-2 border-t-purple-400/25 border-l-cyan-400/25 border-b-blue-400/25 border-r-transparent filter blur-2xl opacity-40" />
            </motion.div>
            
            {/* Floating job-themed shapes */}
            <motion.div
                className="absolute top-1/4 right-1/6 w-20 h-20 opacity-20"
                animate={{
                    y: [-20, 20, -20],
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <Building className="w-full h-full text-blue-400" />
            </motion.div>
            
            <motion.div
                className="absolute bottom-1/4 left-1/6 w-16 h-16 opacity-25"
                animate={{
                    y: [20, -20, 20],
                    rotate: [360, 0],
                    scale: [1.1, 1, 1.1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <Briefcase className="w-full h-full text-purple-400" />
            </motion.div>
            
            <motion.div
                className="absolute top-2/3 right-1/4 w-12 h-12 opacity-30"
                animate={{
                    x: [-15, 15, -15],
                    y: [-10, 10, -10],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <Users className="w-full h-full text-cyan-400" />
            </motion.div>

            {/* Gradient orbs */}
            <motion.div
                className="absolute top-1/3 left-1/5 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full filter blur-3xl"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            
            <motion.div
                className="absolute bottom-1/3 right-1/5 w-24 h-24 bg-gradient-to-r from-cyan-500/10 to-green-500/10 rounded-full filter blur-3xl"
                animate={{
                    scale: [1.3, 1, 1.3],
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
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            {/* Multi-layer glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl" />
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm" />
            <div className="relative bg-card/70 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/20 border border-white/20 group-hover:border-white/30 transition-all duration-300">
                {children}
            </div>
        </motion.div>
    );
};

const AuthChoice = () => {
    // --- YOUR ORIGINAL LOGIC - PRESERVED EXACTLY ---
    const navigate = useNavigate();
    // --- END OF YOUR LOGIC ---

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
                staggerChildren: 0.2, 
                delayChildren: 0.3,
                duration: 0.8
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
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

    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1] 
            } 
        }
    };

    return (
        <>
            {/* Enhanced Custom Cursor */}
            <motion.div
                style={{ x: mousePosition.x - 20, y: mousePosition.y - 20 }}
                className="fixed top-0 left-0 h-10 w-10 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full pointer-events-none z-[9999] backdrop-filter backdrop-blur-sm border border-white/30"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
            
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 relative overflow-hidden cursor-none">
                {/* Background Effects */}
                <JobBackground />
                <JobFloatingParticles />

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 w-full max-w-md"
                >
                    <GlowCard>
                        <div className="p-8 md:p-10">
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="text-center space-y-8"
                            >
                                {/* Animated Logo/Icon */}
                                <motion.div
                                    variants={titleVariants}
                                    className="flex justify-center mb-6"
                                >
                                    <motion.div
                                        className="relative"
                                        animate={{ 
                                            rotate: [0, 5, -5, 0],
                                            scale: [1, 1.05, 1]
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <div className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm border border-white/20">
                                            <Briefcase className="h-12 w-12 text-blue-400" />
                                        </div>
                                        {/* Glowing ring around icon */}
                                        <motion.div
                                            className="absolute inset-0 rounded-2xl border-2 border-blue-400/50"
                                            animate={{
                                                scale: [1, 1.1, 1],
                                                opacity: [0.5, 0.8, 0.5],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        />
                                    </motion.div>
                                </motion.div>

                                {/* Title */}
                                <motion.div variants={titleVariants}>
                                    <motion.h2 
                                        className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                                        animate={{
                                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                        style={{
                                            backgroundSize: "200% 200%"
                                        }}
                                    >
                                        Welcome to the Job Portal
                                    </motion.h2>
                                </motion.div>

                                {/* Subtitle */}
                                <motion.div variants={itemVariants}>
                                    <p className="text-foreground/70 text-lg mb-8 leading-relaxed">
                                        Choose your role to get started:
                                    </p>
                                </motion.div>

                                {/* Button Group */}
                                <motion.div variants={itemVariants} className="space-y-4">
                                    {/* Candidate Button - YOUR ORIGINAL LOGIC PRESERVED */}
                                    <motion.button
                                        onClick={() => navigate("/login-candidate")}
                                        className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300"
                                        whileHover={{ 
                                            scale: 1.02, 
                                            y: -2,
                                            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {/* Button glow effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            initial={false}
                                        />
                                        
                                        {/* Button content */}
                                        <div className="relative flex items-center justify-center gap-3">
                                            <motion.div
                                                animate={{ rotate: [0, 10, -10, 0] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                <Users className="h-5 w-5" />
                                            </motion.div>
                                            <span className="text-lg">I'm a Candidate</span>
                                        </div>
                                        
                                        {/* Animated shine effect */}
                                        <motion.div
                                            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                                            initial={{ x: "-100%" }}
                                            whileHover={{ x: "100%" }}
                                            transition={{ duration: 0.6 }}
                                        />
                                    </motion.button>

                                    {/* Employer Button - YOUR ORIGINAL LOGIC PRESERVED */}
                                    <motion.button
                                        onClick={() => navigate("/login-employer")}
                                        className="w-full group relative overflow-hidden bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300"
                                        whileHover={{ 
                                            scale: 1.02, 
                                            y: -2,
                                            boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)"
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {/* Button glow effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            initial={false}
                                        />
                                        
                                        {/* Button content */}
                                        <div className="relative flex items-center justify-center gap-3">
                                            <motion.div
                                                animate={{ rotate: [0, -10, 10, 0] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                <Building className="h-5 w-5" />
                                            </motion.div>
                                            <span className="text-lg">I'm an Employer</span>
                                        </div>
                                        
                                        {/* Animated shine effect */}
                                        <motion.div
                                            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                                            initial={{ x: "-100%" }}
                                            whileHover={{ x: "100%" }}
                                            transition={{ duration: 0.6 }}
                                        />
                                    </motion.button>
                                </motion.div>

                                {/* Additional decorative elements */}
                                <motion.div
                                    variants={itemVariants}
                                    className="pt-6 border-t border-white/10"
                                >
                                    <div className="flex items-center justify-center gap-4 text-foreground/50">
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                                        >
                                            <Search className="h-4 w-4" />
                                        </motion.div>
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                        >
                                            <TrendingUp className="h-4 w-4" />
                                        </motion.div>
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                                        >
                                            <MapPin className="h-4 w-4" />
                                        </motion.div>
                                    </div>
                                    <p className="text-sm text-foreground/40 mt-2">
                                        Connecting talent with opportunity
                                    </p>
                                </motion.div>
                            </motion.div>
                        </div>
                    </GlowCard>
                </motion.div>
            </div>
        </>
    );
};

export default AuthChoice;