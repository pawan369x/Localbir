import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Check, Calculator, Moon, Info } from 'lucide-react';

import BudgetModal from './BudgetModal';

const TripCalculator = () => {

    const [isBudgetPopupOpen, setIsBudgetPopupOpen] = useState(false);

    // --- STATE ---
    const [travelers, setTravelers] = useState(2);
    const [nights, setNights] = useState(1);
    const [stayType, setStayType] = useState('camping_std');

    const [activities, setActivities] = useState({
        paragliding: true,
        stunts: false,
        bungee: false,
        skycycling: false,
        waterfallGuide: false,
        hikingGuide: false
    });

    // --- PRICING CONFIG (Edit Rates Here) ---
    const PRICES = {
        // Adventures (Per Person)
        paragliding: 3000,
        stunts: 500,
        bungee: 3500,
        skycycling: 2500,
        waterfallGuide: 200,

        // Hiking Guide is usually Fixed Price for the whole group per day
        hikingGuide: 1500,

        // Stay Rates (Approx Per Person Per Night)
        stays: {
            none: 0,
            camping_std: 1500, // Standard Camp
            camping_prem: 2000, // Premium Camp
            hotel_bud: 1500,   // Budget Hotel
            hotel_prem: 3000,  // Premium Hotel
            hotel_lux: 5500    // Luxury Stay
        }
    };

    // --- MAIN CALCULATION LOGIC ---
    const calculateTotal = () => {
        let total = 0;

        // 1. ACCOMMODATION (Rate * Travelers * Nights)
        // Agar nights 0 hai, toh stay cost 0 hogi
        if (nights > 0) {
            const ratePerPersonPerNight = PRICES.stays[stayType];
            total += (ratePerPersonPerNight * travelers * nights);
        }

        // 2. PARAGLIDING (Rate * Travelers)
        if (activities.paragliding) {
            total += (PRICES.paragliding * travelers);

            // Stunts add-on
            if (activities.stunts) {
                total += (PRICES.stunts * travelers);
            }
        }

        // 3. OTHER ADVENTURES (Rate * Travelers)
        if (activities.bungee) total += (PRICES.bungee * travelers);
        if (activities.skycycling) total += (PRICES.skycycling * travelers);
        if (activities.waterfallGuide) total += (PRICES.waterfallGuide * travelers);

        // 4. HIKING GUIDE (Fixed Cost per Group - One time)
        // Guide ki fees travelers se multiply nahi hoti, wo pure group ki ek fees hoti hai
        if (activities.hikingGuide) total += PRICES.hikingGuide;

        return total;
    };

    const totalCost = calculateTotal();

    // Toggle Handler
    const toggleActivity = (key) => {
        setActivities(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleBookBudget = () => {
        setIsBudgetPopupOpen(true);
    };

    // UI Helpers
    const getStayLabel = () => {
        if (stayType === 'none') return "No Stay";
        return nights > 0 ? `${nights} Night(s)` : "Select Nights";
    }

    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* --- LEFT SIDE: CONTROLS --- */}
                    <div>
                        <span className="text-orange-500 font-bold tracking-wider uppercase text-sm bg-orange-50 px-3 py-1 rounded-full">
                            Plan Your Budget
                        </span>
                        <h2 className="text-4xl font-black text-slate-900 mt-4 mb-2">
                            Trip Cost <span className="text-sky-500">Calculator</span>
                        </h2>
                        <p className="text-slate-500 mb-8">
                            Select your preferences to get an instant cost estimate.
                        </p>

                        <div className="space-y-8">

                            {/* 1. SLIDERS */}
                            <div className="space-y-6">
                                {/* Travelers */}
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                    <div className="flex justify-between mb-4">
                                        <label className="font-bold text-slate-700 flex items-center gap-2">
                                            <Users size={18} className="text-sky-500" /> Total Travelers
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

                                {/* Nights */}
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                    <div className="flex justify-between mb-4">
                                        <label className="font-bold text-slate-700 flex items-center gap-2">
                                            <Moon size={18} className="text-sky-500" /> Duration (Nights)
                                        </label>
                                        <span className="font-black text-sky-600 bg-sky-100 px-3 py-1 rounded-lg">
                                            {nights} Nights
                                        </span>
                                    </div>
                                    <input
                                        type="range" min="0" max="7" value={nights}
                                        onChange={(e) => setNights(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
                                    />
                                </div>
                            </div>

                            {/* 2. ACCOMMODATION SELECTOR */}
                            <div className={`p-6 rounded-2xl border transition-all ${nights > 0 ? 'bg-slate-50 border-slate-100' : 'bg-slate-100 border-slate-200 opacity-60'}`}>
                                <label className="font-bold text-slate-700 flex items-center gap-2 mb-3">
                                    <Calculator size={18} className="text-sky-500" /> Stay Type
                                </label>
                                <select
                                    value={stayType}
                                    onChange={(e) => setStayType(e.target.value)}
                                    disabled={nights === 0}
                                    className="w-full p-3 rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:ring-2 focus:ring-sky-500 outline-none disabled:cursor-not-allowed"
                                >
                                    <option value="none">No Stay Needed</option>
                                    <option value="camping_std">Camping (Standard) - ₹1500/pax</option>
                                    <option value="camping_prem">Camping (Premium) - ₹2000/pax</option>
                                    <option value="hotel_bud">Hotel (Budget) - ₹1500/pax</option>
                                    <option value="hotel_prem">Hotel (Premium) - ₹3000/pax</option>
                                    <option value="hotel_lux">Hotel (Luxury) - ₹5500/pax</option>
                                </select>
                                <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                                    <Info size={12} />
                                    {nights === 0 ? "Increase nights to select stay" : "Cost calculated as: Rate x Travelers x Nights"}
                                </div>
                            </div>

                            {/* 3. ACTIVITIES TOGGLES */}
                            <div className="grid grid-cols-2 gap-4">
                                <ActivityToggle
                                    label="Paragliding"
                                    price="₹3000 /person"
                                    active={activities.paragliding}
                                    onClick={() => toggleActivity('paragliding')}
                                />
                                <ActivityToggle
                                    label="Add Stunts"
                                    price="+ ₹500 /person"
                                    active={activities.stunts}
                                    disabled={!activities.paragliding}
                                    onClick={() => activities.paragliding && toggleActivity('stunts')}
                                    className={!activities.paragliding ? 'opacity-50 cursor-not-allowed' : ''}
                                />
                                <ActivityToggle
                                    label="Bungee Jumping"
                                    price="₹3500 /person"
                                    active={activities.bungee}
                                    onClick={() => toggleActivity('bungee')}
                                />
                                <ActivityToggle
                                    label="Sky Cycling"
                                    price="₹2500 /person"
                                    active={activities.skycycling}
                                    onClick={() => toggleActivity('skycycling')}
                                />
                                <ActivityToggle
                                    label="Waterfall Guide"
                                    price="₹200 /person"
                                    active={activities.waterfallGuide}
                                    onClick={() => toggleActivity('waterfallGuide')}
                                />
                                <ActivityToggle
                                    label="Hiking Guide"
                                    price="₹1500 /group"
                                    active={activities.hikingGuide}
                                    onClick={() => toggleActivity('hikingGuide')}
                                />
                            </div>

                        </div>
                    </div>

                    {/* --- RIGHT SIDE: TOTAL CARD --- */}
                    <div className="sticky top-24">
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
                                <p className="text-slate-400 text-sm mb-8">
                                    for {travelers} people / {nights} nights
                                </p>

                                <div className="space-y-3 mb-8 text-left bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                    <SummaryItem label="Avg. Cost Per Person" value={`₹${travelers > 0 ? (totalCost / travelers).toFixed(0) : 0}`} />
                                    <SummaryItem label="Stay Duration" value={getStayLabel()} />
                                    <SummaryItem label="Paragliding" value={activities.paragliding ? `${travelers} Flyers` : 'Not Selected'} />

                                    <div className="h-px bg-slate-200 my-2"></div>

                                    <SummaryItem label="Food" value="Not Included" highlightColor="text-rose-500" />
                                    <p className="text-[10px] text-slate-400 mt-1 text-center">
                                        *Meals are charged separately at cafes/hotels.
                                    </p>
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
            </div>

            <BudgetModal
                isOpen={isBudgetPopupOpen}
                onClose={() => setIsBudgetPopupOpen(false)}
                tripDetails={{
                    travelers,
                    nights,
                    stayType,
                    activities,
                    totalCost
                }}
            />
        </section>
    );
};

// --- HELPER COMPONENTS ---

const ActivityToggle = ({ label, price, active, onClick, className = '', disabled = false }) => (
    <div
        onClick={!disabled ? onClick : undefined}
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