import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Mountain, Waves, Car, ArrowUpRight, Gauge, Activity } from 'lucide-react';

// Adventure Data with Categories
const adventures = [
    {
        id: 1,
        title: "Paragliding",
        category: "Fly",
        price: "₹3,000",
        difficulty: "Medium",
        image: "/paragliding.jpeg",
        desc: "Soar 8000ft above sea level. The classic Bir experience.",
        colSpan: "md:col-span-2 md:row-span-2", // BIGGEST CARD
        icon: <Wind />
    },
    {
        id: 2,
        title: "Bungee Jumping",
        category: "Thrill",
        price: "₹2,500",
        difficulty: "Extreme",
        image: "/bungee.jpg",
        desc: "Dare to jump? India's highest bungee platform.",
        colSpan: "md:col-span-1 md:row-span-1",
        icon: <Activity />
    },
    {
        id: 3,
        title: "Sky Cycling",
        category: "Thrill",
        price: "₹1,200",
        difficulty: "Easy",
        image: "/sky-cycle.webp",
        desc: "Ride a cycle on a rope suspended in the sky.",
        colSpan: "md:col-span-1 md:row-span-1",
        icon: <Activity />
    },
    {
        id: 4,
        title: "Secret Waterfall Trek",
        category: "Nature",
        price: "₹800",
        difficulty: "Medium",
        image: "/waterfall.jpg",
        desc: "A hidden gem inside the forest. Swim in natural pools.",
        colSpan: "md:col-span-1 md:row-span-1",
        icon: <Waves />
    },
    {
        id: 5,
        title: "Karting",
        category: "Fun",
        price: "₹600",
        difficulty: "Easy",
        image: "/karting.jpg",
        desc: "Race your friends on the tracks of Bir.",
        colSpan: "md:col-span-1 md:row-span-1",
        icon: <Car />
    },
    {
        id: 6,
        title: "Hanuman Garh Hiking",
        category: "Nature",
        price: "₹1,500",
        difficulty: "Hard",
        image: "/hanuman.jpg",
        desc: "Trek to the top for a 360-degree view of the Himalayas.",
        colSpan: "md:col-span-2 md:row-span-1", // WIDE CARD
        icon: <Mountain />
    }
];

const filters = ["All", "Fly", "Thrill", "Nature", "Fun"];

const AdventuresGrid = ({ onBookClick }) => {
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredAdventures = activeFilter === "All"
        ? adventures
        : adventures.filter(item => item.category === activeFilter);

    return (
        <section className="py-24 bg-white relative overflow-hidden" id="adventures">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header & Filter */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <span className="text-sky-500 font-bold tracking-widest uppercase text-sm">Explore Bir</span>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-2">
                            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Thrill.</span>
                        </h2>
                    </div>

                    {/* Animated Filter Tabs */}
                    <div className="flex flex-wrap gap-2 p-1.5 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 relative ${activeFilter === filter ? "text-white" : "text-slate-500 hover:text-slate-900"
                                    }`}
                            >
                                {activeFilter === filter && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-sky-500 rounded-xl shadow-lg shadow-sky-500/30"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{filter}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* THE BENTO GRID */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[280px]">
                    <AnimatePresence>
                        {filteredAdventures.map((item) => (
                            <AdventureCard key={item.id} item={item} onClick={onBookClick} />
                        ))}
                    </AnimatePresence>
                </motion.div>

            </div>
        </section>
    );
};

// --- ADVANCED CARD COMPONENT ---
const AdventureCard = ({ item, onClick }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={onClick}
            className={`group relative rounded-3xl overflow-hidden cursor-pointer ${item.colSpan}`}
        >
            {/* Background Image with Zoom Effect */}
            <div className="absolute inset-0">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            </div>

            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-white/20 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                    {item.icon} {item.category}
                </span>
                {item.difficulty === "Extreme" && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase animate-pulse">
                        Extreme
                    </span>
                )}
            </div>

            {/* Bottom Content (Reveals on Hover) */}
            <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">

                <div className="flex justify-between items-end mb-2">
                    <h3 className="text-2xl md:text-3xl font-black text-white leading-none">
                        {item.title}
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center transform rotate-45 group-hover:rotate-0 transition-all duration-300 opacity-0 group-hover:opacity-100">
                        <ArrowUpRight size={20} />
                    </div>
                </div>

                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
                    <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                        {item.desc}
                    </p>
                    <div className="flex items-center justify-between border-t border-white/20 pt-3">
                        <div className="flex items-center gap-2 text-white/80 text-xs font-bold">
                            <Gauge size={14} className="text-sky-400" />
                            Level: {item.difficulty}
                        </div>
                        <span className="text-xl font-bold text-white">
                            {item.price}
                        </span>
                    </div>
                </div>
            </div>

        </motion.div>
    );
};

export default AdventuresGrid;
