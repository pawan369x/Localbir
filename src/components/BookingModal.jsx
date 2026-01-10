import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Phone, Users, Send, Flag, CheckCircle2, Loader2, Ticket } from 'lucide-react';

const BookingModal = ({ isOpen, onClose }) => {

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        guests: '1',
        activity: 'Paragliding',
        coupon: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Input Change Handler
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit Logic with Animation
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Message Formatting
        const message = `*New Booking Request!* 🚀%0A%0A` +
            `👤 *Name:* ${formData.name}%0A` +
            `📞 *Phone:* ${formData.phone}%0A` +
            `📅 *Date:* ${formData.date}%0A` +
            `👥 *Guests:* ${formData.guests}%0A` +
            `🪂 *Activity:* ${formData.activity}%0A` +
            `🎟️ *Coupon:* ${formData.coupon || 'N/A'}%0A%0A` +
            `Please confirm availability.`;

        const phoneNumber = "916230044384";

        // 2 Second Delay for Animation effect
        setTimeout(() => {
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
            setIsSubmitting(false);
            onClose();
            // Reset form (Optional)
            setFormData({ name: '', phone: '', date: '', guests: '1', activity: 'Paragliding' });
        }, 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

                    {/* Backdrop with Blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden ring-1 ring-white/20"
                    >

                        {/* CONDITIONAL RENDERING: Form vs Success State */}
                        {!isSubmitting ? (
                            <>
                                {/* Header */}
                                <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-6 pt-8 text-white relative overflow-hidden">
                                    {/* Abstract Circle */}
                                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/20 rounded-full blur-2xl" />

                                    <button
                                        onClick={onClose}
                                        className="absolute right-4 top-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-md"
                                    >
                                        <X size={20} />
                                    </button>

                                    <motion.div
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <h2 className="text-2xl font-black tracking-tight">Let's Fly! 🪂</h2>
                                        <p className="text-sky-100 text-sm mt-1 font-medium">
                                            Fill the details to get instant confirmation.
                                        </p>
                                    </motion.div>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="p-6 space-y-5">

                                    {/* Name */}
                                    <div className="group">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
                                        <div className="relative mt-1">
                                            <User className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={18} />
                                            <input
                                                type="text" name="name" required placeholder="e.g. Rahul Sharma"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all font-medium text-slate-800"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="group">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Phone Number</label>
                                        <div className="relative mt-1">
                                            <Phone className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={18} />
                                            <input
                                                type="tel" name="phone" required placeholder="e.g. 9876543210"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all font-medium text-slate-800"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Date & Guests Row */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="group">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Date</label>
                                            <div className="relative mt-1">
                                                <Calendar className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={18} />
                                                <input
                                                    type="date" name="date" required
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-2 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all font-medium text-slate-800 text-sm"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="group">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Guests</label>
                                            <div className="relative mt-1">
                                                <Users className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={18} />
                                                <select
                                                    name="guests"
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-2 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all font-medium text-slate-800 appearance-none"
                                                    onChange={handleChange}
                                                >
                                                    {[1, 2, 3, 4, 5, 6, '7+'].map(num => (
                                                        <option key={num} value={num}>{num} Person</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Coupon Code */}
                                    <div className="group">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Coupon Code</label>
                                        <div className="relative mt-1">
                                            <input
                                                type="text" name="coupon" placeholder="Enter code here"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all font-medium text-slate-800"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Activity */}
                                    <div className="group">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Interested In</label>
                                        <div className="relative mt-1">
                                            <Flag className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={18} />
                                            <select
                                                name="activity"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all font-medium text-slate-800 appearance-none"
                                                onChange={handleChange}
                                            >
                                                <option value="Paragliding">Paragliding 🪂</option>
                                                <option value="Camping">Camping ⛺</option>
                                                <option value="Paragliding + Camping">Combo Package 🔥</option>
                                                <option value="Bungee Jumping">Bungee Jumping 🧗</option>
                                                <option value="Trekking">Trekking 🥾</option>
                                                <option value="Room Rent">Room Rent 🏠</option>
                                                <option value="Bike/Cycle Rent">Bike/Cycle Rent 🚲</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Coupon Screenshot Upload */}
                                    <div className="group">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Upload Coupon Screenshot (Optional)</label>
                                        <div className="relative mt-1">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-4 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 flex items-center justify-center gap-2 mt-4 transition-all"
                                    >
                                        Proceed to WhatsApp <Send size={20} />
                                    </motion.button>

                                    <p className="text-[10px] text-center text-slate-400">
                                        *No payment required at this stage.
                                    </p>
                                </form>
                            </>
                        ) : (
                            /* SUCCESS STATE ANIMATION */
                            <div className="h-[500px] flex flex-col items-center justify-center p-8 text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                    className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600"
                                >
                                    <CheckCircle2 size={48} strokeWidth={3} />
                                </motion.div>

                                <h3 className="text-2xl font-black text-slate-900 mb-2">Request Sent!</h3>
                                <p className="text-slate-500 mb-8">
                                    Redirecting you to WhatsApp to finalize your booking...
                                </p>

                                <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                                    <Loader2 size={16} className="animate-spin" /> Please wait...
                                </div>
                            </div>
                        )}

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default BookingModal;
