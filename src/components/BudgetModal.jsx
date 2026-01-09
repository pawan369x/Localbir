import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Phone, CheckCircle2, Loader2, Plane, Mountain, Hotel, ArrowRight, Users } from 'lucide-react';

const BudgetModal = ({ isOpen, onClose, tripDetails }) => {
    const [step, setStep] = useState('verifying'); // verifying -> form -> success
    const [formData, setFormData] = useState({ name: '', phone: '', date: '' });

    // Reset step when modal opens
    useEffect(() => {
        if (isOpen) {
            setStep('verifying');
            // Fake verification delay
            const timer = setTimeout(() => {
                setStep('form');
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStep('success'); // Show success animation

        // Format detailed WhatsApp message
        const activityList = Object.entries(tripDetails.activities)
            .filter(([_, isActive]) => isActive)
            .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1)) // Capitalize
            .join(', ');

        const message = `*New Custom Trip Request!* 📋%0A%0A` +
            `*Trip Details:*%0A` +
            `👥 Travelers: ${tripDetails.travelers}%0A` +
            `📅 Duration: ${tripDetails.days} Days%0A` +
            `🏨 Stay: ${tripDetails.stayType}%0A` +
            `🧗 Activities: ${activityList || 'None'}%0A` +
            `💰 *Est. Budget: ₹${tripDetails.totalCost.toLocaleString()}*%0A%0A` +
            `*Customer Details:*%0A` +
            `👤 Name: ${formData.name}%0A` +
            `📞 Phone: ${formData.phone}%0A` +
            `🗓 Start Date: ${formData.date}`;

        const phoneNumber = "916230044384";

        setTimeout(() => {
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
            onClose();
        }, 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
                    >
                        {/* Header Image/Gradient */}
                        <div className="h-32 bg-gradient-to-r from-sky-500 to-blue-600 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                            <button onClick={onClose} className="absolute right-4 top-4 p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors">
                                <X size={20} />
                            </button>
                            <div className="absolute bottom-4 left-6 text-white">
                                <h2 className="text-2xl font-black">Plan Confirmed!</h2>
                                <p className="text-sky-100 text-sm opacity-90">Review details & verify.</p>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-6">

                            {/* STEP 1: FAKE VERIFICATION */}
                            {step === 'verifying' && (
                                <div className="py-10 flex flex-col items-center justify-center text-center">
                                    <div className="relative w-16 h-16 mb-4">
                                        <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                                        <div className="absolute inset-0 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800">Checking Availability...</h3>
                                    <p className="text-slate-500 text-sm">Verifying guides & rooms for selected dates.</p>
                                </div>
                            )}

                            {/* STEP 2: FORM & SUMMARY */}
                            {step === 'form' && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>

                                    {/* Brief Summary */}
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 flex justify-between items-center text-sm">
                                        <div className="flex flex-col gap-1">
                                            <span className="flex items-center gap-1 font-bold text-slate-700">
                                                <Users size={14} className="text-sky-500" /> {tripDetails.travelers} Persons
                                            </span>
                                            <span className="flex items-center gap-1 font-bold text-slate-700">
                                                <Calendar size={14} className="text-sky-500" /> {tripDetails.days} Days
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-xs text-slate-400 font-bold uppercase">Estimated</span>
                                            <span className="block text-xl font-black text-sky-600">₹{tripDetails.totalCost.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {/* Form */}
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide ml-1">Your Name</label>
                                            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 focus-within:ring-2 ring-sky-100 transition-all">
                                                <User size={18} className="text-slate-400" />
                                                <input type="text" name="name" required placeholder="Name"
                                                    className="bg-transparent w-full outline-none font-medium text-slate-700 placeholder:text-slate-400"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide ml-1">Phone Number</label>
                                            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 focus-within:ring-2 ring-sky-100 transition-all">
                                                <Phone size={18} className="text-slate-400" />
                                                <input type="tel" name="phone" required placeholder="Phone"
                                                    className="bg-transparent w-full outline-none font-medium text-slate-700 placeholder:text-slate-400"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide ml-1">Travel Date</label>
                                            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 focus-within:ring-2 ring-sky-100 transition-all">
                                                <Calendar size={18} className="text-slate-400" />
                                                <input type="date" name="date" required
                                                    className="bg-transparent w-full outline-none font-medium text-slate-700"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <button className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 mt-2 transition-transform active:scale-95">
                                            Confirm via WhatsApp <ArrowRight size={20} />
                                        </button>
                                        <p className="text-[10px] text-center text-slate-400 mt-2">*No immediate payment required.</p>
                                    </form>
                                </motion.div>
                            )}

                            {/* STEP 3: SUCCESS */}
                            {step === 'success' && (
                                <div className="py-10 flex flex-col items-center justify-center text-center">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4 animate-bounce">
                                        <CheckCircle2 size={40} strokeWidth={3} />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900">Request Sent!</h3>
                                    <p className="text-slate-500 mt-2">Opening WhatsApp to finalize your booking...</p>
                                </div>
                            )}

                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default BudgetModal;
