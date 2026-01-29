import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Copy, X, Ticket, ArrowRight, LockOpen } from 'lucide-react';

const MysteryGift = ({ onBookClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState('idle'); // 'idle' | 'opening' | 'revealed'
    const [offer, setOffer] = useState(null);

    useEffect(() => {
        const savedOffer = localStorage.getItem('mysteryGiftOffer');
        const hasClaimed = localStorage.getItem('mysteryGiftClaimed');

        if (savedOffer) {
            setOffer(JSON.parse(savedOffer));
            if (hasClaimed) setStatus('revealed');
        } else {
            const offers = [
                { code: "FLY-500", title: "₹500 OFF", desc: "Flat discount on Paragliding" },
                { code: "FREE-GOPRO", title: "FREE GoPro", desc: "Get HD Video Worth ₹500" },
                { code: "CAB-100", title: "Free Pickup", desc: "From Bir Bus Stand" }
            ];
            const newOffer = offers[Math.floor(Math.random() * offers.length)];
            setOffer(newOffer);
            localStorage.setItem('mysteryGiftOffer', JSON.stringify(newOffer));
        }

        // Auto Open for new users
        if (!hasClaimed) {
            const timer = setTimeout(() => setIsOpen(true), 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleBoxClick = () => {
        if (status === 'revealed') return;
        setStatus('opening');
        localStorage.setItem('mysteryGiftClaimed', 'true');

        setTimeout(() => {
            setStatus('revealed');
            triggerExplosion();
        }, 1500);
    };

    const triggerExplosion = () => {
        const colors = ['#0ea5e9', '#38bdf8', '#0284c7', '#3b82f6'];
        confetti({ particleCount: 250, spread: 120, origin: { y: 0.6 }, colors });
    };

    const handleClaim = () => {
        if (offer) {
            // 2. Close Modal
            setIsOpen(false);

            // 3. Open Booking Modal with Code
            if (onBookClick) {
                onBookClick({ coupon: offer.code });
            }
        }
    };

    if (!offer) return null;

    return (
        <>
            {/* FLOATING BUTTON */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 left-6 z-50 group"
                    >
                        <div className="absolute inset-0 bg-sky-500 rounded-full blur-xl opacity-40 group-hover:opacity-70 animate-pulse"></div>
                        <div className="relative bg-slate-900 border border-slate-700 p-4 rounded-full flex items-center gap-3 shadow-2xl">
                            <Gift className="text-sky-400" size={24} />
                            <div className="text-left hidden md:block">
                                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">You Won!</p>
                                <p className="text-white font-bold text-xs">View Prize</p>
                            </div>
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* MODAL */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
                        />

                        {/* Card */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[450px]"
                        >

                            {/* Close Button */}
                            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 z-20 p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors">
                                <X size={20} className="text-slate-500" />
                            </button>

                            {/* LEFT SIDE: Text */}
                            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-slate-50">
                                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-wider mb-6">
                                        <Ticket size={14} /> Guaranteed Prize
                                    </span>

                                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                                        You've Won a <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Mystery Gift!</span>
                                    </h2>

                                    <p className="text-slate-500 text-lg leading-relaxed max-w-md">
                                        We randomly selected you for an exclusive reward. Tap the box to reveal your prize immediately.
                                    </p>
                                </motion.div>
                            </div>

                            {/* RIGHT SIDE: Action */}
                            <div className="flex-1 bg-slate-900 p-8 md:p-12 flex items-center justify-center relative overflow-hidden">

                                {/* Glows */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/20 rounded-full blur-[80px]"></div>
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]"></div>

                                <div className="relative w-full max-w-xs">

                                    {/* STATE 1: LOCKED (Tap to Open) */}
                                    {status === 'idle' && (
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            onClick={handleBoxClick}
                                            className="cursor-pointer bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-3xl p-8 text-center group"
                                        >
                                            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/30 mb-6 group-hover:rotate-6 transition-transform animate-bounce">
                                                <Gift size={64} className="text-white" />
                                            </div>
                                            <h3 className="text-white font-bold text-xl mb-2">Tap to Reveal</h3>
                                            <p className="text-slate-400 text-sm">Click to see what you won!</p>
                                        </motion.div>
                                    )}

                                    {/* STATE 2: OPENING */}
                                    {status === 'opening' && (
                                        <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 0.5 }} className="text-center">
                                            <div className="w-32 h-32 mx-auto bg-sky-500 rounded-full blur-3xl opacity-50 absolute inset-0 m-auto"></div>
                                            <LockOpen size={80} className="text-white relative z-10 mx-auto" />
                                            <p className="text-sky-400 font-bold mt-8 animate-pulse">REVEALING PRIZE...</p>
                                        </motion.div>
                                    )}

                                    {/* STATE 3: REVEALED (Claim & Book) */}
                                    {status === 'revealed' && (
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="bg-slate-800 rounded-[2rem] p-6 text-center border border-slate-700 shadow-2xl"
                                        >
                                            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/40 mb-4 -mt-10">
                                                <Ticket size={32} className="text-white" />
                                            </div>

                                            <p className="text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">CONGRATULATIONS!</p>
                                            <h3 className="text-2xl font-black text-white mb-2 leading-none">{offer.title}</h3>
                                            <p className="text-slate-400 text-xs mb-6">{offer.desc}</p>

                                            <div className="bg-slate-900 border border-dashed border-slate-700 rounded-xl p-3 mb-6 relative">
                                                <p className="text-slate-500 text-[10px] uppercase font-bold mb-1">Your Coupon Code</p>
                                                <code className="text-xl font-mono font-bold text-white tracking-widest">{offer.code}</code>
                                            </div>

                                            <button
                                                onClick={handleClaim}
                                                className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-sky-900/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                                            >
                                                Claim & Book Now <ArrowRight size={18} />
                                            </button>


                                        </motion.div>
                                    )}

                                </div>
                            </div>

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MysteryGift;