import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from 'lucide-react';

const Navbar = () => {
    const { user, isLoggedIn, logout } = useContext(AuthContext);
    const [clicks, setClicks] = useState([]);

    const handleMouseClick = (e) => {
        const newClick = {
            x: e.clientX,
            y: e.clientY,
            id: Date.now(),
        };
        setClicks(prev => [...prev, newClick]);
        setTimeout(() => {
            setClicks(prev => prev.filter(c => c.id !== newClick.id));
        }, 1000); // Remove click effect after 1 second
    };

    useEffect(() => {
        window.addEventListener('click', handleMouseClick);
        return () => {
            window.removeEventListener('click', handleMouseClick);
        };
    }, []);

    return (
        <>
            <AnimatePresence>
                {clicks.map(click => (
                    <motion.div
                        key={click.id}
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 10, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="fixed rounded-full bg-blue-400/30 pointer-events-none z-[10000]"
                        style={{
                            left: click.x - 25,
                            top: click.y - 25,
                            width: 50,
                            height: 50,
                        }}
                    />
                ))}
            </AnimatePresence>

            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="bg-background/80 backdrop-blur-lg border-b border-white/10 w-full px-6 py-4 fixed top-0 left-0 z-50"
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <Sparkles className="h-6 w-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            JobHunt
                        </span>
                    </Link>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors relative group">
                            Home
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link to="/browse-jobs" className="text-foreground/80 hover:text-foreground transition-colors relative group">
                            Browse Jobs
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link to="/login-employer" className="text-foreground/80 hover:text-foreground transition-colors relative group">
                            Post a Job
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-4">
                        {isLoggedIn ? (
                            <>
                                {user?.role === "candidate" && (
                                    <Link to="/candidate-dashboard" className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium hidden sm:block">
                                        Dashboard
                                    </Link>
                                )}
                                {user?.role?.toLowerCase() === "employer" && (
                                    <Link to="/employer-dashboard" className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium hidden sm:block">
                                        Dashboard
                                    </Link>
                                )}
                                <span className="font-medium text-foreground/80 text-sm hidden sm:block">{user?.name || "Profile"}</span>
                                <button
                                    onClick={logout}
                                    className="text-foreground/80 hover:text-red-400 transition-colors text-sm font-medium"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative group"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                                <Link
                                    to="/Auth"
                                    className="relative bg-background text-foreground py-2 px-5 rounded-full text-sm font-semibold"
                                >
                                    Login / Sign Up
                                </Link>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.nav>
        </>
    );
};

export default Navbar;

