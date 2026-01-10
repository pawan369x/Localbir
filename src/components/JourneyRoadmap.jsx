import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Mountain, Wind, Coffee, CheckCircle2, Map, ArrowRight } from 'lucide-react';

const steps = [
    {
        id: 1,
        title: "The Jeep Safari",
        subtitle: "Start at 10:00 AM",
        desc: "Buckle up! We pick you up in a 4x4 Jeep for a wild 45-min off-road drive through dense pine forests to reach the takeoff site.",
        icon: <Truck size={24} />,
        color: "bg-orange-500",
        lightColor: "bg-orange-100 text-orange-600",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 2,
        title: "Briefing at 8000ft",
        subtitle: "Gear Up & Prep",
        desc: "Stand at the edge of the world. Meet your certified pilot, get strapped into professional safety gear, and feel the adrenaline rush.",
        icon: <Mountain size={24} />,
        color: "bg-blue-500",
        lightColor: "bg-blue-100 text-blue-600",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 3,
        title: "The Flight",
        subtitle: "15-30 Mins Airtime",
        desc: "Run 5 steps and liftoff! Soar like a bird above the Dhauladhar range. The wind in your face, the world at your feet.",
        icon: <Wind size={24} />,
        color: "bg-sky-500",
        lightColor: "bg-sky-100 text-sky-600",
        image: "https://images.unsplash.com/photo-1507099411985-7186196237b6?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 4,
        title: "Landing & Chai",
        subtitle: "Celebrate the Thrill",
        desc: "Touch down smoothly at the sunset point. Celebrate your bravery with hot Pahadi Chai and watch your flight video.",
        icon: <Coffee size={24} />,
        color: "bg-emerald-500",
        lightColor: "bg-emerald-100 text-emerald-600",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800"
    }
];

const JourneyRoadmap = () => {
    return (
        <section className="py-24 bg-[#FAFAFA] relative overflow-hidden font-sans">

            {/* 1. Topographic Pattern Background (Subtle) */}
            <div className="absolute inset-0 opacity-[0.05]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-500 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm"
                    >
                        <Map size={14} /> The Itinerary
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight"
                    >
                        Your Path to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Clouds</span>
                    </motion.h2>
                </div>

                <div className="relative">
                    {/* CENTRAL CONNECTING LINE (The Trail) */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2">
                        <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: '100%' }}
                            transition={{ duration: 2, ease: "linear" }}
                            className="w-full bg-gradient-to-b from-orange-400 via-sky-500 to-emerald-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]"
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
                                {/* CENTER ICON NODE (Absolute on Mobile, Relative on Desktop) */}
                                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 md:top-1/2 md:-translate-y-1/2 z-20">
                                    <div className={`w-16 h-16 rounded-2xl ${step.color} text-white flex items-center justify-center shadow-xl shadow-slate-300 border-4 border-white transform transition-transform hover:scale-110`}>
                                        {step.icon}
                                    </div>
                                </div>

                                {/* CONTENT SIDE */}
                                <div className={`flex-1 w-full ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                    <div className={`inline-block px-3 py-1 rounded-lg text-xs font-bold mb-3 ${step.lightColor} ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                                        Step 0{step.id} • {step.subtitle}
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 mb-4">{step.title}</h3>
                                    <p className="text-slate-600 text-lg leading-relaxed">{step.desc}</p>
                                </div>

                                {/* IMAGE SIDE */}
                                <div className="flex-1 w-full">
                                    <div className="group relative rounded-3xl overflow-hidden shadow-2xl bg-white p-2 border border-slate-100 rotate-1 hover:rotate-0 transition-all duration-500">
                                        <div className="relative h-64 rounded-2xl overflow-hidden">
                                            <img
                                                src={step.image}
                                                alt={step.title}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                                        </div>
                                    </div>
                                </div>

                            </motion.div>
                        ))}
                    </div>

                    {/* FINAL CTA */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        className="mt-32 text-center relative z-20 ml-8 md:ml-0"
                    >
                        <button className="bg-slate-900 text-white font-bold py-5 px-12 rounded-full shadow-2xl shadow-slate-900/30 hover:bg-orange-600 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 mx-auto">
                            Book Your Slot Now <ArrowRight size={20} />
                        </button>
                        <p className="mt-4 text-slate-400 text-sm">Limited slots available for tomorrow</p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default JourneyRoadmap;