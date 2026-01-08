import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mountain, Wind, CheckCircle2 } from 'lucide-react';

const steps = [
    {
        id: 1,
        title: "Meet at Tibetan Colony",
        desc: "Reach our office at the landing site. Meet your pilot, complete the paperwork, and put your bags in our safe lockers.",
        icon: <MapPin className="text-white" />,
        color: "bg-rose-500",
        image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 2,
        title: "Off-Road Jeep Safari",
        desc: "Hop into our 4x4 Bolero Camper. Enjoy a thrilling 45-minute ride through the dense oak forests up to the takeoff point (8000ft).",
        icon: <Mountain className="text-white" />,
        color: "bg-amber-500",
        image: "https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 3,
        title: "Gear Up & Fly",
        desc: "Safety briefing time! Strap into your harness, run a few steps, and suddenly—you are flying! Enjoy 15-20 mins of pure freedom.",
        icon: <Wind className="text-white" />,
        color: "bg-sky-500",
        image: "https://images.unsplash.com/photo-1624300603538-1207400f4116?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 4,
        title: "Safe Landing & Memories",
        desc: "Land smoothly at the sunset point. Collect your GoPro video instantly and head to the cafe for a celebration chai!",
        icon: <CheckCircle2 className="text-white" />,
        color: "bg-emerald-500",
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800"
    }
];

const JourneyRoadmap = () => {
    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-slate-900 mb-4"
                    >
                        How It <span className="text-sky-500">Works?</span>
                    </motion.h2>
                    <p className="text-lg text-slate-600">From the meeting point to the skies—here is your adventure plan.</p>
                </div>

                <div className="relative">
                    {/* Central Vertical Line (Flight Path) - Hidden on Mobile */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2 rounded-full" />

                    <div className="space-y-12 md:space-y-24">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 
                                    ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >

                                {/* Center Icon Bubble */}
                                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full border-4 border-white shadow-xl z-10 bg-white">
                                    <div className={`w-full h-full rounded-full flex items-center justify-center ${step.color}`}>
                                        {React.cloneElement(step.icon, { size: 20 })}
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3 ${step.color}`}>
                                        Step 0{step.id}
                                    </span>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>

                                {/* Image Side */}
                                <div className="w-full md:w-1/2 pl-16 md:pl-0">
                                    <div className="relative rounded-2xl overflow-hidden shadow-lg group h-64 w-full">
                                        <div className={`absolute inset-0 opacity-20 group-hover:opacity-10 transition-opacity ${step.color}`} />
                                        <img
                                            src={step.image}
                                            alt={step.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                </div>

                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default JourneyRoadmap;
