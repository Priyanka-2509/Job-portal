import { useEffect, useState, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Briefcase, MapPin, Search} from 'lucide-react';
import axios from 'axios';
import { motion , useInView } from 'motion/react';
import Navbar from '../components/Navbar';
import { getJobs } from "../services/api";  

// Custom cursor component
const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        window.addEventListener('mousemove', updateMousePosition);
        
        // Add hover detection for job cards
        const jobCards = document.querySelectorAll('.job-card');
        jobCards.forEach(card => {
            card.addEventListener('mouseenter', handleMouseEnter);
            card.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            jobCards.forEach(card => {
                card.removeEventListener('mouseenter', handleMouseEnter);
                card.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <>
            <motion.div
                className="fixed w-6 h-6 bg-blue-400/30 rounded-full pointer-events-none z-50 mix-blend-difference"
                animate={{ 
                    x: mousePosition.x - 12, 
                    y: mousePosition.y - 12,
                    scale: isHovering ? 2 : 1
                }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
            />
            <motion.div
                className="fixed w-1 h-1 bg-blue-400 rounded-full pointer-events-none z-50"
                animate={{ 
                    x: mousePosition.x - 2, 
                    y: mousePosition.y - 2 
                }}
                transition={{ type: "spring", stiffness: 1000, damping: 30 }}
            />
        </>
    );
};

// Ripple effect component
const RippleEffect = ({ x, y, onComplete }) => {
    return (
        <motion.div
            className="absolute rounded-full bg-blue-400/30 pointer-events-none"
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

// Enhanced job card component
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

    return (
        <motion.div
            ref={cardRef}
            initial={{ 
                opacity: 0, 
                x: index % 2 === 0 ? -100 : 100,
                rotateY: index % 2 === 0 ? -15 : 15
            }}
            animate={isInView ? { 
                opacity: 1, 
                x: 0,
                rotateY: 0
            } : {}}
            transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: "easeOut"
            }}
            whileHover={{ 
                y: -10,
                rotateX: 5,
                scale: 1.02,
                transition: { duration: 0.3 }
            }}
            className="perspective-1000"
        >
            <Link
                to={`/job/${job._id}`}
                onClick={handleClick}
                className="job-card block h-full relative overflow-hidden bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl p-8 rounded-3xl border border-white/20 transition-all duration-500 hover:border-blue-400/60 hover:shadow-2xl hover:shadow-blue-500/20 group transform-gpu"
                style={{
                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px 0 rgba(59, 130, 246, 0.15)',
                }}
            >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                
                {/* Content */}
                <div className="relative z-10">
                    <motion.h3 
                        className="text-2xl font-bold text-foreground group-hover:text-blue-400 transition-colors duration-300 mb-2"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        {job.title}
                    </motion.h3>
                    
                    <motion.p 
                        className="text-foreground/80 text-lg mb-6"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                    >
                        {job.company}
                    </motion.p>
                    
                    <div className="flex flex-col gap-3 mb-6">
                        <motion.div 
                            className="flex items-center gap-2 text-foreground/70 group-hover:text-blue-300 transition-colors"
                            whileHover={{ x: 5 }}
                        >
                            <MapPin className="h-5 w-5" />
                            <span>{job.location}</span>
                        </motion.div>
                        <motion.div 
                            className="flex items-center gap-2 text-foreground/70 group-hover:text-blue-300 transition-colors"
                            whileHover={{ x: 5 }}
                        >
                            <Briefcase className="h-5 w-5" />
                            <span>{job.type}</span>
                        </motion.div>
                    </div>
                    
                    {/* Animated divider */}
                    <motion.div 
                        className="border-t border-white/20 my-6 relative overflow-hidden"
                        whileHover={{ scaleX: 1.1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent h-px"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.8 }}
                        />
                    </motion.div>
                    
                    {/* Enhanced View Details button */}
                    <motion.div
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="inline-flex items-center gap-2 text-foreground/60 group-hover:text-blue-400 transition-all duration-300 font-medium">
                            <motion.span
                                initial={{ opacity: 0.8 }}
                                whileHover={{ opacity: 1 }}
                            >
                                View Details
                            </motion.span>
                            <motion.span
                                initial={{ x: 0 }}
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                →
                            </motion.span>
                        </span>
                        
                        {/* Hover underline effect */}
                        <motion.div
                            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500"
                            initial={{ width: 0 }}
                            whileHover={{ width: '100%' }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.div>
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
                
                {/* Corner glow effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            </Link>
        </motion.div>
    );
};

// Floating particles background
const FloatingParticles = () => {
    const particles = Array.from({ length: 20 }, (_, i) => i);
    
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                    }}
                    animate={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );
};

// Re-usable animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3
        }
    }
};

const titleVariants = {
    hidden: { opacity: 0, y: -50, rotateX: -15 },
    visible: { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        transition: { 
            duration: 0.8, 
            ease: "easeOut" 
        } 
    }
};

export default function BrowseJobs() {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState('');
    const [searchParams] = useSearchParams();

    // Get search terms from the URL
    const keyword = searchParams.get('keyword') || '';
    const location = searchParams.get('location') || '';

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await getJobs();
                setJobs(res.data);
            } catch (error) {
                console.error('Failed to load jobs:', error);
                setError('Could not load job listings.');
            }
        };
        fetchJobs();
    }, []);

    // Filtering logic
    const filteredJobs = jobs.filter(job => {
        const titleMatch = job.title.toLowerCase().includes(keyword.toLowerCase());
        const companyMatch = job.company.toLowerCase().includes(keyword.toLowerCase());
        const locationMatch = job.location.toLowerCase().includes(location.toLowerCase());
        
        return (titleMatch || companyMatch) && locationMatch;
    });

    return (
        <>
            <CustomCursor />
            <Navbar />
            <div className="relative min-h-screen bg-background text-foreground pt-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <FloatingParticles />
                
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-background to-purple-900/10" />
                
                <div className="relative z-10 max-w-7xl mx-auto">
                    <motion.div 
                        variants={titleVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center mb-16"
                    >
                        <motion.h1 
                            className="text-5xl md:text-6xl font-bold mb-6"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                                Job Listings
                            </span>
                        </motion.h1>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="text-xl text-foreground/80 backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 inline-block"
                        >
                            <p>
                                Showing results for: <span className="font-bold text-blue-400">{keyword || "All Jobs"}</span> in <span className="font-bold text-purple-400">{location || "All Locations"}</span>
                            </p>
                        </motion.div>
                    </motion.div>

                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center text-red-400 mb-8 bg-red-500/10 backdrop-blur-lg p-6 rounded-2xl border border-red-500/20"
                        >
                            {error}
                        </motion.div>
                    )}

                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredJobs.map((job, index) => (
                            <JobCard key={job._id} job={job} index={index} />
                        ))}
                    </motion.div>
                    
                    {filteredJobs.length === 0 && !error && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="text-center py-20"
                        >
                            <motion.div
                                className="bg-gradient-to-br from-card/50 to-card/20 backdrop-blur-xl p-12 rounded-3xl border border-white/10 inline-block"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center"
                                >
                                    <Search className="w-8 h-8 text-white" />
                                </motion.div>
                                <p className="text-xl text-foreground/70 mb-4">No jobs match your search criteria.</p>
                                <p className="text-foreground/50">Try adjusting your search terms or location.</p>
                            </motion.div>
                        </motion.div>
                    )}
                </div>
                
                {/* Background gradient orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>
        </>
    );
}