import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import Navbar from "../components/Navbar";
import {
    Briefcase, MapPin, Search, DollarSign, Heart, Zap,
    Target, ShieldCheck, Rocket, Clock,
    CheckCircle, AlertCircle, 
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "motion/react";

// --- DATA FOR THE PAGE ---

const featuredJobs = [
    {
        id: 1,
        title: 'Full Stack Developer',
        company: 'OpenAI',
        type: 'Full-time',
        location: 'Remote',
        salary: '$100,000',
        postedDate: '2 days ago',
        description: 'Work on cutting-edge AI tools and infrastructure. Join our team building the future of artificial intelligence and help create tools that empower millions of users worldwide.'
    },
    {
        id: 2,
        title: 'Python Developer',
        company: 'Auraix',
        type: 'Full-time',
        location: 'Mumbai',
        salary: '$60,000',
        postedDate: '1 day ago',
        description: 'Coding, designing, deploying, and debugging software projects, typically focusing on server-side (back-end) development. Work with cutting-edge Python frameworks and technologies.'
    },
    {
        id: 3,
        title: 'Web Developer',
        company: 'Auraix',
        type: 'Full-time',
        location: 'Mumbai',
        salary: '$55,000',
        postedDate: '3 days ago',
        description: 'Building, maintaining, and optimizing websites and web applications by writing code that translates design concepts into functional digital products.'
    }
];

const features = [
    {
        icon: Target,
        title: "AI-Powered Matching",
        description: "Our smart algorithm connects you with jobs that perfectly match your skills and career goals.",
        color: "blue"
    },
    {
        icon: ShieldCheck,
        title: "Verified Opportunities",
        description: "Every job posting is verified by our team, ensuring you apply to legitimate and high-quality roles.",
        color: "purple"
    },
    {
        icon: Rocket,
        title: "Fast-Track Applications",
        description: "Apply to jobs with a single click and get your profile directly in front of hiring managers.",
        color: "cyan"
    }
];

// --- ENHANCED COMPONENTS ---

// Custom cursor component
const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseEnter = () => {
            setIsHovering(true);
        };

        const handleMouseLeave = () => setIsHovering(false);

        const handleMouseDown = () => {
            setIsClicking(true);
        };

        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        
        const interactiveElements = document.querySelectorAll('button, a, .interactive, input');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            interactiveElements.forEach(element => {
                element.removeEventListener('mouseenter', handleMouseEnter);
                element.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <>
            <motion.div
                className="fixed w-8 h-8 bg-blue-400/20 rounded-full pointer-events-none z-50 mix-blend-difference border border-blue-400/40"
                animate={{ 
                    x: mousePosition.x - 16, 
                    y: mousePosition.y - 16,
                    scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
                    backgroundColor: isClicking ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.2)'
                }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
            />
            <motion.div
                className="fixed w-2 h-2 bg-blue-400 rounded-full pointer-events-none z-50"
                animate={{ 
                    x: mousePosition.x - 4, 
                    y: mousePosition.y - 4,
                    scale: isClicking ? 1.5 : 1
                }}
                transition={{ type: "spring", stiffness: 1000, damping: 30 }}
            />
        </>
    );
};

// Enhanced ripple effect
const RippleEffect = ({ x, y, onComplete }) => {
    return (
        <motion.div
            className="absolute rounded-full bg-blue-400/40 pointer-events-none"
            style={{ 
                left: x - 25, 
                top: y - 25,
                width: 50,
                height: 50
            }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onAnimationComplete={onComplete}
        />
    );
};

// Enhanced form validation
const ValidatedInput = ({ 
    icon: Icon, 
    placeholder, 
    value, 
    onChange, 
    onKeyPress, 
    validationRules = [], 
    type = "text",
    iconColor = "text-blue-400"
}) => {
    const [errors, setErrors] = useState([]);
    const [touched, setTouched] = useState(false);
    const [focused, setFocused] = useState(false);

    const validate = useCallback((val) => {
        const newErrors = [];
        validationRules.forEach(rule => {
            if (!rule.test(val)) {
                newErrors.push(rule.message);
            }
        });
        setErrors(newErrors);
        return newErrors.length === 0;
    }, [validationRules]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        onChange(e);
        if (touched) {
            validate(newValue);
        }
    };

    const handleBlur = () => {
        setTouched(true);
        setFocused(false);
        validate(value);
    };

    const handleFocus = () => {
        setFocused(true);
    };

    const isValid = errors.length === 0 && touched && value.length > 0;
    const hasErrors = errors.length > 0 && touched;

    return (
        <div className="relative w-full">
            <div className="relative">
                <Icon className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${iconColor} pointer-events-none transition-all duration-300 ${focused ? 'scale-110' : ''}`} />
                
                <motion.div
                    className={`absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                        touched ? 'opacity-100' : 'opacity-0'
                    }`}
                    animate={{ 
                        scale: isValid ? [1, 1.2, 1] : hasErrors ? [1, 1.1, 1] : 1,
                        rotate: isValid ? [0, 10, 0] : hasErrors ? [0, -10, 0] : 0
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {isValid ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : hasErrors ? (
                        <AlertCircle className="h-5 w-5 text-red-400" />
                    ) : null}
                </motion.div>

                <Input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    onKeyPress={onKeyPress}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    className={`text-gray-900 interactive pr-12 transition-all duration-300 ${
                        focused ? 'ring-2 ring-blue-400/50' : ''
                    } ${
                        hasErrors ? 'border-red-400/50 ring-2 ring-red-400/20' : 
                        isValid ? 'border-green-400/50 ring-2 ring-green-400/20' : ''
                    }`}
                />
            </div>

            <AnimatePresence>
                {hasErrors && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        className="absolute top-full left-0 mt-2 w-full"
                    >
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 backdrop-blur-lg">
                            {errors.map((error, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-2 text-red-400 text-sm"
                                >
                                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                    <span>{error}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Loading screen component
const LoadingScreen = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 3500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-background flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <motion.div
                className="text-center"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.h1
                    className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
                    initial={{ y: 100, opacity: 0, rotateX: -30 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    style={{ perspective: '1000px' }}
                >
                    JobHunt
                </motion.h1>
                <motion.div
                    className="mt-8 flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                >
                    {[0, 1, 2].map((index) => (
                        <motion.div
                            key={index}
                            className={`w-3 h-3 rounded-full mx-2 ${
                                index === 0 ? 'bg-blue-400' : 
                                index === 1 ? 'bg-purple-400' : 'bg-cyan-400'
                            }`}
                            animate={{ 
                                y: [0, -20, 0],
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5] 
                            }}
                            transition={{ 
                                duration: 1.5, 
                                repeat: Infinity, 
                                delay: index * 0.2,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

// Enhanced job card component with scroll animations
const JobCard = ({ job, index }) => {
    const [ripples, setRipples] = useState([]);
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, margin: "0px 0px -100px 0px" });

    const handleClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const newRipple = { x, y, id: Date.now() };
        setRipples(prev => [...prev, newRipple]);
    };

    const removeRipple = (id) => {
        setRipples(prev => prev.filter(ripple => ripple.id !== id));
    };

    const getCompanyGradient = (company) => {
        switch (company) {
            case "OpenAI": return "from-emerald-400 via-teal-400 to-cyan-400";
            case "Auraix": return "from-purple-400 via-violet-400 to-indigo-400";
            default: return "from-blue-400 via-purple-400 to-cyan-400";
        }
    };

    const getCompanyAccent = (company) => {
        switch (company) {
            case "OpenAI": return "text-emerald-400";
            case "Auraix": return "text-purple-400";
            default: return "text-blue-400";
        }
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ 
                opacity: 0, 
                x: index % 2 === 0 ? -200 : 200,
                rotateY: index % 2 === 0 ? -25 : 25,
                scale: 0.6,
                filter: "blur(10px)"
            }}
            animate={isInView ? { 
                opacity: 1, 
                x: 0,
                rotateY: 0,
                scale: 1,
                filter: "blur(0px)"
            } : {}}
            transition={{ 
                duration: 1.2, 
                delay: index * 0.3,
                ease: [0.23, 1, 0.32, 1]
            }}
            whileHover={{ 
                y: -20,
                rotateX: 8,
                scale: 1.05,
                transition: { duration: 0.4, ease: "easeOut" }
            }}
            className="perspective-1000 h-full"
        >
            <div
                onClick={handleClick}
                className="interactive relative overflow-hidden bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-xl p-8 rounded-3xl border border-white/20 transition-all duration-500 hover:border-blue-400/60 hover:shadow-2xl hover:shadow-blue-500/25 group transform-gpu h-full flex flex-col cursor-pointer"
                style={{
                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.7) 100%)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px 0 rgba(59, 130, 246, 0.15)',
                }}
            >
                {/* Animated background effects */}
                <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.6 }}
                />
                
                <motion.div 
                    className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-sm"
                    transition={{ duration: 0.6 }}
                />

                {/* Floating particles on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-blue-400/60 rounded-full"
                            style={{
                                left: `${20 + i * 15}%`,
                                top: `${30 + (i % 2) * 40}%`,
                            }}
                            animate={{
                                y: [-10, -30, -10],
                                opacity: [0, 1, 0],
                                scale: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <motion.div 
                                className={`w-16 h-16 bg-gradient-to-br ${getCompanyGradient(job.company)} rounded-xl flex items-center justify-center text-white font-bold shadow-lg`}
                                whileHover={{ scale: 1.15, rotate: 8 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                {job.company.charAt(0)}
                            </motion.div>
                            <div>
                                <motion.h3 
                                    className="font-bold text-xl text-foreground group-hover:text-blue-400 transition-colors duration-300"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {job.title}
                                </motion.h3>
                                <p className={`font-medium ${getCompanyAccent(job.company)}`}>{job.company}</p>
                            </div>
                        </div>
                        <motion.button 
                            className="p-3 rounded-lg border border-white/10 hover:bg-red-500/10 transition-all duration-300 group/heart"
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            <Heart className="h-5 w-5 text-foreground/60 group-hover/heart:text-red-400 transition-colors" />
                        </motion.button>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-foreground/70 mb-6">
                        <motion.div 
                            className="flex items-center gap-2 group/item"
                            whileHover={{ x: 8, scale: 1.05 }}
                        >
                            <MapPin className="h-4 w-4 group-hover/item:text-blue-400 transition-colors" />
                            <span className="group-hover/item:text-blue-400 transition-colors">{job.location}</span>
                        </motion.div>
                        <motion.div 
                            className="flex items-center gap-2 group/item"
                            whileHover={{ x: 8, scale: 1.05 }}
                        >
                            <Clock className="h-4 w-4 group-hover/item:text-purple-400 transition-colors" />
                            <span className="group-hover/item:text-purple-400 transition-colors">{job.postedDate}</span>
                        </motion.div>
                        <motion.div 
                            className="flex items-center gap-2 group/item"
                            whileHover={{ scale: 1.1 }}
                        >
                            <DollarSign className="h-4 w-4 text-green-400" /> 
                            <span className="text-green-400 font-semibold">{job.salary}</span>
                        </motion.div>
                    </div>
                    
                    <motion.p 
                        className="text-foreground/70 text-sm leading-relaxed mb-6 flex-grow"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                    >
                        {job.description}
                    </motion.p>
                    
                    <div className="flex items-center justify-between">
                        <motion.span 
                            className="bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-xs font-medium border border-blue-400/20"
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                        >
                            {job.type}
                        </motion.span>
                        <motion.div
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button 
                                size="sm" 
                                className="interactive relative overflow-hidden"
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0"
                                    whileHover={{ opacity: 0.2 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <Zap className="h-4 w-4 mr-2" />
                                Apply Now
                            </Button>
                        </motion.div>
                    </div>
                </div>
                
                {/* Ripple effects */}
                {ripples.map(ripple => (
                    <RippleEffect
                        key={ripple.id}
                        x={ripple.x}
                        y={ripple.y}
                        onComplete={() => removeRipple(ripple.id)}
                    />
                ))}
                
                {/* Enhanced corner glow */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-500/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
            </div>
        </motion.div>
    );
};

// Scroll-triggered section component
const ScrollSection = ({ children, className = "", delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
            style={{ y: scrollYProgress }}
        >
            {children}
        </motion.div>
    );
};

// --- ANIMATION VARIANTS ---

const sectionVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            ease: [0.23, 1, 0.32, 1],
            staggerChildren: 0.15
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
            duration: 0.8, 
            ease: [0.23, 1, 0.32, 1]
        } 
    }
};

// --- HOME COMPONENT ---

export default function Home() {
    const [jobKeyword, setJobKeyword] = useState('');
    const [jobLocation, setJobLocation] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);
    const navigate = useNavigate();

    // Validation rules
    const keywordValidation = [
        { test: (val) => val.length >= 2, message: "Please enter at least 2 characters" },
        { test: (val) => /^[a-zA-Z\s]+$/.test(val) || val === "", message: "Only letters and spaces allowed" }
    ];

    const locationValidation = [
        { test: (val) => val.length >= 2 || val === "", message: "Please enter at least 2 characters" },
        { test: (val) => /^[a-zA-Z\s,]+$/.test(val) || val === "", message: "Only letters, spaces, and commas allowed" }
    ];

    const handleSearch = () => {
        const keywordValid = keywordValidation.every(rule => rule.test(jobKeyword));
        const locationValid = locationValidation.every(rule => rule.test(jobLocation));
        
        if (keywordValid && locationValid && (jobKeyword.length >= 2 || jobLocation.length >= 2)) {
            navigate(`/browse-jobs?keyword=${jobKeyword}&location=${jobLocation}`);
        }
    };

    const handleLoadingComplete = () => {
        setIsLoading(false);
        setTimeout(() => setShowContent(true), 300);
    };

    const { scrollYProgress } = useScroll();
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    const particles = Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 25 + 20,
        delay: Math.random() * 8,
    }));

    const popularSearches = ["Software Engineer", "Product Manager", "Designer", "Marketing", "Sales"];

    return (
        <>
            <CustomCursor />
            
            <AnimatePresence>
                {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
            </AnimatePresence>
            
            <AnimatePresence>
                {showContent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Navbar />

                        {/* Hero Section with Parallax */}
                        <section className="relative w-full min-h-screen flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
                            {/* Enhanced Background Effects */}
                            <motion.div 
                                className="absolute inset-0 z-0"
                                style={{ y: backgroundY }}
                            >
                                {particles.map((p) => (
                                    <motion.div
                                        key={p.id}
                                        className="absolute rounded-full bg-blue-500/20"
                                        style={{ 
                                            left: p.x, 
                                            top: p.y, 
                                            width: p.size, 
                                            height: p.size 
                                        }}
                                        animate={{ 
                                            y: [0, -150, 0], 
                                            opacity: [0, 0.8, 0], 
                                            scale: [0.3, 1.2, 0.3],
                                            rotate: [0, 360]
                                        }}
                                        transition={{ 
                                            duration: p.duration, 
                                            delay: p.delay, 
                                            repeat: Infinity, 
                                            ease: "easeInOut" 
                                        }}
                                    />
                                ))}
                                
                                {/* Enhanced gradient orbs */}
                                <motion.div
                                    className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full filter blur-3xl"
                                    animate={{ 
                                        x: [0, 200, 0], 
                                        y: [0, 100, 0], 
                                        scale: [1, 1.4, 1],
                                        rotate: [0, 180, 360]
                                    }}
                                    transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <motion.div
                                    className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/25 rounded-full filter blur-3xl"
                                    animate={{ 
                                        x: [0, -150, 0], 
                                        y: [0, -80, 0], 
                                        scale: [1, 1.3, 1],
                                        rotate: [360, 180, 0]
                                    }}
                                    transition={{ duration: 35, repeat: Infinity, ease: "easeInOut", delay: 8 }}
                                />
                                <motion.div
                                    className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-blue-600/15 rounded-full filter blur-3xl"
                                    animate={{ 
                                        x: [-200, 100, -200], 
                                        y: [-100, 150, -100], 
                                        scale: [0.8, 1.5, 0.8]
                                    }}
                                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 15 }}
                                />
                            </motion.div>

                            <motion.div
                                variants={sectionVariants}
                                initial="hidden"
                                animate="visible"
                                className="relative z-10 text-center max-w-6xl mx-auto"
                                style={{ y: heroY }}
                            >
                                <motion.div 
                                    variants={itemVariants} 
                                    className="inline-flex items-center gap-3 bg-card/60 backdrop-blur-xl border border-white/20 rounded-full px-8 py-4 mb-10 interactive"
                                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                                >
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Zap className="h-6 w-6 text-blue-400" />
                                    </motion.div>
                                    <span className="font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                        ✨ Over 10,000+ Premium Opportunities
                                    </span>
                                </motion.div>

                                <motion.h1 
                                    variants={itemVariants} 
                                    className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight text-foreground"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <motion.span
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                    >
                                        Find Your Dream Job.
                                    </motion.span>
                                    <br />
                                    <motion.span 
                                        className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.4 }}
                                    >
                                        You Deserve It.
                                    </motion.span>
                                </motion.h1>

                                <motion.p 
                                    variants={itemVariants} 
                                    className="text-xl md:text-2xl text-foreground/80 mb-16 max-w-4xl mx-auto leading-relaxed"
                                >
                                    Explore thousands of opportunities from top companies and kickstart your career journey with confidence.
                                </motion.p>

                                <motion.div variants={itemVariants} className="relative max-w-5xl mx-auto">
                                    <motion.div
                                        className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-3xl blur-2xl opacity-30"
                                        animate={{ 
                                            opacity: [0.3, 0.6, 0.3], 
                                            scale: [1, 1.05, 1],
                                            rotate: [0, 1, 0]
                                        }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                    <div className="relative bg-card/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/20 p-8 border border-white/20">
                                        <div className="flex flex-col md:flex-row items-center gap-6">
                                            <ValidatedInput
                                                icon={Briefcase}
                                                placeholder="Job title, keywords, or company"
                                                value={jobKeyword}
                                                onChange={(e) => setJobKeyword(e.target.value)}
                                                onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
                                                validationRules={keywordValidation}
                                                iconColor="text-blue-400"
                                            />
                                            <ValidatedInput
                                                icon={MapPin}
                                                placeholder="Location (e.g., New York, Remote)"
                                                value={jobLocation}
                                                onChange={(e) => setJobLocation(e.target.value)}
                                                onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
                                                validationRules={locationValidation}
                                                iconColor="text-purple-400"
                                            />
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Button 
                                                    onClick={handleSearch} 
                                                    className="w-full md:w-auto flex-shrink-0 interactive relative overflow-hidden px-8 py-4"
                                                    size="lg"
                                                >
                                                    <motion.div
                                                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                                                        initial={{ x: '-100%' }}
                                                        whileHover={{ x: '100%' }}
                                                        transition={{ duration: 0.6 }}
                                                    />
                                                    <Search className="h-5 w-5 mr-2 relative z-10" />
                                                    <span className="relative z-10">Find Jobs</span>
                                                </Button>
                                            </motion.div>
                                        </div>
                                        <div className="mt-8 text-center">
                                            <span className="text-foreground/60 mr-6">🔥 Trending:</span>
                                            <div className="inline-flex flex-wrap justify-center gap-3">
                                                {popularSearches.map((term, index) => (
                                                    <motion.button 
                                                        key={term} 
                                                        className="px-6 py-2 bg-card/70 text-foreground/80 rounded-full hover:bg-card/90 hover:text-foreground transition-all duration-300 border border-white/10 interactive"
                                                        whileHover={{ scale: 1.05, y: -2 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.8 + index * 0.1 }}
                                                        onClick={() => {
                                                            setJobKeyword(term);
                                                        }}
                                                    >
                                                        {term}
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </section>

                        {/* Featured Jobs Section with Scroll Animation */}
                        <ScrollSection className="py-32 px-4 sm:px-6 lg:px-8" delay={0.2}>
                            <motion.div
                                variants={sectionVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                className="text-center max-w-5xl mx-auto mb-20"
                            >
                                <motion.h2 
                                    variants={itemVariants} 
                                    className="text-5xl md:text-6xl font-bold mb-6"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                        Handpicked Opportunities
                                    </span>
                                </motion.h2>
                                <motion.p variants={itemVariants} className="text-xl text-foreground/70 leading-relaxed">
                                    Discover roles at innovative companies that match your skills and passion.
                                </motion.p>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-8xl mx-auto">
                                {featuredJobs.map((job, index) => (
                                    <JobCard key={job.id} job={job} index={index} />
                                ))}
                            </div>
                        </ScrollSection>

                        {/* "Why Choose Us?" Section with Enhanced Animations */}
                        <ScrollSection className="py-32 px-4 sm:px-6 lg:px-8" delay={0.4}>
                            <motion.div
                                variants={sectionVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                className="text-center max-w-5xl mx-auto mb-20"
                            >
                                <motion.h2 
                                    variants={itemVariants} 
                                    className="text-5xl md:text-6xl font-bold mb-6"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <span className="bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent">
                                        Why JobHunt?
                                    </span>
                                </motion.h2>
                                <motion.p variants={itemVariants} className="text-xl text-foreground/70 leading-relaxed">
                                    We provide the tools and opportunities to accelerate your career.
                                </motion.p>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 80, scale: 0.8 }}
                                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ 
                                            duration: 0.8, 
                                            delay: index * 0.2, 
                                            ease: [0.23, 1, 0.32, 1]
                                        }}
                                        whileHover={{ 
                                            y: -15,
                                            scale: 1.05,
                                            transition: { duration: 0.3 }
                                        }}
                                        className="bg-card/60 backdrop-blur-xl rounded-3xl p-10 text-center border border-white/20 interactive relative overflow-hidden"
                                    >
                                        {/* Background gradient on hover */}
                                        <motion.div
                                            className={`absolute inset-0 bg-gradient-to-br from-${feature.color}-500/10 to-${feature.color}-500/5 opacity-0 rounded-3xl`}
                                            whileHover={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                        
                                        <motion.div 
                                            className={`inline-flex p-6 rounded-2xl bg-gradient-to-br from-${feature.color}-500/20 to-${feature.color}-500/10 mb-8 relative z-10`}
                                            whileHover={{ 
                                                scale: 1.15, 
                                                rotate: 8,
                                                boxShadow: `0 20px 40px rgba(59, 130, 246, 0.3)`
                                            }}
                                            transition={{ type: "spring", stiffness: 400 }}
                                        >
                                            <feature.icon className={`h-10 w-10 text-${feature.color}-300`} />
                                        </motion.div>
                                        
                                        <h3 className="text-2xl font-bold mb-4 relative z-10">{feature.title}</h3>
                                        <p className="text-foreground/70 text-lg leading-relaxed relative z-10">{feature.description}</p>
                                        
                                        {/* Decorative elements */}
                                        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </motion.div>
                                ))}
                            </div>
                        </ScrollSection>

                        {/* Footer with Animation */}
                        <ScrollSection delay={0.6}>
                            <footer className="border-t border-white/10 py-12 text-center bg-card/30 backdrop-blur-lg">
                                <motion.p 
                                    className="text-foreground/70 text-lg"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    &copy; 2025 JobHunt. All rights reserved.
                                </motion.p>
                            </footer>
                        </ScrollSection>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}