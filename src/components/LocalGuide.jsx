import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Compass, Camera, Coffee, Star, ShieldCheck, Heart } from 'lucide-react';

// Imports removed
// import abhiImg from '../assets/abhi.png';
// import deepakImg from '../assets/deepak.jpg';

const LocalGuide = () => {
    const guides = [
        {
            name: "Deepak",
            role: "Senior Local Guide",
            exp: "8+ Years Experience",
            desc: "Born and raised here. He knows every hidden trail and the best sunset spots that no tourist map will show.",
            image: "/deepak.jpg",
            specialty: "Hidden Trails",
            color: "bg-orange-500"
        },
        {
            name: "Abhi",
            role: "Adventure Expert",
            exp: "4+ Years Experience",
            desc: "A true local who knows the valley like the back of his hand. From best cafes to secret waterfalls, he's your guy.",
            image: "/abhi_new.jpg",
            specialty: "Local Secrets",
            color: "bg-emerald-500"
        },
        {
            name: "Aman",
            role: "Culture & Trek Guide",
            exp: "5 Years Experience",
            desc: "Passionate about local culture. He will take you to authentic village homes and share stories of Bir.",
            image: "/aman_new.jpg",
            specialty: "Village Walks",
            color: "bg-sky-500"
        }
    ];

    return (
        <section id="guide" className="py-20 bg-slate-50 overflow-hidden relative">
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-sky-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50" />
                <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sky-500 font-bold tracking-wider uppercase text-sm"
                    >
                        Experts You Can Trust
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-slate-900 mt-2 mb-4"
                    >
                        Meet Your <span className="text-sky-500">Local Guides</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-600 max-w-2xl mx-auto text-lg"
                    >
                        Our team of certified professionals is here to ensure your safety and provide an unforgettable experience.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {guides.map((guide, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-3xl p-4 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group"
                        >
                            {/* Image Container */}
                            <div className="relative h-80 rounded-2xl overflow-hidden mb-6">
                                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10`} />
                                <img
                                    src={guide.image}
                                    alt={guide.name}
                                    className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ${guide.name === "Aman" ? "object-top" : "object-center"}`}
                                />

                                <div className="absolute bottom-4 left-4 z-20">
                                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-2 ${guide.color}`}>
                                        {guide.specialty}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-1">{guide.name}</h3>
                                    <p className="text-white/80 text-sm font-medium flex items-center gap-1">
                                        <Star size={14} className="fill-yellow-400 text-yellow-400" /> {guide.exp}
                                    </p>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-2 pb-4">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide flex items-center gap-2">
                                            <ShieldCheck size={16} className="text-sky-500" /> {guide.role}
                                        </h4>
                                    </div>
                                </div>
                                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                                    {guide.desc}
                                </p>

                                <button className="w-full py-3 rounded-xl bg-slate-50 text-slate-700 font-bold text-sm hover:bg-sky-50 hover:text-sky-600 transition-colors flex items-center justify-center gap-2 group-hover:shadow-md">
                                    Book with {guide.name} <Heart size={16} className="group-hover:fill-sky-500 group-hover:text-sky-500 transition-colors" />
                                </button>
                            </div>

                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LocalGuide;
