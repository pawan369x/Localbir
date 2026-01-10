import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Bike, Mountain, Activity } from 'lucide-react';

const adventures = [
    {
        id: 1,
        title: "Bungee Jumping",
        tag: "Extreme Thrill",
        desc: "Jump off from 50 meters! India's highest bungee in a natural setting.",
        height: "row-span-2", // Bada box
        image: "https://images.unsplash.com/photo-1525867958056-12c49b6703b6?auto=format&fit=crop&q=80&w=800",
        icon: <Activity />
    },
    {
        id: 2,
        title: "Sky Cycling",
        tag: "Must Try",
        desc: "Ride a bicycle on a rope suspended 100ft in the air. Perfect for photos.",
        height: "row-span-1",
        image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=800",
        icon: <Bike />
    },
    {
        id: 3,
        title: "Waterfall Trek",
        tag: "Nature Walk",
        desc: "A short hike through the forest leading to a hidden milky waterfall.",
        height: "row-span-1",
        image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=800",
        icon: <Mountain />
    },
    {
        id: 4,
        title: "Mountain Biking",
        tag: "Off-Road",
        desc: "Rent a MTB and explore the pine forests and monasteries at your own pace.",
        height: "md:col-span-2 row-span-1", // Wide box
        image: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?auto=format&fit=crop&q=80&w=800",
        icon: <Bike />
    }
];

const MoreAdventures = () => {
    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <span className="text-sky-500 font-bold tracking-widest uppercase text-sm">More Thrills</span>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-2">
                            Beyond <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">The Skies.</span>
                        </h2>
                    </div>
                    <p className="text-slate-500 max-w-sm text-right">
                        Bir has more to offer than just flying. Add these to your bucket list.
                    </p>
                </div>

                {/* BENTO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-auto md:h-[600px]">
                    {adventures.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative group rounded-3xl overflow-hidden cursor-pointer ${item.height}`}
                        >
                            {/* Background Image */}
                            <img
                                src={item.image}
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                            {/* Content */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                                        {item.tag}
                                    </span>
                                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                        <ArrowUpRight size={20} />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 text-sky-400 mb-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
                                        {item.icon}
                                        <span className="text-xs font-bold uppercase tracking-wider">Explore</span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-300 text-sm line-clamp-2 group-hover:text-white transition-colors">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default MoreAdventures;
