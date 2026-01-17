import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Star, MapPin, Wifi, Coffee, Mountain, ArrowRight, Zap, X, Calendar, User, CheckCircle } from 'lucide-react';

// Images Import (Ensure these exist in src/assets)
const flyersImg = '/unnamed.webp';
const pinkParkImg = '/hotel1.webp';
const roomImg = '/room1.webp';

// --- DATA CONFIGURATION ---
const staysData = [
    {
        id: 1,
        name: "Flyers Paradise",
        tag: "Premium Stay",
        location: "Landing Site Road",
        price: 3500, // Number for calculation
        displayPrice: "₹3,500",
        rating: 4.9,
        images: [
            flyersImg, // Uploaded Image
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"
        ],
        amenities: [
            { icon: <Mountain size={14} />, label: "Mountain View" },
            { icon: <Wifi size={14} />, label: "High Speed WiFi" },
        ],
        desc: "Luxury rooms right next to the landing site. Watch gliders land from your balcony."
    },
    {
        id: 2,
        name: "Pink Park",
        tag: "Luxury View",
        location: "Chaugan Road",
        price: 3000,
        displayPrice: "₹3,000",
        rating: 4.8,
        images: [
            pinkParkImg, // Uploaded Image (Night View)
            roomImg,     // Uploaded Image (Room)
        ],
        amenities: [
            { icon: <Coffee size={14} />, label: "Rooftop Cafe" },
            { icon: <Zap size={14} />, label: "Power Backup" },
        ],
        desc: "Famous for its panoramic views and premium hospitality. Best sunset point in Bir."
    },
    {
        id: 3,
        name: "Sky Candy",
        tag: "Budget & Vibes",
        location: "Tibetan Colony",
        price: 1500,
        displayPrice: "₹1,500",
        rating: 4.7,
        images: [
            "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=800", // Camping/Tent generic
            "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=800"
        ],
        amenities: [
            { icon: <Mountain size={14} />, label: "Camping" },
            { icon: <Wifi size={14} />, label: "Bonfire" },
        ],
        desc: "Experience nature with comfortable camping. Perfect for groups and budget travelers."
    }
];

const Stays = () => {
    const [selectedStay, setSelectedStay] = useState(null); // For Booking Modal

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <span className="inline-flex items-center gap-2 text-sky-600 font-bold tracking-wider uppercase text-xs bg-sky-100 px-4 py-2 rounded-full">
                            <Zap size={14} fill="currentColor" /> Handpicked Stays
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mt-4">
                            Stay & <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Fly.</span>
                        </h2>
                    </div>
                    <p className="text-slate-500 max-w-sm text-lg leading-relaxed text-right md:text-left">
                        Choose your base. Add Paragliding to your package for the ultimate deal.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
                    {staysData.map((stay, index) => (
                        <StayCard3D
                            key={stay.id}
                            stay={stay}
                            index={index}
                            onBookClick={() => setSelectedStay(stay)}
                        />
                    ))}
                </div>
            </div>

            {/* Booking Modal */}
            <AnimatePresence>
                {selectedStay && (
                    <BookingModal stay={selectedStay} onClose={() => setSelectedStay(null)} />
                )}
            </AnimatePresence>
        </section>
    );
};

// --- 3D CARD COMPONENT ---
const StayCard3D = ({ stay, index, onBookClick }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Motion hooks for tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-100, 100], [5, -5]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-100, 100], [-5, 5]), { stiffness: 150, damping: 20 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(((mouseX / width) - 0.5) * 200);
        y.set(((mouseY / height) - 0.5) * 200);
    };

    // Auto Image Slider
    useEffect(() => {
        let interval;
        if (isHovered) {
            interval = setInterval(() => {
                setCurrentImage((prev) => (prev + 1) % stay.images.length);
            }, 2000);
        }
        return () => clearInterval(interval);
    }, [isHovered, stay.images.length]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); x.set(0); y.set(0); setCurrentImage(0); }}
            className="group relative h-[450px] w-full bg-white rounded-[2rem] shadow-xl border border-slate-200 cursor-pointer"
        >
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden flex flex-col" style={{ transform: "translateZ(20px)" }}>
                {/* Image Section */}
                <div className="relative h-[60%] w-full overflow-hidden bg-slate-100">
                    <AnimatePresence mode='wait'>
                        <motion.img
                            key={currentImage}
                            src={stay.images[currentImage]}
                            alt={stay.name}
                            initial={{ opacity: 0.8, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

                    <div className="absolute top-5 left-5 right-5 flex justify-between items-start z-10">
                        <span className="bg-white/90 backdrop-blur-md text-slate-800 px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm">
                            {stay.tag}
                        </span>
                        <div className="bg-white text-slate-900 px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1 shadow-lg">
                            <Star size={12} className="text-amber-500 fill-amber-500" /> {stay.rating}
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="h-[40%] w-full bg-white p-6 flex flex-col justify-between relative z-10">
                    {/* Floating Price */}
                    <div className="absolute -top-6 right-6 z-50 transform translate-z-30">
                        <div className="bg-sky-500 text-white px-4 py-3 rounded-2xl font-bold shadow-lg shadow-sky-500/30 border-4 border-white group-hover:scale-110 transition-all">
                            {stay.displayPrice}
                        </div>
                    </div>

                    <div className="mt-2">
                        <h3 className="text-2xl font-black text-slate-900 mb-1 group-hover:text-sky-600 transition-colors">
                            {stay.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mb-3">
                            <MapPin size={12} className="text-sky-500" /> {stay.location}
                        </div>
                        <p className="text-slate-500 text-sm line-clamp-2">{stay.desc}</p>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex gap-2">
                            {stay.amenities.map((item, i) => (
                                <div key={i} className="bg-slate-50 border border-slate-100 text-slate-500 px-2 py-1 rounded-lg text-[10px] flex items-center gap-1 font-semibold">
                                    {item.icon} {item.label}
                                </div>
                            ))}
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); onBookClick(); }} className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-sky-500 transition-colors shadow-lg">
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// --- BOOKING MODAL (PACKAGE CALCULATOR) ---
const BookingModal = ({ stay, onClose }) => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [guests, setGuests] = useState(2);
    const [addParagliding, setAddParagliding] = useState(false);

    const paraglidingPrice = 3000;
    const roomTotal = stay.price; // Per night standard
    const gliderTotal = addParagliding ? (paraglidingPrice * guests) : 0;
    const grandTotal = roomTotal + gliderTotal;

    const handleWhatsApp = () => {
        const message = `Hi Local Bir! I want to book a package.%0A%0A*Stay:* ${stay.name} (${stay.displayPrice})%0A*Name:* ${name}%0A*Date:* ${date}%0A*Guests:* ${guests}%0A*Paragliding:* ${addParagliding ? `Yes (${guests} Pax)` : 'No'}%0A%0A*Total Est:* ₹${grandTotal}`;
        window.open(`https://wa.me/91XXXXXXXXXX?text=${message}`, '_blank');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
                    <div>
                        <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">Booking Request</p>
                        <h3 className="text-2xl font-black">{stay.name}</h3>
                    </div>
                    <button onClick={onClose} className="bg-white/10 p-2 rounded-full hover:bg-white/20"><X size={20} /></button>
                </div>

                <div className="p-6 space-y-4">
                    {/* Inputs */}
                    <div className="space-y-3">
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-3">
                            <User size={18} className="text-slate-400" />
                            <input type="text" placeholder="Your Name" className="bg-transparent w-full outline-none text-slate-700 font-medium" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="flex gap-3">
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-3 flex-1">
                                <Calendar size={18} className="text-slate-400" />
                                <input type="date" className="bg-transparent w-full outline-none text-slate-700 font-medium text-sm" value={date} onChange={e => setDate(e.target.value)} />
                            </div>
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-3 w-24">
                                <User size={18} className="text-slate-400" />
                                <input type="number" min="1" max="10" className="bg-transparent w-full outline-none text-slate-700 font-medium" value={guests} onChange={e => setGuests(parseInt(e.target.value))} />
                            </div>
                        </div>
                    </div>

                    {/* Add-ons (The Package Part) */}
                    <div
                        onClick={() => setAddParagliding(!addParagliding)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${addParagliding ? 'border-sky-500 bg-sky-50' : 'border-slate-100 hover:border-sky-200'}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${addParagliding ? 'border-sky-500 bg-sky-500' : 'border-slate-300'}`}>
                                {addParagliding && <CheckCircle size={14} className="text-white" />}
                            </div>
                            <div>
                                <p className="font-bold text-slate-800">Add Paragliding</p>
                                <p className="text-xs text-slate-500">₹3,000 per person</p>
                            </div>
                        </div>
                        <span className="text-sky-600 font-bold">+₹{3000 * guests}</span>
                    </div>

                    {/* Total & Action */}
                    <div className="border-t border-slate-100 pt-4 mt-2">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-slate-500 font-medium">Total Estimate</span>
                            <span className="text-3xl font-black text-slate-900">₹{grandTotal.toLocaleString()}</span>
                        </div>
                        <button
                            onClick={handleWhatsApp}
                            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-green-200"
                        >
                            Confirm on WhatsApp <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Stays;