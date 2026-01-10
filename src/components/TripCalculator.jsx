import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Check, Calculator } from 'lucide-react';

import BudgetModal from './BudgetModal';

const TripCalculator = () => {

    const [isBudgetPopupOpen, setIsBudgetPopupOpen] = useState(false);

    // State for Calculator
    const [travelers, setTravelers] = useState(2);
    const [days, setDays] = useState(2);

    // Updated Activities & Stays
    const [stayType, setStayType] = useState('camping_std'); // none, camping_std, camping_prem, hotel_bud, hotel_prem, hotel_lux
    const [activities, setActivities] = useState({
        paragliding: true,
        stunts: false,
        bungee: false,
        skycycling: false,
        waterfallGuide: false,
        hikingGuide: false
    });

    // const [totalCost, setTotalCost] = useState(0); // Derived state utilized instead

    // Pricing Config (Updated)
    const PRICES = {
        paragliding: 3000, // Includes Video & Transport
        stunts: 500,

        // Stays (Per Night Per Room/Tent - Approx logic or Per Person?)
        // User said: "camping... 1500-2000", "hotel... 1500, 3000, 5500"
        // Usually these are per room/tent, but for simplicity in calculator let's assume PER PERSON for shared sharing or just avg cost.
        // Let's treat it as Per Person Per Night cost for easier calculation
        stays: {
            none: 0,
            camping_std: 1500,
            camping_prem: 2000,
            hotel_bud: 1500,
            hotel_prem: 3000,
            hotel_lux: 5500
        },

        bungee: 3500,
        skycycling: 2500,
        waterfallGuide: 200, // Per Person
        hikingGuide: 1500 // Per Day (Fixed Cost for Group? Or Per Person? User said "mil ke... ek din ka 1500". Let's assume split cost or per group? 
        // To be safe and simple: Let's assume it's a fixed cost added ONCE per day, divided by travelers? 
        // Or just simple: ₹1500 per group per day. Let's do: ₹1500 * days.
    };

    // Calculate Total
    // Calculate Total (Derived State)
    const calculateTotal = () => {
        let total = 0;

        // 1. Accommodation Cost
        const nights = days > 1 ? days - 1 : 0;
        const stayCost = PRICES.stays[stayType] * travelers * nights;
        total += stayCost;

        // 2. Paragliding
        if (activities.paragliding) {
            total += PRICES.paragliding * travelers;
            if (activities.stunts) {
                total += PRICES.stunts * travelers;
            }
        }

        // 3. Adventure Activities
        if (activities.bungee) total += PRICES.bungee * travelers;
        if (activities.skycycling) total += PRICES.skycycling * travelers;

        // 4. Waterfall Guide
        if (activities.waterfallGuide) total += PRICES.waterfallGuide * travelers;

        // 5. Hiking Guide
        if (activities.hikingGuide) total += PRICES.hikingGuide;

        return total;
    };

    const totalCost = calculateTotal();

    const toggleActivity = (key) => {
        setActivities(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Handler to open Custom Budget Modal
    const handleBookBudget = () => {
        setIsBudgetPopupOpen(true);
    };

    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Side: Controls */}
                    <div>
                        <span className="text-orange-500 font-bold tracking-wider uppercase text-sm bg-orange-50 px-3 py-1 rounded-full">
                            Plan Your Budget
                        </span>
                        <h2 className="text-4xl font-black text-slate-900 mt-4 mb-2">
                            Trip Cost <span className="text-sky-500">Calculator</span>
                        </h2>
                        <p className="text-slate-500 mb-10">
                            Adjust the sliders to get an estimated cost for your Bir Billing adventure.
                        </p>

                        <div className="space-y-8">

                            {/* Sliders */}
                            <div className="space-y-6">
                                {/* Travelers Slider */}
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                    <div className="flex justify-between mb-4">
                                        <label className="font-bold text-slate-700 flex items-center gap-2">
                                            <Users size={18} className="text-sky-500" /> Travelers
                                        </label>
                                        <span className="font-black text-sky-600 bg-sky-100 px-3 py-1 rounded-lg">
                                            {travelers} People
                                        </span>
                                    </div>
                                    <input
                                        type="range" min="1" max="20" value={travelers}
                                        onChange={(e) => setTravelers(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
                                    />
                                </div>

                                {/* Days Slider */}
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                    <div className="flex justify-between mb-4">
                                        <label className="font-bold text-slate-700 flex items-center gap-2">
                                            <Calendar size={18} className="text-sky-500" /> Duration
                                        </label>
                                        <span className="font-black text-sky-600 bg-sky-100 px-3 py-1 rounded-lg">
                                            {days} Days
                                        </span>
                                    </div>
                                    <input
                                        type="range" min="1" max="7" value={days}
                                        onChange={(e) => setDays(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
                                    />
                                </div>
                            </div>

                            {/* Stay Selector */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <label className="font-bold text-slate-700 flex items-center gap-2 mb-3">
                                    <Calculator size={18} className="text-sky-500" /> Accommodation Type
                                </label>
                                <select
                                    value={stayType}
                                    onChange={(e) => setStayType(e.target.value)}
                                    className="w-full p-3 rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:ring-2 focus:ring-sky-500 outline-none"
                                >
                                    <option value="none">No Stay Needed</option>
                                    <option value="camping_std">Camping (Standard) - ₹1500</option>
                                    <option value="camping_prem">Camping (Premium) - ₹2000</option>
                                    <option value="hotel_bud">Hotel (Budget) - ₹1500</option>
                                    <option value="hotel_prem">Hotel (Premium) - ₹3000</option>
                                    <option value="hotel_lux">Hotel (Luxury) - ₹5500</option>
                                </select>
                                <p className="text-xs text-slate-400 mt-2">*Prices are approx per person per night.</p>
                            </div>

                            {/* Toggles */}
                            <div className="grid grid-cols-2 gap-4">
                                <ActivityToggle
                                    label="Paragliding"
                                    price="₹3000 (Vid Inc.)"
                                    active={activities.paragliding}
                                    onClick={() => toggleActivity('paragliding')}
                                />
                                <ActivityToggle
                                    label="Add Stunts"
                                    price="+ ₹500"
                                    active={activities.stunts}
                                    disabled={!activities.paragliding}
                                    onClick={() => activities.paragliding && toggleActivity('stunts')}
                                    className={!activities.paragliding ? 'opacity-50 cursor-not-allowed' : ''}
                                />
                                <ActivityToggle
                                    label="Bungee Jumping"
                                    price="₹3500"
                                    active={activities.bungee}
                                    onClick={() => toggleActivity('bungee')}
                                />
                                <ActivityToggle
                                    label="Sky Cycling"
                                    price="₹2500"
                                    active={activities.skycycling}
                                    onClick={() => toggleActivity('skycycling')}
                                />
                                <ActivityToggle
                                    label="Waterfall Guide"
                                    price="₹200/person"
                                    active={activities.waterfallGuide}
                                    onClick={() => toggleActivity('waterfallGuide')}
                                />
                                <ActivityToggle
                                    label="Hiking Guide"
                                    price="₹1500/day"
                                    active={activities.hikingGuide}
                                    onClick={() => toggleActivity('hikingGuide')}
                                />
                            </div>

                        </div>
                    </div>

                    {/* Right Side: Total Card */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-sky-500 to-blue-600 rounded-[2.5rem] rotate-3 opacity-20 blur-xl"></div>
                        <motion.div
                            layout
                            className="relative bg-white border border-slate-100 shadow-2xl rounded-[2.5rem] p-10 text-center overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sky-400 to-blue-600"></div>

                            <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-sky-600">
                                <Calculator size={32} />
                            </div>

                            <h3 className="text-slate-500 font-medium uppercase tracking-widest text-sm mb-2">Estimated Total</h3>
                            <div className="text-5xl md:text-6xl font-black text-slate-900 mb-2">
                                ₹{totalCost.toLocaleString()}
                            </div>
                            <p className="text-slate-400 text-sm mb-8">for {travelers} people / {days} days</p>

                            <div className="space-y-3 mb-8 text-left bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <SummaryItem label="Avg. Cost Per Person" value={`₹${travelers > 0 ? (totalCost / travelers).toFixed(0) : 0}`} />
                                <SummaryItem label="Includes" value="Activities, Stay, Guides" />
                                <SummaryItem label="Food" value="Not Included" highlightColor="text-rose-500" />
                            </div>

                            <button
                                onClick={handleBookBudget}
                                className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                            >
                                Book This Budget <Check size={18} />
                            </button>

                        </motion.div>
                    </div>

                </div>
            </div>

            {/* Render the specialized Budget Modal */}
            <BudgetModal
                isOpen={isBudgetPopupOpen}
                onClose={() => setIsBudgetPopupOpen(false)}
                tripDetails={{
                    travelers,
                    days,
                    stayType,
                    activities,
                    totalCost
                }}
            />
        </section>
    );
};

// Helper Components
const ActivityToggle = ({ label, price, active, onClick, className = '' }) => (
    <div
        onClick={onClick}
        className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col justify-center items-center text-center gap-1 ${active
            ? 'border-sky-500 bg-sky-50 text-sky-700'
            : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
            } ${className}`}
    >
        <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 transition-colors ${active ? 'bg-sky-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
            <Check size={14} strokeWidth={3} />
        </div>
        <span className="font-bold text-sm">{label}</span>
        <span className="text-xs opacity-70">{price}</span>
    </div>
);

const SummaryItem = ({ label, value, highlight, highlightColor }) => (
    <div className="flex justify-between items-center text-sm">
        <span className="text-slate-500 font-medium">{label}</span>
        <span className={`font-bold ${highlightColor || (highlight ? 'text-emerald-500' : 'text-slate-800')}`}>{value}</span>
    </div>
);

export default TripCalculator;
