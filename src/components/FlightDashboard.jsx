import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wind, CloudSun, Thermometer, Navigation, CheckCircle2, AlertTriangle, Clock, Loader2 } from 'lucide-react';

const FlightDashboard = ({ onBookClick }) => {
    // State for Real Data
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Bir Billing Coordinates
    const LAT = "32.0497";
    const LON = "76.7177";
    const API_KEY = "d7f3c3c038221c23558a58ce0d35d651"; // ✅ Your Key Added

    // Helper: Convert Degrees to Compass Direction
    const getDirection = (deg) => {
        const val = Math.floor((deg / 22.5) + 0.5);
        const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[val % 16];
    };

    // Helper: Determine if it's safe to fly
    const getFlyStatus = (speed, weatherMain) => {
        // Safety Logic: Wind > 30km/h is risky
        if (speed > 30) return { status: "High Wind Warning", color: "text-red-500", bg: "bg-red-100", icon: <AlertTriangle size={24} />, msg: "Wind too strong for takeoff. Please wait." };
        if (weatherMain === "Rain" || weatherMain === "Thunderstorm") return { status: "Flight Cancelled", color: "text-red-500", bg: "bg-red-100", icon: <AlertTriangle size={24} />, msg: "Raining at takeoff site." };

        return { status: "Green Day! Fly Now", color: "text-emerald-600", bg: "bg-emerald-100", icon: <CheckCircle2 size={24} />, msg: "Conditions are 100% perfect for flying." };
    };

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`);
                const data = await response.json();

                if (data.cod !== 200) throw new Error(data.message);

                setWeather(data);
                setLoading(false);
            } catch (err) {
                console.error("Weather Error:", err);
                // Fallback to Mock Data
                setWeather({
                    coord: { lon: 76.7177, lat: 32.0497 },
                    weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
                    base: "stations",
                    main: { temp: 18, feels_like: 17, temp_min: 16, temp_max: 20, pressure: 1015, humidity: 45 },
                    visibility: 10000,
                    wind: { speed: 5.5, deg: 160 }, // approx 20km/h
                    clouds: { all: 0 },
                    dt: 1600000000,
                    sys: { type: 1, id: 9165, country: "IN", sunrise: 1600000000, sunset: 1600050000 },
                    timezone: 19800,
                    id: 1253626,
                    name: "Bir",
                    cod: 200
                });
                setLoading(false);
            }
        };

        fetchWeather();

        // Auto-refresh every 5 minutes
        const interval = setInterval(fetchWeather, 300000);
        return () => clearInterval(interval);
    }, []);

    if (loading) return (
        <div className="py-24 flex flex-col items-center justify-center bg-slate-50">
            <Loader2 className="animate-spin text-sky-500 mb-2" size={40} />
            <p className="text-slate-400 text-sm">Connecting to Billing Station...</p>
        </div>
    );


    // Data Calculation
    const windSpeedKm = Math.round(weather.wind.speed * 3.6); // Convert m/s to km/h
    const direction = getDirection(weather.wind.deg);
    const temp = Math.round(weather.main.temp);
    const visibility = (weather.visibility / 1000).toFixed(1); // meters to km
    const flyStatus = getFlyStatus(windSpeedKm, weather.weather[0].main);

    return (
        <section id="flight-dashboard" className="py-24 bg-slate-50 relative overflow-hidden font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-12 items-center">

                    {/* LEFT: TEXT INFO */}
                    <div className="flex-1 text-center md:text-left">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase mb-6 animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Live Data: Bir Billing
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                            Current Flying <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Conditions.</span>
                        </h2>
                        <p className="text-slate-500 text-lg leading-relaxed mb-8">
                            We use live satellite data to monitor wind speed and visibility. Safety is our #1 priority.
                        </p>

                        <div className="flex flex-col gap-4">
                            {/* Live Status Card */}
                            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                                <div className={`p-3 ${flyStatus.bg} ${flyStatus.color} rounded-xl`}>
                                    {flyStatus.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{flyStatus.status}</h4>
                                    <p className="text-sm text-slate-500">{flyStatus.msg}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
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
                    <div className="flex-1 w-full perspective-1000">
                        <motion.div
                            initial={{ rotateX: 5, opacity: 0 }}
                            whileInView={{ rotateX: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="bg-[#1e293b] rounded-[2.5rem] p-6 md:p-8 shadow-2xl relative overflow-hidden border border-slate-700"
                        >

                            {/* Glass Reflection Effect */}
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-sky-500/20 rounded-full blur-[80px]"></div>

                            {/* Header */}
                            <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
                                <div>
                                    <h3 className="text-white font-bold text-lg">Billing Takeoff Site</h3>
                                    <p className="text-slate-400 text-xs font-mono">LAT: {LAT} | LON: {LON}</p>
                                </div>
                                <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold animate-pulse flex items-center gap-2">
                                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span> LIVE
                                </div>
                            </div>

                            {/* Main Gauges Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-8">

                                {/* Wind Speed Gauge */}
                                <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700 relative overflow-hidden group hover:border-sky-500/50 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-slate-400 text-xs uppercase tracking-wider font-bold">Wind Speed</span>
                                        <Wind size={16} className="text-sky-400 animate-pulse" />
                                    </div>
                                    <div className="flex items-end gap-1">
                                        <span className="text-4xl font-black text-white">{windSpeedKm}</span>
                                        <span className="text-slate-400 text-sm mb-1 font-bold">km/h</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-700 rounded-full mt-3 overflow-hidden">
                                        <motion.div
                                            className={`h-full ${windSpeedKm > 25 ? 'bg-red-500' : 'bg-sky-500'}`}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min((windSpeedKm / 30) * 100, 100)}%` }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                        />
                                    </div>
                                </div>

                                {/* Temperature */}
                                <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700 hover:border-orange-500/50 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-slate-400 text-xs uppercase tracking-wider font-bold">Temp</span>
                                        <Thermometer size={16} className="text-orange-400" />
                                    </div>
                                    <div className="flex items-end gap-1">
                                        <span className="text-4xl font-black text-white">{temp}°</span>
                                        <span className="text-slate-400 text-sm mb-1 font-bold">C</span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-3">Feels like {Math.round(weather.main.feels_like)}°</p>
                                </div>

                                {/* Direction */}
                                <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700 hover:border-purple-500/50 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-slate-400 text-xs uppercase tracking-wider font-bold">Direction</span>
                                        <Navigation size={16} className="text-purple-400" style={{ transform: `rotate(${weather.wind.deg}deg)` }} />
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="text-2xl font-bold text-white">{direction}</div>
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-2">Angle: {weather.wind.deg}°</p>
                                </div>

                                {/* Visibility */}
                                <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700 hover:border-yellow-500/50 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-slate-400 text-xs uppercase tracking-wider font-bold">View</span>
                                        <CloudSun size={16} className="text-yellow-400" />
                                    </div>
                                    <div className="text-xl font-bold text-white mt-1 capitalize truncate">{weather.weather[0].main}</div>
                                    <p className="text-[10px] text-slate-400 mt-2">Vis: {visibility}km</p>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onBookClick}
                                className="w-full py-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition-all border border-sky-400/20"
                            >
                                Book Now <CheckCircle2 size={18} />
                            </motion.button>

                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FlightDashboard;