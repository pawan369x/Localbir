import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wind, CloudSun, Thermometer, Navigation, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

const FlightDashboard = ({ onBookClick }) => {
    // Fake Live Data Simulation
    const [windSpeed, setWindSpeed] = useState(12);
    const [direction, setDirection] = useState("SW");

    // Animate Wind Speed slightly
    useEffect(() => {
        const interval = setInterval(() => {
            setWindSpeed(prev => Math.max(8, Math.min(18, prev + (Math.random() - 0.5) * 4)));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col md:flex-row gap-12 items-center">

                    {/* LEFT: TEXT */}
                    <div className="flex-1 text-center md:text-left">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase mb-6 animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Live from Takeoff Site
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                            Current Flying <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Conditions.</span>
                        </h2>
                        <p className="text-slate-500 text-lg leading-relaxed mb-8">
                            We monitor wind speed and thermals in real-time to ensure your safety. Check the live status before you book.
                        </p>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                                    <CheckCircle2 size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">It's a Green Day!</h4>
                                    <p className="text-sm text-slate-500">Conditions are 100% perfect for flying.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Best Slot Today</h4>
                                    <p className="text-sm text-slate-500">Sunset Flight (4:00 PM - 5:30 PM)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: THE COCKPIT DASHBOARD */}
                    <div className="flex-1 w-full">
                        <div className="bg-[#1e293b] rounded-[2.5rem] p-6 md:p-8 shadow-2xl relative overflow-hidden border border-slate-700">

                            {/* Glass Reflection */}
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-sky-500/20 rounded-full blur-[80px]"></div>

                            {/* Header */}
                            <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
                                <div>
                                    <h3 className="text-white font-bold text-lg">Billing Station</h3>
                                    <p className="text-slate-400 text-xs">Alt: 8000ft | GPS: Active</p>
                                </div>
                                <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold animate-pulse">
                                    ● LIVE
                                </div>
                            </div>

                            {/* Main Gauges Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-8">

                                {/* Wind Speed Gauge */}
                                <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700 relative overflow-hidden group">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-slate-400 text-xs uppercase tracking-wider">Wind</span>
                                        <Wind size={16} className="text-sky-400" />
                                    </div>
                                    <div className="flex items-end gap-1">
                                        <motion.span
                                            className="text-4xl font-black text-white"
                                            key={windSpeed}
                                            initial={{ opacity: 0.8 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            {Math.round(windSpeed)}
                                        </motion.span>
                                        <span className="text-slate-400 text-sm mb-1">km/h</span>
                                    </div>
                                    {/* Animated Bar */}
                                    <div className="w-full h-1.5 bg-slate-700 rounded-full mt-3 overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-sky-400 to-blue-500"
                                            animate={{ width: `${(windSpeed / 30) * 100}%` }}
                                            transition={{ type: "spring", stiffness: 50 }}
                                        />
                                    </div>
                                </div>

                                {/* Temperature */}
                                <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-slate-400 text-xs uppercase tracking-wider">Temp</span>
                                        <Thermometer size={16} className="text-orange-400" />
                                    </div>
                                    <div className="flex items-end gap-1">
                                        <span className="text-4xl font-black text-white">18°</span>
                                        <span className="text-slate-400 text-sm mb-1">Celcius</span>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-3">Feels like 15° at top</p>
                                </div>

                                {/* Direction */}
                                <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-slate-400 text-xs uppercase tracking-wider">Direction</span>
                                        <Navigation size={16} className="text-purple-400" />
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="text-2xl font-bold text-white">South West</div>
                                    </div>
                                    <p className="text-xs text-emerald-400 mt-2">Perfect for takeoff</p>
                                </div>

                                {/* Visibility */}
                                <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-slate-400 text-xs uppercase tracking-wider">View</span>
                                        <CloudSun size={16} className="text-yellow-400" />
                                    </div>
                                    <div className="text-2xl font-bold text-white mt-1">Clear</div>
                                    <p className="text-xs text-slate-400 mt-2">Visibility 12km+</p>
                                </div>
                            </div>

                            {/* CTA inside Dashboard */}
                            <button
                                onClick={onBookClick}
                                className="w-full py-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition-all"
                            >
                                Book While It's Clear <CheckCircle2 size={18} />
                            </button>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FlightDashboard;
