import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Compass, Camera, Coffee } from 'lucide-react';

const LocalGuide = () => {
    const spots = [
        {
            title: "Secret Waterfall",
            desc: "A hidden gem just 30 mins trek from the landing site. Perfect for a quiet dip away from the crowd.",
            icon: <Compass className="w-6 h-6 text-white" />,
            color: "bg-emerald-500"
        },
        {
            title: "Sunset at Mata Maheshwari",
            desc: "The best panoramic view of the entire valley during golden hour. A magical experience.",
            icon: <Camera className="w-6 h-6 text-white" />,
            color: "bg-orange-500"
        },
        {
            title: "Monk's Cafe",
            desc: "Authentic Tibetan butter tea in a cozy corner near the monastery. A taste of local culture.",
            icon: <Coffee className="w-6 h-6 text-white" />,
            color: "bg-amber-600"
        }
    ];

    return (
        <section id="guide" className="py-20 bg-slate-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sky-500 font-bold tracking-wider uppercase text-sm"
                    >
                        Explore Like a Local
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-slate-900 mt-2 mb-4"
                    >
                        Hidden Gems & <span className="text-sky-500">Local Secrets</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-600 max-w-2xl mx-auto text-lg"
                    >
                        Don't just be a tourist. Experience Bir Billing through the eyes of those who call it home.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {spots.map((spot, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group"
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 ${spot.color} opacity-10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500`} />

                            <div className={`${spot.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover:rotate-6 transition-transform`}>
                                {spot.icon}
                            </div>

                            <h3 className="text-xl font-bold text-slate-800 mb-3">{spot.title}</h3>
                            <p className="text-slate-500 leading-relaxed mb-4">{spot.desc}</p>

                            <div className="flex items-center text-sky-500 font-bold text-sm group-hover:gap-2 transition-all cursor-pointer">
                                View on Map <MapPin size={16} className="ml-1" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LocalGuide;
