import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Mountain, Wind, Coffee, Map, ArrowRight } from 'lucide-react';

const steps = [

    {
        id: 2,
        title: "Briefing & Gear Up",
        subtitle: "Safety Check",
        desc: "Meet your pilot at the Billing top. Get strapped into your harness, helmet, and safety gear while we check the wind conditions.",
        icon: <Mountain size={24} />,
        video: "/prep.mp4",
    },
    {
        id: 3,
        title: "The Flight",
        subtitle: "15-30 Mins Airtime",
        desc: "Run a few steps and lift off! Soar above the Dhauladhar ranges. Feel the wind and see the world from a bird's eye view.",
        icon: <Wind size={24} />,
        video: "/flying.mp4",
    },
    {
        id: 4,
        title: "Smooth Landing",
        subtitle: "Touchdown at Sunset",
        desc: "Land gently at the sunset point in Bir. Celebrate your flight with high-fives and watch your GoPro footage immediately.",
        icon: <Coffee size={24} />,
        video: "/landing.mp4",
    }
];

const JourneyRoadmap = ({ onBookClick }) => {
    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden font-sans">

            {/* Topographic Pattern (Opacity reduced for cleaner look) */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230f172a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-100 text-sky-600 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm"
                    >
                        <Map size={14} /> The Itinerary
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight"
                    >
                        Your Path to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Clouds</span>
                    </motion.h2>
                </div>

                <div className="relative">
                    {/* CENTRAL CONNECTING LINE (Matching Nav Theme) */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2">
                        <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: '100%' }}
                            transition={{ duration: 2, ease: "linear" }}
                            className="w-full bg-gradient-to-b from-sky-400 via-blue-600 to-slate-800 shadow-[0_0_10px_rgba(14,165,233,0.5)]"
                        />
                    </div>

                    <div className="space-y-16 md:space-y-32">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, delay: index * 0.1 }}
                                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 pl-16 md:pl-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* CENTER ICON NODE */}
                                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 md:top-1/2 md:-translate-y-1/2 z-20">
                                    <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-xl shadow-slate-300 border-4 border-white transform transition-transform hover:scale-110 hover:bg-sky-500 hover:border-sky-100">
                                        {step.icon}
                                    </div>
                                </div>

                                {/* CONTENT SIDE */}
                                <div className={`flex-1 w-full ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                    <div className={`inline-block px-3 py-1 rounded-lg text-xs font-bold mb-3 bg-slate-100 text-slate-600 ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                                        Step 0{step.id} • {step.subtitle}
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 mb-4">{step.title}</h3>
                                    <p className="text-slate-500 text-lg leading-relaxed">{step.desc}</p>
                                </div>

                                {/* VIDEO CARD SIDE */}
                                <div className="flex-1 w-full flex justify-center">
                                    <div className="group relative rounded-none overflow-hidden shadow-2xl bg-white p-2 border border-slate-100 rotate-1 hover:rotate-0 transition-all duration-500 w-full max-w-[320px]">
                                        <div className="relative aspect-[3/4] rounded-none overflow-hidden bg-slate-900">
                                            {/* Video Element */}
                                            <video
                                                key={step.video}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                                            >
                                                <source src={`${step.video}?t=${Date.now()}`} type="video/mp4" />
                                            </video>

                                            {/* Gradient Overlay for Cinematic Feel */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                            </motion.div>
                        ))}
                    </div>

                    {/* FINAL CTA (Matches Navbar Button) */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        className="mt-32 text-center relative z-20 ml-8 md:ml-0"
                    >
                        <button
                            onClick={onBookClick}
                            className="bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold py-5 px-12 rounded-full shadow-lg shadow-sky-500/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 mx-auto"
                        >
                            Start My Adventure <ArrowRight size={20} />
                        </button>
                        <p className="mt-4 text-slate-400 text-sm">Next Bolero leaves in 2 hours</p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default JourneyRoadmap;