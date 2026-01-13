import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Copy, X, Sparkles, Lock, Star, Upload, CheckCircle } from 'lucide-react';

const MysteryGift = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState('idle'); // 'idle' | 'review_needed' | 'uploading' | 'opening' | 'revealed'
    const [screenshot, setScreenshot] = useState(null);
    const [offer, setOffer] = useState(null);

    // GMB Link (Replace this with your actual Google Maps Link)
    const GMB_LINK = "https://goo.gl/maps/YOUR_REAL_LINK_HERE";

    // Initialize (Load from LocalStorage)
    useEffect(() => {
        // 1. Check if user already has an assigned offer
        const savedOffer = localStorage.getItem('mysteryGiftOffer');
        const hasClaimed = localStorage.getItem('mysteryGiftClaimed');

        if (savedOffer) {
            setOffer(JSON.parse(savedOffer));
            if (hasClaimed) {
                setStatus('revealed'); // Show revealed state if already claimed
            }
        } else {
            // 2. Assign a NEW random offer for this user
            const offers = [
                { code: "FLY500", title: "₹500 OFF", desc: "On Paragliding Combo" },
                { code: "FREE-GOPRO", title: "FREE GoPro", desc: "Capture your flight in HD" },
                { code: "CAMP-1", title: "Camping @ ₹1", desc: "Pay ₹1 for night stay" },
                { code: "TAXIFREE", title: "Free Taxi", desc: "Drop to Landing Site" }
            ];
            const newOffer = offers[Math.floor(Math.random() * offers.length)];
            setOffer(newOffer);
            localStorage.setItem('mysteryGiftOffer', JSON.stringify(newOffer));
        }

        // 3. Auto-Open popup for new users
        if (!hasClaimed) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleBoxClick = () => {
        if (status === 'revealed') return;
        setStatus('review_needed');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setScreenshot(URL.createObjectURL(file));
            setStatus('ready_to_open');
        }
    };

    const handleFinalUnlock = () => {
        if (status !== 'ready_to_open') return;

        setStatus('opening');

        // Mark as claimed in storage
        localStorage.setItem('mysteryGiftClaimed', 'true');

        setTimeout(() => {
            setStatus('revealed');
            triggerExplosion();
        }, 1500);
    };

    const triggerExplosion = () => {
        const colors = ['#a786ff', '#fd8bbc', '#eca184', '#f8deb1'];
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
            colors: colors,
            zIndex: 9999
        });
    };

    const copyCode = () => {
        if (offer) {
            navigator.clipboard.writeText(offer.code);
            alert("Code Copied!");
        }
    };

    if (!offer) return null; // Wait for initialization

    return (
        <>
            {/* 1. FLOATING TRIGGER BUTTON (Hidden if revealed/claimed to avoid annoyance, or keep it?) */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 left-6 z-[90] group"
                    >
                        {/* Glowing Ring */}
                        <div className="absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-50 group-hover:opacity-100 animate-pulse"></div>

                        {/* Button Icon */}
                        <div className="relative bg-black border border-purple-500/50 p-4 rounded-full flex items-center gap-3 shadow-2xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-transparent"></div>
                            <Gift className="text-purple-400 relative z-10" size={28} />
                            <div className="hidden md:block text-left relative z-10">
                                <p className="text-[10px] text-purple-300 uppercase font-bold tracking-wider">Secret Loot</p>
                                <p className="text-slate-200 font-bold text-xs">{status === 'revealed' ? 'View Reward' : 'Tap to Open'}</p>
                            </div>
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* 2. MODAL POPUP */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

                        {/* Dark Blur Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* MAIN CONTAINER */}
                        <div className="relative z-10 w-full max-w-sm aspect-[4/5] flex flex-col items-center justify-center">

                            {/* Close Button */}
                            <button onClick={() => setIsOpen(false)} className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors">
                                <X size={32} />
                            </button>

                            {/* === STAGE 1: LOCKED BOX === */}
                            {(status === 'idle' || status === 'opening') && (
                                <motion.div
                                    animate={status === 'opening' ? {
                                        x: [-5, 5, -5, 5, 0],
                                        rotate: [-2, 2, -2, 2, 0],
                                        scale: [1, 1.1, 1.2]
                                    } : { y: [0, -10, 0] }}
                                    transition={status === 'opening' ? { duration: 0.5, repeat: 3 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    onClick={handleBoxClick}
                                    className="cursor-pointer group relative"
                                >
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600 rounded-full blur-[80px] opacity-40 group-hover:opacity-60 transition-opacity"></div>
                                    <div className="relative w-48 h-48 bg-gradient-to-br from-indigo-900 to-black rounded-3xl border-2 border-purple-500/50 flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.5)] group-hover:scale-105 transition-transform duration-300">
                                        <Gift size={80} className="text-purple-400 drop-shadow-lg" />
                                        <div className="absolute -bottom-4 bg-black border border-purple-500 text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-2 shadow-xl">
                                            <Lock size={12} /> TAP TO UNLOCK
                                        </div>
                                    </div>
                                    <p className="text-purple-200 text-center mt-8 font-bold tracking-widest text-sm animate-pulse">
                                        {status === 'opening' ? 'OPENING...' : 'TAP THE BOX!'}
                                    </p>
                                </motion.div>
                            )}

                            {/* === STAGE 2: REVIEW & UPLOAD TASK === */}
                            {(status === 'review_needed' || status === 'ready_to_open') && (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="bg-[#0f172a] w-full p-6 rounded-3xl border border-slate-700 shadow-2xl relative overflow-hidden"
                                >
                                    <div className="text-center mb-6">
                                        <div className="w-12 h-12 bg-yellow-500/20 text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Star fill="currentColor" size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold text-white">One Small Step!</h3>
                                        <p className="text-slate-400 text-sm">Unlock your mystery gift by supporting us.</p>
                                    </div>

                                    <div className="space-y-4">
                                        {/* Step 1: Link */}
                                        <a
                                            href={GMB_LINK}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full bg-slate-800 hover:bg-slate-700 p-4 rounded-xl text-left transition-colors border border-slate-700 group"
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs font-bold text-slate-400 uppercase">Step 1</span>
                                                <Star size={14} className="text-yellow-500" />
                                            </div>
                                            <p className="text-white font-bold text-sm group-hover:text-sky-400 transition-colors">Rate us 5 Stars on Google Maps</p>
                                        </a>

                                        {/* Step 2: Upload */}
                                        <div className="relative group">
                                            <div className="flex items-center justify-between mb-1 px-1">
                                                <span className="text-xs font-bold text-slate-400 uppercase">Step 2</span>
                                                {screenshot && <CheckCircle size={14} className="text-green-500" />}
                                            </div>
                                            <label className={`block w-full p-4 rounded-xl border-2 border-dashed cursor-pointer transition-all ${screenshot ? 'border-green-500/50 bg-green-500/10' : 'border-slate-700 hover:border-purple-500/50 hover:bg-slate-800'}`}>
                                                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-full ${screenshot ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                                                        <Upload size={18} />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className={`text-sm font-bold ${screenshot ? 'text-green-400' : 'text-slate-300'}`}>
                                                            {screenshot ? 'Screenshot Added' : 'Upload Screenshot'}
                                                        </p>
                                                        <p className="text-[10px] text-slate-500">Proof of your review</p>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>

                                        {/* Unlock Button */}
                                        <button
                                            onClick={handleFinalUnlock}
                                            disabled={status !== 'ready_to_open'}
                                            className={`w-full py-4 rounded-xl font-bold text-sm shadow-lg transition-all ${status === 'ready_to_open'
                                                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:scale-105 shadow-purple-900/40'
                                                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                                }`}
                                        >
                                            {status === 'ready_to_open' ? 'UNLOCK GIFT NOW 🔓' : 'Complete Steps to Unlock'}
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* === STAGE 3: REVEALED REWARD === */}
                            {status === 'revealed' && (
                                <motion.div
                                    initial={{ scale: 0, rotate: -10 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    className="w-full bg-gradient-to-b from-slate-800 to-black p-1 rounded-[2rem] shadow-2xl relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_deg,rgba(168,85,247,0.1)_20deg,transparent_40deg)] animate-spin-slow opacity-50"></div>
                                    </div>

                                    <div className="bg-[#0f172a] rounded-[1.8rem] p-8 text-center relative border border-white/10">
                                        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                                            <span className="inline-block bg-yellow-500/20 text-yellow-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 border border-yellow-500/50">
                                                Reward Unlocked
                                            </span>
                                            <h2 className="text-4xl font-black text-white mb-2 leading-none drop-shadow-lg">{offer.title}</h2>
                                            <p className="text-slate-400 text-sm mb-8">{offer.desc}</p>

                                            <div onClick={copyCode} className="bg-black border border-dashed border-purple-500/50 rounded-xl p-4 mb-6 cursor-pointer hover:bg-white/5 transition-colors group relative">
                                                <code className="text-2xl font-mono font-bold text-purple-400">{offer.code}</code>
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 group-hover:text-white transition-colors">
                                                    <Copy size={16} />
                                                </div>
                                            </div>

                                            <a
                                                href={`https://wa.me/919999999999?text=I unlocked ${offer.code} from the loot box! Screenshot attached.`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="block w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-900/40 hover:scale-[1.02] active:scale-95 transition-all"
                                            >
                                                Claim Reward 🚀
                                            </a>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}

                        </div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MysteryGift;