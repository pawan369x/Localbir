import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Tent, Mountain, Bike, Home, CheckCircle, ArrowRight, X, User, Users, Calendar } from 'lucide-react';

const services = [
    // --- ADVENTURE (Per Person) ---
    {
        id: 1,
        category: "Adventure",
        title: "Paragliding (Classic)",
        price: "₹3,000",
        unit: "per person",
        icon: <Wind size={24} />,
        features: ["15-20 Mins Flight", "GoPro Available", "Landing Site Pickup"],
        popular: true,
        isFixedPrice: false // Ye multiply hoga
    },
    {
        id: 2,
        category: "Adventure",
        title: "Bungee Jumping",
        price: "₹3,500",
        unit: "per person",
        icon: <CheckCircle size={24} />,
        features: ["Highest Safety Standards", "Video Included", "Thrilling Experience"],
        isFixedPrice: false
    },
    {
        id: 3,
        category: "Adventure",
        title: "Full Day Trekking",
        price: "₹2,000",
        unit: "per group (Guide Fee)", // Label change kiya taaki clear rahe
        icon: <Mountain size={24} />,
        features: ["Guided Tour", "Hidden Waterfalls", "Packed Lunch"],
        isFixedPrice: true // FIX RATE (Guests badhne par paise nahi badhenge)
    },
    {
        id: 4,
        category: "Adventure",
        title: "Sky Cycling",
        price: "₹1,500",
        unit: "per person",
        icon: <Wind size={24} />,
        features: ["Safety Harness", "Valley View", "Unique Photo Op"],
        isFixedPrice: false
    },

    // --- STAYS (Fixed Rate) ---
    {
        id: 5,
        category: "Stays",
        title: "Camping (4 Pax Tent)",
        price: "₹2,000",
        unit: "per tent",
        icon: <Tent size={24} />,
        features: ["Bonfire", "Dinner + Breakfast", "Music & Vibes"],
        popular: true,
        isFixedPrice: true // FIX RATE
    },
    {
        id: 6,
        category: "Stays",
        title: "Budget Room",
        price: "₹1,500",
        unit: "per night",
        icon: <Home size={24} />,
        features: ["Clean Bed", "Hot Water", "Near Landing Site"],
        isFixedPrice: true // FIX RATE
    },
    {
        id: 7,
        category: "Stays",
        title: "Standard Room",
        price: "₹2,500",
        unit: "per night",
        icon: <Home size={24} />,
        features: ["Balcony View", "WiFi", "Room Service"],
        isFixedPrice: true // FIX RATE
    },
    {
        id: 8,
        category: "Stays",
        title: "Premium Family Suite",
        price: "₹4,000",
        unit: "per night",
        icon: <Home size={24} />,
        features: ["Luxury Interiors", "Best View", "King Size Bed"],
        isFixedPrice: true // FIX RATE
    },

    // --- RENTALS (Per Bike = Per Unit) ---
    // Note: Isko maine 'Multiply' rakha hai kyunki agar 2 bikes chahiye toh double paisa lagega.
    // Agar tujhe bike bhi fix karni hai toh bata dena.
    {
        id: 9,
        category: "Rentals",
        title: "Scooty Rental",
        price: "₹700",
        unit: "per day",
        icon: <Bike size={24} />,
        features: ["Good Condition", "Helmet Included", "No Deposit"],
        isFixedPrice: false
    },
    {
        id: 10,
        category: "Rentals",
        title: "Bike Rental (Himalayan)",
        price: "₹1,500",
        unit: "per day",
        icon: <Bike size={24} />,
        features: ["Mountain Ready", "Helmet Included", "Well Maintained"],
        isFixedPrice: false
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

const Services = () => {
    const PHONE_NUMBER = "919999999999";

    // State for Modal
    const [selectedService, setSelectedService] = useState(null);
    const [name, setName] = useState("");
    const [guests, setGuests] = useState(1);
    const [date, setDate] = useState("");

    // Helper to get numeric price
    const getNumericPrice = (priceStr) => {
        return parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
    };

    const handleOpenModal = (service) => {
        setSelectedService(service);
        setGuests(1);
        setName("");
        setDate("");
    };

    const handleCloseModal = () => {
        setSelectedService(null);
    };

    const handleFinalBook = () => {
        if (!name) {
            alert("Please enter your name!");
            return;
        }

        // --- NEW LOGIC START ---
        // Agar 'isFixedPrice' true hai, toh multiply mat karo.
        const basePrice = getNumericPrice(selectedService.price);
        const totalPrice = selectedService.isFixedPrice
            ? basePrice
            : basePrice * guests;
        // --- NEW LOGIC END ---

        const message = `
*NEW BOOKING REQUEST* 🚀
-------------------------
👤 *Name:* ${name}
📦 *Service:* ${selectedService.title}
👥 *Guests/Qty:* ${guests}
📅 *Date:* ${date || "Not Specified"}
💰 *Base Rate:* ${selectedService.price}
💵 *Est. Total:* ₹${totalPrice.toLocaleString()}
-------------------------
Hi Pawan, please confirm availability.
        `.trim();

        window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
        handleCloseModal();
    };

    return (
        <section id="services" className="py-24 bg-gradient-to-b from-slate-50 to-slate-100 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-sky-100 text-sky-600 text-xs font-bold uppercase tracking-wider mb-4">
                        Everything in Bir
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                        Adventure. Stays. <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">Rentals.</span>
                    </h2>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {services.map((service) => (
                        <motion.div
                            key={service.id}
                            variants={cardVariants}
                            whileHover={{ y: -10 }}
                            className={`relative bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-2xl border transition-all group ${service.popular ? 'border-sky-500/50 shadow-sky-500/20' : 'border-white/50 shadow-slate-200/50'}`}
                        >
                            {service.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-4 rounded-2xl transition-colors ${service.popular ? 'bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-900 group-hover:text-white'}`}>
                                    {service.icon}
                                </div>
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full">
                                    {service.category}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-3xl font-black text-slate-900">{service.price}</span>
                                <span className="text-sm text-slate-500 font-medium">/ {service.unit}</span>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {service.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                                        <CheckCircle size={16} className="text-sky-500" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleOpenModal(service)}
                                className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 ${service.popular ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white hover:shadow-sky-500/40' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                            >
                                Book Now <ArrowRight size={18} />
                            </button>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* POPUP MODAL */}
            <AnimatePresence>
                {selectedService && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseModal}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 50 }}
                            className="relative bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-sky-500 to-indigo-600 z-0" />

                            <button
                                onClick={handleCloseModal}
                                className="absolute top-4 right-4 z-20 bg-black/20 text-white p-2 rounded-full hover:bg-black/40 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="relative z-10 pt-4">
                                <div className="bg-white/10 backdrop-blur-md inline-block px-4 py-1 rounded-full text-white/90 text-xs font-bold mb-4 border border-white/20">
                                    {selectedService.category}
                                </div>
                                <h3 className="text-2xl font-black text-white mb-1">{selectedService.title}</h3>
                                <p className="text-white/80 text-sm mb-8">{selectedService.price} / {selectedService.unit}</p>

                                <div className="bg-white rounded-2xl p-2 space-y-4">

                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-100 transition-all">
                                        <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1 mb-1">
                                            <User size={12} /> Your Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Ex: Amit Sharma"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-transparent font-bold text-slate-800 outline-none placeholder:font-normal"
                                        />
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-100 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-100 transition-all">
                                            <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1 mb-1">
                                                <Users size={12} /> Guests
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                value={guests}
                                                onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                                                className="w-full bg-transparent font-bold text-slate-800 outline-none"
                                            />
                                        </div>

                                        <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-100 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-100 transition-all">
                                            <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1 mb-1">
                                                <Calendar size={12} /> Date
                                            </label>
                                            <input
                                                type="date"
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                                className="w-full bg-transparent font-bold text-slate-800 outline-none text-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Total Price Calculation Logic */}
                                    <div className="bg-indigo-50 p-4 rounded-xl flex justify-between items-center border border-indigo-100 mt-4">
                                        <span className="text-indigo-600 font-bold text-sm">Estimated Total</span>
                                        <span className="text-2xl font-black text-indigo-700">
                                            {/* Agar fixed hai to same rate dikhao, varna multiply karo */}
                                            ₹{(selectedService.isFixedPrice
                                                ? getNumericPrice(selectedService.price)
                                                : getNumericPrice(selectedService.price) * guests
                                            ).toLocaleString()}
                                        </span>
                                    </div>

                                    <button
                                        onClick={handleFinalBook}
                                        className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold text-lg shadow-xl hover:bg-sky-500 transition-colors flex items-center justify-center gap-2 mt-4"
                                    >
                                        Confirm on WhatsApp <ArrowRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Services;