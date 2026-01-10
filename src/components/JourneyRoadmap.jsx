import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Mountain, Wind, Coffee, ArrowRight } from 'lucide-react';

const steps = [
    {
        id: 1,
        title: "The Jeep Safari",
        subtitle: "Off-Road Thrill",
        desc: "Buckle up! We pick you up in a 4x4 Jeep for a wild 45-min drive through dense pine forests to the top.",
        icon: <Truck size={28} />,
        color: "from-orange-400 to-red-500",
        shadow: "shadow-orange-500/30",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 2,
        title: "Briefing at 8000ft",
        subtitle: "World's 2nd Highest",
        desc: "Stand at the edge of the world. Meet your certified pilot, strap into professional gear, and feel the rush.",
        icon: <Mountain size={28} />,
        color: "from-blue-400 to-indigo-500",
        shadow: "shadow-blue-500/30",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 3,
        title: "The Flight",
        subtitle: "Touch the Sky",
        desc: "Run 5 steps and liftoff! Soar like a bird for 20 mins. The wind in your face, the world at your feet.",
        icon: <Wind size={28} />,
        color: "from-sky-400 to-cyan-500",
        shadow: "shadow-sky-500/30",
        image: "https://images.unsplash.com/photo-1507099411985-7186196237b6?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 4,
        title: "Safe Landing & Chai",
        subtitle: "Pahadi Vibes",
        desc: "Touch down smoothly at the sunset point. Celebrate your bravery with hot Pahadi Chai and your flight video.",
        icon: <Coffee size={28} />,
        color: "from-emerald-400 to-green-500",
        shadow: "shadow-emerald-500/30",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800"
    }
];

const JourneyRoadmap = () => {
    return (
        <section className="py-32 bg-slate-50 relative overflow-hidden font-sans">

            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="text-center mb-24">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 border border-orange-200 text-xs font-bold tracking-widest uppercase mb-4"
                    >
                        The Experience
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight"
                    >
                        How Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Adventure</span> Unfolds
                    </motion.h2>
                </div>

                <div className="relative">
                    {/* CENTRAL CONNECTING LINE (Desktop Only) */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-200 -translate-x-1/2 hidden md:block rounded-full overflow-hidden">
                        <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: '100%' }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="w-full bg-gradient-to-b from-orange-500 via-purple-500 to-emerald-500"
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
                                className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* TEXT CONTENT SIDE */}
                                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'} text-center`}>
                                    <div className={`inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-lg bg-white border border-slate-100 shadow-sm ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'
                                        }`}>
                                        <span className="w-2 h-2 rounded-full bg-slate-400 animate-pulse"></span>
                                        <span className="text-xs font-bold text-slate-500 uppercase">Step 0{step.id}</span>
                                    </div>

                                    <h3 className="text-3xl font-black text-slate-900 mb-2">{step.title}</h3>
                                    <h4 className="text-lg font-bold text-slate-400 mb-4 uppercase tracking-wide">{step.subtitle}</h4>

                                    <p className="text-slate-500 text-lg leading-relaxed">{step.desc}</p>
                                </div>

                                {/* CENTER ICON NODE */}
                                <div className="relative flex-shrink-0 z-20">
                                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center shadow-2xl ${step.shadow} transform rotate-3 hover:rotate-0 transition-all duration-300 border-4 border-white`}>
                                        {step.icon}
                                    </div>
                                    {/* Mobile Connector */}
                                    {index !== steps.length - 1 && (
                                        <div className="absolute top-20 left-1/2 w-0.5 h-16 bg-slate-200 -translate-x-1/2 md:hidden" />
                                    )}
                                </div>

                                {/* IMAGE CARD SIDE */}
                                <div className={`flex-1 ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16'} w-full`}>
                                    <div className="group relative rounded-3xl overflow-hidden shadow-2xl bg-white border border-slate-100 transform hover:-translate-y-2 transition-all duration-500">

                                        {/* Image */}
                                        <div className="h-64 overflow-hidden relative">
                                            <img
                                                src={step.image}
                                                alt={step.title}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />

                                            {/* Hover Play Button Overlay */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
                                                    <ArrowRight />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Card Decoration */}
                                        <div className={`h-1.5 w-full bg-gradient-to-r ${step.color}`} />
                                    </div>
                                </div>

                            </motion.div>
                        ))}
                    </div>

                    {/* FINAL CTA BUTTON - Restored from user intent */}
                    <div className="mt-24 text-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-slate-900 text-white font-bold py-4 px-10 rounded-full shadow-2xl shadow-slate-900/30 hover:bg-orange-600 transition-colors"
                        >
                            Book My Slot Now
                        </motion.button>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default JourneyRoadmap;
