import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Mountain, Coffee, BedDouble, MapPin, ArrowRight, Wind, Users } from 'lucide-react';

const LiveStatus = () => (
    <div className="bg-sky-50 text-sky-900 py-2 px-4 flex justify-between items-center text-xs md:text-sm border-b border-sky-100 relative z-50">
        <div className="flex gap-4">
            <span className="flex items-center text-sky-600 font-bold animate-pulse">
                <div className="w-2 h-2 bg-sky-500 rounded-full mr-2"></div>
                FLYING: ON
            </span>
            <span className="hidden md:flex items-center text-sky-800">
                <Wind size={14} className="mr-1" /> Wind: 12km/h (Perfect)
            </span>
        </div>
        <div className="flex items-center text-orange-500">
            <Users size={14} className="mr-1" /> Crowd: Low
        </div>
    </div>
);

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // Scroll Logic
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Body scroll lock jab mobile menu open ho
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const navLinks = [
        { name: 'Adventures', href: '#paragliding', icon: <Mountain size={20} />, desc: 'Fly high in Bir' },
        { name: 'Best Cafes', href: '#cafes', icon: <Coffee size={20} />, desc: 'Taste the local food' },
        { name: 'Stays', href: '#stays', icon: <BedDouble size={20} />, desc: 'Cozy hostels & hotels' },
        { name: 'Local Guide', href: '#guide', icon: <MapPin size={20} />, desc: 'Hidden waterfalls' },
    ];

    // Colors
    const textColor = scrolled ? 'text-gray-700' : 'text-white';
    const logoColor = scrolled ? 'text-gray-900' : 'text-white';

    // Mobile Menu Animation Variants
    const menuVars = {
        initial: { scaleY: 0 },
        animate: {
            scaleY: 1,
            transition: { duration: 0.5, ease: [0.12, 0, 0.39, 0] }
        },
        exit: {
            scaleY: 0,
            transition: { delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const containerVars = {
        initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
        open: { transition: { delayChildren: 0.3, staggerChildren: 0.09, staggerDirection: 1 } }
    };

    const mobileLinkVars = {
        initial: { y: "30vh", transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] } },
        open: { y: 0, transition: { duration: 0.7, ease: [0, 0.55, 0.45, 1] } }
    };

    return (
        <header className="fixed w-full top-0 z-50 flex flex-col">
            <LiveStatus />
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`w-full transition-all duration-300 ${scrolled
                    ? 'bg-white/80 backdrop-blur-xl border-b border-sky-100/50 py-3 shadow-sm'
                    : 'bg-transparent py-5'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">

                        {/* --- LOGO --- */}
                        <div className="flex-shrink-0 z-50 relative">
                            <span className={`text-2xl font-black tracking-tighter transition-colors duration-300 ${isOpen ? 'text-gray-900' : logoColor}`}>
                                Local<span className="text-sky-500">Bir.</span>
                            </span>
                        </div>

                        {/* --- DESKTOP MENU (Hidden on Mobile & Tablet) --- */}
                        <div className="hidden lg:block">
                            <div className="flex items-center space-x-2">
                                {navLinks.map((link, index) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                        className={`relative px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${textColor}`}
                                    >
                                        {hoveredIndex === index && (
                                            <motion.span
                                                layoutId="hoverBackground"
                                                className={`absolute inset-0 rounded-full -z-10 ${scrolled ? 'bg-sky-100' : 'bg-white/20'}`}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            />
                                        )}
                                        <span className="flex items-center gap-2">
                                            {link.name}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* --- CTA BUTTON (Desktop) --- */}
                        <div className="hidden lg:block">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2.5 px-6 rounded-full text-sm flex items-center gap-2 shadow-lg shadow-sky-500/30 transition-all"
                            >
                                Book Paragliding <ChevronRight size={16} />
                            </motion.button>
                        </div>

                        {/* --- MOBILE TOGGLE --- */}
                        <div className="lg:hidden z-50">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className={`p-2 rounded-full transition-colors ${isOpen ? 'text-gray-900 bg-gray-100' : `${textColor} hover:bg-white/20`}`}
                            >
                                {isOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* --- CREATIVE FULL SCREEN MOBILE MENU --- */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={menuVars}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="fixed inset-0 bg-white z-40 origin-top flex flex-col justify-center px-6 lg:hidden"
                        style={{ top: '0' }} // Ensure it covers from top
                    >
                        <motion.div
                            variants={containerVars}
                            initial="initial"
                            animate="open"
                            exit="initial"
                            className="flex flex-col gap-6"
                        >
                            {navLinks.map((link) => (
                                <div key={link.name} className="overflow-hidden">
                                    <motion.a
                                        variants={mobileLinkVars}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="group flex items-center justify-between border-b border-gray-100 pb-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-sky-50 text-sky-600 rounded-xl group-active:scale-95 transition-transform">
                                                {link.icon}
                                            </div>
                                            <div>
                                                <span className="block text-2xl font-bold text-gray-800 group-hover:text-sky-600 transition-colors">
                                                    {link.name}
                                                </span>
                                                <span className="text-sm text-gray-400 font-medium">
                                                    {link.desc}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-gray-300 group-hover:text-sky-500 group-hover:-rotate-45 transition-all duration-300">
                                            <ArrowRight size={24} />
                                        </div>
                                    </motion.a>
                                </div>
                            ))}

                            {/* Mobile CTA */}
                            <div className="overflow-hidden mt-4">
                                <motion.div variants={mobileLinkVars}>
                                    <button className="w-full bg-sky-500 text-white text-lg font-bold py-4 rounded-2xl shadow-xl shadow-sky-500/20 active:scale-95 transition-transform flex items-center justify-center gap-2">
                                        Book Paragliding Now <ChevronRight />
                                    </button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;