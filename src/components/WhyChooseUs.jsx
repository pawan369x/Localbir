import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Camera, Users, Trophy, Star, MapPin } from 'lucide-react';

// 1. Testimonials Data (Ye auto change honge)
const reviews = [
    {
        id: 1,
        name: "Anjali Sharma",
        location: "Delhi, India",
        text: "Absolutely insane! The pilot made me feel so safe. Best experience of my life!",
        image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        id: 2,
        name: "Rahul Verma",
        location: "Mumbai, India",
        text: "The GoPro footage quality is amazing. Highly recommend the 'Complete Package'!",
        image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        id: 3,
        name: "Sarah Jenkins",
        location: "UK (Tourist)",
        text: "Professional team & great camping setup. The bonfire night was magical.",
        image: "https://randomuser.me/api/portraits/women/68.jpg"
    }
];

const stats = [
    { id: 1, label: 'Safe Flights', value: '5k+', icon: <ShieldCheck className="w-6 h-6" />, color: 'text-emerald-500', bg: 'bg-emerald-100' },
    { id: 2, label: 'Happy Flyers', value: '98%', icon: <Users className="w-6 h-6" />, color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 3, label: 'Years Exp.', value: '10+', icon: <Trophy className="w-6 h-6" />, color: 'text-amber-500', bg: 'bg-amber-100' },
    { id: 4, label: '5-Star Reviews', value: '450+', icon: <Star className="w-6 h-6" />, color: 'text-rose-500', bg: 'bg-rose-100' },
];

const WhyChooseUs = () => {
    // State for Auto-Scrolling Testimonials
    const [currentReview, setCurrentReview] = useState(0);

    // Auto-Change Logic (Every 4 Seconds)
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentReview((prev) => (prev + 1) % reviews.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">

            {/* Background Blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Side: Content */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block py-1 px-3 rounded-full bg-white border border-sky-100 text-sky-600 text-xs font-bold tracking-widest uppercase shadow-sm mb-6">
                                ✨ Why We Are The Best
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                                We Don't Just Fly, <br />
                                We Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">Magic.</span>
                            </h2>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                Experience Bir Billing with the safest hands in the sky. Our obsession with safety allows you to focus on the thrill.
                            </p>

                            <div className="space-y-4">
                                <FeatureCard
                                    title="Certified Experts"
                                    desc="Government licensed pilots with 500+ hours of flying experience."
                                    icon={<ShieldCheck className="text-emerald-600" />}
                                    delay={0.1}
                                />
                                <FeatureCard
                                    title="Cinematic Memories"
                                    desc="4K GoPro footage included to capture your screaming face forever!"
                                    icon={<Camera className="text-orange-600" />}
                                    delay={0.2}
                                />
                                <FeatureCard
                                    title="Top-Tier Gear"
                                    desc="Imported gliders & safety parachutes inspected before every single flight."
                                    icon={<Trophy className="text-indigo-600" />}
                                    delay={0.3}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Image & AUTO-SCROLLING TESTIMONIAL */}
                    <div className="relative h-[600px] w-full flex items-center justify-center">

                        {/* Main Image */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-10 w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
                        >
                            <img
                                src="https://parabooking.com/wp-content/uploads/2025/04/2025-mirunalini-classic-1-1024x683.jpg"
                                alt="Paragliding Happy Face"
                                className="object-cover w-full h-full transform hover:scale-110 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </motion.div>

                        {/* Floating Safety Badge */}
                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -top-4 -right-4 md:right-8 z-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center gap-2"
                        >
                            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                                <ShieldCheck size={24} strokeWidth={2.5} />
                            </div>
                            <div className="text-center">
                                <span className="block text-2xl font-black text-slate-900">100%</span>
                                <span className="text-xs font-bold text-slate-500 uppercase">Safety Record</span>
                            </div>
                        </motion.div>

                        {/* === AUTO SCROLLING TESTIMONIAL CARD === */}
                        <div className="absolute bottom-8 -left-4 md:left-8 z-30 max-w-xs w-full">
                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={currentReview} // Key change se animation trigger hota hai
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-white/50"
                                >
                                    {/* Stars */}
                                    <div className="flex gap-1 mb-3">
                                        {[1, 2, 3, 4, 5].map((_, i) => (
                                            <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>

                                    {/* Text */}
                                    <p className="text-sm font-medium text-slate-700 italic mb-4 min-h-[60px]">
                                        "{reviews[currentReview].text}"
                                    </p>

                                    {/* User Info */}
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={reviews[currentReview].image}
                                            alt={reviews[currentReview].name}
                                            className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
                                        />
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{reviews[currentReview].name}</p>
                                            <div className="flex items-center gap-1 text-[10px] text-slate-500">
                                                <MapPin size={10} />
                                                {reviews[currentReview].location}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Bottom Stats Row */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {stats.map((stat) => (
                        <div key={stat.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group text-center">
                            <div className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${stat.bg} ${stat.color}`}>
                                {stat.icon}
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 mb-1">{stat.value}</h3>
                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

// Feature Card Component
const FeatureCard = ({ title, desc, icon, delay }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-sky-100/50 border border-transparent hover:border-sky-50 transition-all duration-300 cursor-default"
    >
        <div className="mt-1 w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-sky-50 transition-all duration-300 shrink-0">
            {icon}
        </div>
        <div>
            <h3 className="text-lg font-bold text-slate-800 group-hover:text-sky-600 transition-colors">{title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-600">{desc}</p>
        </div>
    </motion.div>
);

export default WhyChooseUs;