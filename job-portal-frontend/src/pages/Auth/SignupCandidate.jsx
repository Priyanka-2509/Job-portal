import React, { useState, useEffect } from "react";
import API from "../../services/api";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, Sparkles, ArrowRight, Briefcase, Target, GraduationCap, Eye, EyeOff } from "lucide-react";

// --- UI Components from your reference file ---

// New Dark Animated Background
const AnimatedGradientBackground = () => {
    return (
        <motion.div
            className="absolute inset-0 z-0"
            animate={{
                background: [
                    "radial-gradient(circle at 10% 20%, rgba(30, 30, 80, 0.8), transparent 50%)",
                    "radial-gradient(circle at 80% 90%, rgba(80, 30, 80, 0.8), transparent 50%)",
                    "radial-gradient(circle at 50% 50%, rgba(30, 80, 80, 0.8), transparent 50%)",
                    "radial-gradient(circle at 10% 20%, rgba(30, 30, 80, 0.8), transparent 50%)",
                ]
            }}
            transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    );
};


// Candidate-focused floating particles
const CandidateFloatingParticles = () => {
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
    }));
    const candidateIcons = [Briefcase, Target, GraduationCap, Sparkles];

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {particles.map((p) => {
                const Icon = candidateIcons[Math.floor(Math.random() * candidateIcons.length)];
                return (
                    <motion.div
                        key={p.id}
                        className="absolute text-cyan-400/20"
                        style={{ left: `${p.x}%`, top: `${p.y}%` }}
                        animate={{
                            y: [0, -100, 0],
                            rotate: [0, Math.random() * 180, 0],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: p.duration,
                            delay: p.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <Icon style={{ width: p.size * 5, height: p.size * 5 }} />
                    </motion.div>
                );
            })}
        </div>
    );
};

// Enhanced input component
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
            <Icon className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-300 ${isFocused ? 'text-cyan-400' : 'text-slate-400'}`} />
            <input
                type={type === 'password' && showPassword ? 'text' : type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full h-14 pl-12 pr-12 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
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

const SignupCandidate = () => {
    // --- YOUR ORIGINAL LOGIC - UNCHANGED ---
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        role: "candidate",
    });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await API.post("/auth/register", formData);
            alert("Signup successful!");
            navigate("/login-candidate");
        } catch (err) {
            alert(err.response?.data?.msg || "Error signing up");
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
        const newClick = {
            x: e.clientX,
            y: e.clientY,
            id: Date.now(),
        };
        setClicks(prev => [...prev, newClick]);
        setTimeout(() => {
            setClicks(prev => prev.filter(c => c.id !== newClick.id));
        }, 1000); // Remove click after 1 second
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
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
                <CandidateFloatingParticles />

                <AnimatePresence>
                    {clicks.map(click => (
                        <motion.div
                            key={click.id}
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 10, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="absolute rounded-full bg-cyan-400/30 pointer-events-none"
                            style={{
                                left: click.x - 25,
                                top: click.y - 25,
                                width: 50,
                                height: 50,
                            }}
                        />
                    ))}
                </AnimatePresence>


                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/10"
                >
                    {/* Left Panel */}
                    <div className="hidden md:flex flex-col justify-center p-12 bg-card/50 backdrop-blur-lg text-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
                        >
                            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">Start Your Journey</h2>
                            <p className="text-foreground/70 mb-8">Create an account to unlock your full potential and find the job that's right for you.</p>
                            <Link to="/" className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                                <Sparkles className="h-4 w-4" />
                                Explore Opportunities
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Panel (Form) */}
                    <div className="p-8 md:p-10 bg-card/80 backdrop-blur-xl">
                        <motion.div variants={containerVariants} initial="hidden" animate="visible">
                            <motion.h2 variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="text-3xl font-bold mb-2 text-center">Candidate Sign Up</motion.h2>
                            <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="text-foreground/60 mb-8 text-center text-sm">Let's get you started!</motion.p>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <EnhancedInput icon={User} type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
                                <EnhancedInput icon={Mail} type="email" name="email" placeholder="Email" onChange={handleChange} required />
                                <EnhancedInput icon={User} type="text" name="username" placeholder="Username" onChange={handleChange} required />
                                <EnhancedInput icon={Lock} type="password" name="password" placeholder="Password" onChange={handleChange} required />
                                
                                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full h-14 group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                    >
                                        {isLoading ? (
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full"
                                            />
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                Create Account <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        )}
                                    </button>
                                </motion.div>
                            </form>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="text-center text-sm text-foreground/60 mt-6"
                            >
                                Already have an account?{" "}
                                <Link to="/login-candidate" className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
                                    Login
                                </Link>
                            </motion.p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default SignupCandidate;

