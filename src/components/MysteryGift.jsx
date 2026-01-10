import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Copy, Check, Ticket, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti'; // Install: npm install canvas-confetti

const rewards = [
    { id: 1, title: "Free GoPro Video", code: "GOPRO-FREE", desc: "Worth ₹500. Capture your flight!", color: "text-blue-500" },
    { id: 2, title: "Lucky ₹1 Deal", code: "₹1", desc: "You Won ₹1", color: "text-yellow-500" },
    { id: 3, title: "Free Cab Ride", code: "FREE-RIDE", color: "text-emerald-500" }
];

const MysteryGift = ({ onClose }) => {
    const [isScratched, setIsScratched] = useState(false);
    const [reward, setReward] = useState(null);
    const [copied, setCopied] = useState(false);

    // Load saved state or pick random
    useEffect(() => {
        const savedIndex = localStorage.getItem('mystery_reward_index');

        if (savedIndex !== null) {
            // Already played
            setReward(rewards[parseInt(savedIndex)]);
            setIsScratched(true);
        } else {
            // New player - pick random but don't reveal yet
            const randomIndex = Math.floor(Math.random() * rewards.length);
            setReward(rewards[randomIndex]);
        }
    }, []);

    // Drag Logic
    const constraintsRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Holographic Foil Effect based on drag position
    const background = useTransform(
        x,
        [-150, 0, 150],
        [
            "linear-gradient(135deg, #0ea5e9, #6366f1, #ec4899)", // Sky -> Indigo -> Pink
            "linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)", // Blue -> Violet -> Cyan
            "linear-gradient(135deg, #0ea5e9, #6366f1, #ec4899)"
        ]
    );

    const handleDragEnd = (event, info) => {
        if (Math.abs(info.offset.x) > 100 || Math.abs(info.offset.y) > 80) {
            triggerWin();
        }
    };

    const triggerWin = () => {
        setIsScratched(true);

        // Save to LocalStorage to prevent re-play
        const rewardIndex = rewards.findIndex(r => r.id === reward.id);
        localStorage.setItem('mystery_reward_index', rewardIndex);

        // Confetti Blast 🎊
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#0ea5e9', '#6366f1', '#f43f5e'],
            zIndex: 1000 // Higher z-index for modal
        });
    };

    const copyCode = () => {
        if (reward) {
            navigator.clipboard.writeText(reward.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 transition-colors z-[110]"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>

            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white border border-slate-200 rounded-3xl p-6 md:p-12 max-w-5xl w-full relative overflow-hidden shadow-2xl"
            >

                {/* Ambient Background Glows (Subtler for Light Mode) */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-100 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-100 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />

                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.4]"
                    style={{ backgroundImage: 'linear-gradient(#f1f5f9 1px, transparent 1px), linear-gradient(90deg, #f1f5f9 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-16">

                    {/* Text Content */}
                    <div className="text-center md:text-left flex-1">
                        <div>
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-100 text-sky-600 text-xs font-bold tracking-widest uppercase mb-6">
                                <Sparkles size={14} className="animate-pulse" /> Mystery Loot Box
                            </span>

                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
                                Unlock Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 animate-gradient-x">Secret Reward</span>
                            </h2>

                            <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
                                We've hidden an exclusive deal just for you. Scratch the holographic card to reveal your lucky coupon!
                            </p>

                            {!isScratched && (
                                <div className="flex items-center justify-center md:justify-start gap-3 text-sm text-slate-500 font-medium">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center animate-bounce">
                                        👆
                                    </div>
                                    Swipe firmly to scratch
                                </div>
                            )}
                        </div>
                    </div>

                    {/* THE SCRATCH CARD AREA */}
                    <div className="relative w-72 h-[380px] md:w-80 md:h-[420px] flex-shrink-0 perspective-1000" ref={constraintsRef}>

                        {/* Glowing Aura Behind Card */}
                        <div className={`absolute inset-0 bg-gradient-to-br from-sky-500 to-purple-600 blur-3xl opacity-40 transition-opacity duration-1000 ${isScratched ? 'opacity-60 scale-110' : 'opacity-40'}`} />

                        {/* 1. REVEALED REWARD (The Inside) */}
                        <div className="absolute inset-0 bg-[#1e293b] rounded-[2rem] p-8 flex flex-col items-center justify-center text-center shadow-2xl overflow-hidden border border-white/10 z-10">

                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={isScratched ? { scale: 1, opacity: 1 } : {}}
                                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                className="w-20 h-20 bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-sky-500/30 rotate-3"
                            >
                                <Ticket size={40} className="text-white" />
                            </motion.div>

                            <h3 className="text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">Congratulations!</h3>
                            <h2 className="text-2xl font-black text-white mb-3 leading-tight">
                                {reward?.title}
                            </h2>
                            <p className="text-slate-400 text-sm mb-8 px-2">
                                {reward?.desc}
                            </p>

                            {/* Code Box */}
                            <button
                                onClick={copyCode}
                                className="w-full bg-[#0f172a] border border-dashed border-slate-600 hover:border-sky-500 rounded-xl p-4 flex items-center justify-between group transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="text-left relative z-10">
                                    <span className="text-[10px] text-slate-500 block uppercase font-bold mb-1">Coupon Code</span>
                                    <span className={`font-mono font-bold text-xl ${reward?.color || 'text-white'}`}>{reward?.code}</span>
                                </div>
                                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-sky-400 group-hover:bg-sky-500/10 transition-colors z-10">
                                    {copied ? <Check size={20} /> : <Copy size={20} />}
                                </div>

                                {/* Copy Success Flash */}
                                {copied && <motion.div layoutId="flash" className="absolute inset-0 bg-sky-500/10" />}
                            </button>

                            <p className="text-[10px] text-slate-500 mt-4 flex items-center gap-1">
                                <PartyPopper size={12} /> Use this code at checkout
                            </p>
                        </div>

                        {/* 2. SCRATCH COVER (The Foil) */}
                        <AnimatePresence>
                            {!isScratched && (
                                <motion.div
                                    drag
                                    dragConstraints={constraintsRef}
                                    dragElastic={0.2}
                                    onDragEnd={handleDragEnd}
                                    exit={{ opacity: 0, scale: 1.5, rotate: -15, filter: "blur(20px)" }}
                                    transition={{ duration: 0.6, ease: "circOut" }}
                                    style={{ background }}
                                    className="absolute inset-0 rounded-[2rem] cursor-grab active:cursor-grabbing flex flex-col items-center justify-center shadow-2xl z-20 border-t border-white/30 backdrop-blur-sm"
                                >
                                    {/* Foil Texture */}
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40 mix-blend-overlay"></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                                    <Gift size={72} className="text-white drop-shadow-2xl mb-6 animate-bounce" />
                                    <h3 className="text-3xl font-black text-white drop-shadow-lg uppercase tracking-wider">
                                        Scratch Me
                                    </h3>
                                    <p className="text-white/90 text-sm mt-2 font-medium tracking-wide">
                                        Swipe to Unlock Reward
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default MysteryGift;