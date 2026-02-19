import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, Mountain, Coffee, BedDouble, MapPin, ArrowRight, Wind, Users, Sun, Home, BookOpen } from 'lucide-react';

// --- ADVANCED LIVE STATUS BAR ---
const LiveStatus = () => (
    <div className="bg-sky-50 text-sky-900 h-9 flex items-center justify-center text-xs md:text-sm border-b border-sky-100 relative z-[60] overflow-hidden">

        {/* Desktop View (Static) */}
        <div className="hidden md:flex justify-between w-full max-w-7xl px-8">
            <div className="flex gap-6">
                <span className="flex items-center text-emerald-600 font-bold">
                    <span className="relative flex h-2 w-2 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    FLYING STATUS: OPEN
                </span>
                <span className="flex items-center text-sky-700">
                    <Wind size={14} className="mr-1.5" /> Wind: 12km/h (Perfect)
                </span>
                <span className="flex items-center text-amber-600">
                    <Sun size={14} className="mr-1.5" /> Temp: 18°C
                </span>
            </div>
            <div className="flex items-center text-slate-500 font-medium">
                <Users size={14} className="mr-1.5" /> Live Crowd: <span className="text-orange-500 ml-1 font-bold">Low</span>
            </div>
        </div>

        {/* Mobile View (Animated Ticker) */}
        <div className="md:hidden w-full overflow-hidden">
            <motion.div
                animate={{ x: ["100%", "-100%"] }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                className="whitespace-nowrap flex gap-8 items-center"
            >
                <span className="flex items-center text-emerald-600 font-bold">🟢 FLYING: OPEN</span>
                <span className="flex items-center text-sky-700">🌬️ Wind: 12km/h</span>
                <span className="flex items-center text-amber-600">☀️ Temp: 18°C</span>
                <span className="flex items-center text-orange-500">👥 Crowd: Low</span>
            </motion.div>
        </div>
    </div>
);

const Navbar = ({ onBookClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const location = useLocation();

    // Scroll Logic
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Body scroll lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    // Navigation Links
    const navLinks = [
        { name: 'Home', to: '/', icon: <Home size={20} />, desc: 'Start here' },
        { name: 'Services', to: '/services', icon: <Wind size={20} />, desc: 'All you need' }, // Using Wind icon for Services
        { name: 'Adventures', to: '/adventures', icon: <Mountain size={20} />, desc: 'Fly high in Bir' },
        { name: 'Stays', to: '/stays', icon: <BedDouble size={20} />, desc: 'Cozy hostels & hotels' },
        { name: 'Local Guide', to: '/guide', icon: <MapPin size={20} />, desc: 'Hidden waterfalls' },
        { name: 'Blog', to: '/blog', icon: <BookOpen size={20} />, desc: 'Stories & Tips' },
        { name: 'Plan Trip', to: '/plan-trip', icon: <MapPin size={20} />, desc: 'Budget Calculator' },
    ];

    // Dynamic Colors
    const isTransparent = !scrolled && !isOpen && location.pathname === '/';
    const textColor = isTransparent ? 'text-white' : 'text-slate-800';

    const menuVars = {
        initial: { clipPath: "circle(0% at 100% 0%)" }, // Cool circle reveal effect
        animate: {
            clipPath: "circle(150% at 100% 0%)",
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        },
        exit: {
            clipPath: "circle(0% at 100% 0%)",
            transition: { delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const containerVars = {
        initial: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
        open: { transition: { delayChildren: 0.2, staggerChildren: 0.07, staggerDirection: 1 } }
    };

    const linkVars = {
        initial: { y: 20, opacity: 0 },
        open: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }
    };

    return (
        <header className="fixed w-full top-0 z-50 flex flex-col font-sans">

            <LiveStatus />

            <motion.nav
                className={`w-full transition-all duration-300 ${!isTransparent ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/50 py-3 shadow-sm' : 'bg-transparent py-5'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">

                        {/* --- LOGO --- */}
                        <div className="flex-shrink-0 z-50 relative">
                            <Link to="/" className={`text-2xl font-black tracking-tighter transition-colors duration-300 ${isOpen ? 'text-slate-900' : textColor}`}>
                                Local<span className="text-sky-500">Bir.</span>
                            </Link>
                        </div>

                        {/* --- DESKTOP MENU --- */}
                        <div className="hidden lg:block">
                            <div className="flex items-center gap-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.to}
                                        onClick={() => window.scrollTo(0, 0)}
                                        className="group relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:bg-slate-100/10"
                                    >
                                        <span className={`p-1.5 rounded-full bg-white/10 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-slate-600 bg-slate-100'}`}>
                                            {React.cloneElement(link.icon, { size: 16 })}
                                        </span>
                                        <span className={`font-bold text-sm ${textColor} group-hover:text-sky-500 transition-colors`}>
                                            {link.name}
                                        </span>

                                        {/* Hover Tooltip/Description */}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white p-3 rounded-xl shadow-xl border border-slate-100 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all pointer-events-none">
                                            <p className="text-xs text-slate-400 font-medium text-center">{link.desc}</p>
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 bg-white rotate-45 border-t border-l border-slate-100"></div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* --- CTA BUTTON (Desktop) --- */}
                        <div className="hidden lg:block">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onBookClick}
                                className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2.5 px-6 rounded-full text-sm flex items-center gap-2 shadow-lg shadow-sky-500/30 transition-all"
                            >
                                Book Paragliding <ChevronRight size={16} />
                            </motion.button>
                        </div>

                        {/* --- MOBILE TOGGLE BUTTON (Corrected Logic) --- */}
                        <div className="lg:hidden z-[60]"> {/* High Z-Index to stay above menu */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className={`p-2 rounded-full transition-all active:scale-90 ${isOpen
                                    ? 'bg-slate-100 text-slate-900' // Dark text when menu open
                                    : `${isTransparent ? 'bg-black/20 text-white' : 'bg-slate-100 text-slate-900'}`
                                    }`}
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>

                    </div>
                </div>
            </motion.nav>

            {/* --- MOBILE MENU OVERLAY --- */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={menuVars}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="fixed inset-0 bg-white z-40 flex flex-col lg:hidden pt-24 px-6 h-screen"
                    >
                        <motion.div
                            variants={containerVars}
                            initial="initial"
                            animate="open"
                            exit="initial"
                            className="flex flex-col gap-2 h-full"
                        >
                            {/* Menu Label */}
                            <motion.span variants={linkVars} className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                                Menu
                            </motion.span>

                            {/* Links */}
                            {navLinks.map((link) => (
                                <motion.div key={link.name} variants={linkVars}>
                                    <Link
                                        to={link.to}
                                        onClick={() => {
                                            setIsOpen(false);
                                            window.scrollTo(0, 0);
                                        }}
                                        className="group flex items-center p-4 rounded-2xl hover:bg-slate-50 transition-colors"
                                    >
                                        <div className="p-3 bg-white border border-slate-100 text-slate-600 rounded-xl shadow-sm group-hover:text-sky-500 group-hover:scale-110 transition-all mr-4">
                                            {link.icon}
                                        </div>
                                        <div className="flex-1">
                                            <span className="block text-xl font-bold text-slate-800 group-hover:text-sky-600">
                                                {link.name}
                                            </span>
                                            <span className="text-xs text-slate-400 font-medium">
                                                {link.desc}
                                            </span>
                                        </div>
                                        <ChevronRight className="text-slate-300 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" size={20} />
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Divider */}
                            <motion.div variants={linkVars} className="h-px w-full bg-slate-100 my-4" />

                            {/* Mobile CTA */}
                            <motion.div variants={linkVars} className="mt-auto mb-8">
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        onBookClick();
                                    }}
                                    className="w-full bg-sky-500 text-white text-lg font-bold py-4 rounded-2xl shadow-xl shadow-sky-500/20 active:scale-95 transition-transform flex items-center justify-center gap-2"
                                >
                                    Book Adventure Now <ArrowRight size={20} />
                                </button>
                                <p className="text-center text-slate-400 text-xs mt-4">
                                    Trusted by 5000+ travelers
                                </p>
                            </motion.div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;