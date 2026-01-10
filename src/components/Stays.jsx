import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Star, MapPin, Wifi, Coffee, ShieldCheck, Flame, Mountain, ArrowRight, Zap } from 'lucide-react';

const staysData = [
    {
        id: 1,
        name: "Pink Park Hotel",
        tag: "Luxury View",
        location: "Chaugan Road",
        price: "₹2,500",
        rating: 4.8,
        images: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800"
        ],
        amenities: [
            { icon: <Wifi size={14} />, label: "Fast WiFi" },
            { icon: <Coffee size={14} />, label: "Rooftop Cafe" },
        ],
        desc: "Watch the sunset from your private balcony. The most premium stay in Bir."
    },
    {
        id: 2,
        name: "Zostel Bir",
        tag: "Backpacker Vibe",
        location: "Tibetan Colony",
        price: "₹800",
        rating: 4.9,
        images: [
            "https://images.unsplash.com/photo-1555854743-e3c2f6a581ad?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=800"
        ],
        amenities: [
            { icon: <Flame size={14} />, label: "Bonfire" },
            { icon: <Mountain size={14} />, label: "Dorms" },
        ],
        desc: "Meet travelers from around the world. Evening jams, games, and great vibes."
    },
    {
        id: 3,
        name: "Camp Oak View",
        tag: "Nature Stay",
        location: "Upper Bir",
        price: "₹1,500",
        rating: 4.7,
        images: [
            "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800"
        ],
        amenities: [
            { icon: <Mountain size={14} />, label: "Swiss Tents" },
            { icon: <ShieldCheck size={14} />, label: "Safe" },
        ],
        desc: "Sleep under the stars in luxury tents. Quiet, peaceful, and surrounded by oak trees."
    }
];

const Stays = ({ onBookClick }) => {
    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden font-sans">

            {/* Simple Clean Background (No Gradients) */}
            <div className="absolute inset-0 bg-slate-50"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 text-sky-600 font-bold tracking-wider uppercase text-xs bg-sky-100 px-4 py-2 rounded-full"
                        >
                            <Zap size={14} fill="currentColor" /> Premium Stays
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-black text-slate-900 mt-4"
                        >
                            Sleep in <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Paradise.</span>
                        </motion.h2>
                    </div>
                    <p className="text-slate-500 max-w-sm text-lg leading-relaxed text-right md:text-left">
                        Experience the best of Bir. Curated stays for every vibe and budget.
                    </p>
                </div>

                {/* 3D Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
                    {staysData.map((stay, index) => (
                        <StayCard3D key={stay.id} stay={stay} index={index} onBookClick={onBookClick} />
                    ))}
                </div>

            </div>
        </section>
    );
};

// --- 3D TILT CARD COMPONENT ---
const StayCard3D = ({ stay, index, onBookClick }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // 3D Motion Values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Tilt Animation
    const rotateX = useSpring(useTransform(y, [-100, 100], [5, -5]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-100, 100], [-5, 5]), { stiffness: 150, damping: 20 });

    // Handle Mouse Move
    function handleMouseMove(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct * 200);
        y.set(yPct * 200);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
        setIsHovered(false);
        setCurrentImage(0);
    }

    // Auto Slideshow
    useEffect(() => {
        let interval;
        if (isHovered) {
            interval = setInterval(() => {
                setCurrentImage((prev) => (prev + 1) % stay.images.length);
            }, 2000);
        }
        return () => clearInterval(interval);
    }, [isHovered, stay.images.length]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="group relative h-[500px] w-full bg-white rounded-[2rem] shadow-xl border border-slate-200 cursor-pointer"
        >
            {/* CONTENT CONTAINER */}
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden flex flex-col" style={{ transform: "translateZ(20px)" }}>

                {/* 1. IMAGE AREA (Top 60%) */}
                <div className="relative h-[60%] w-full overflow-hidden bg-slate-100">
                    <AnimatePresence mode='wait'>
                        <motion.img
                            key={currentImage}
                            src={stay.images[currentImage]}
                            alt={stay.name}
                            initial={{ opacity: 0.8, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </AnimatePresence>

                    {/* Shadow Overlay for text readability on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

                    {/* Top Badges */}
                    <div className="absolute top-5 left-5 right-5 flex justify-between items-start z-10">
                        <span className="bg-white/90 backdrop-blur-md text-slate-800 px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm">
                            {stay.tag}
                        </span>
                        <div className="bg-white text-slate-900 px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1 shadow-lg">
                            <Star size={12} className="text-amber-500 fill-amber-500" /> {stay.rating}
                        </div>
                    </div>

                    {/* Progress Bar */}
                    {isHovered && (
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                                className="h-full bg-sky-500"
                            />
                        </div>
                    )}
                </div>

                {/* 2. TEXT CONTENT AREA (Bottom 40%) */}
                <div className="h-[40%] w-full bg-white p-6 flex flex-col justify-between relative z-10">

                    {/* Floating Price - FIXED OVERLAP & POSITION */}
                    <div className="absolute -top-6 right-6 z-50 transform translate-z-30">
                        <div className="bg-sky-500 text-white px-4 py-3 rounded-2xl font-bold shadow-lg shadow-sky-500/30 border-4 border-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                            {stay.price}
                        </div>
                    </div>

                    <div className="mt-2">
                        <h3 className="text-2xl font-black text-slate-900 mb-1 group-hover:text-sky-600 transition-colors">
                            {stay.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mb-3">
                            <MapPin size={12} className="text-sky-500" /> {stay.location}
                        </div>
                        <p className="text-slate-500 text-sm line-clamp-2">
                            {stay.desc}
                        </p>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                        {/* Amenities */}
                        <div className="flex gap-2">
                            {stay.amenities.map((item, i) => (
                                <div key={i} className="bg-slate-50 border border-slate-100 text-slate-500 px-2 py-1 rounded-lg text-[10px] flex items-center gap-1 font-semibold">
                                    {item.icon} {item.label}
                                </div>
                            ))}
                        </div>

                        {/* Action Button Icon Only on Desktop to save space */}
                        <button
                            onClick={onBookClick}
                            className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-sky-500 transition-colors shadow-lg"
                        >
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default Stays;