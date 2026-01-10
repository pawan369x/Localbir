import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Heart, Coffee, RefreshCcw, CheckCircle2, ArrowRight, User, Users } from 'lucide-react';

const questions = [
    {
        id: 1,
        question: "Who are you traveling with?",
        options: [
            { text: "Solo Adventure", type: "solo", icon: <User size={28} />, color: "from-blue-500 to-cyan-500" },
            { text: "Couple / Partner", type: "couple", icon: <Heart size={28} />, color: "from-pink-500 to-rose-500" },
            { text: "Squad Goals", type: "group", icon: <Users size={28} />, color: "from-amber-500 to-orange-500" },
            { text: "Family Fun", type: "family", icon: "👨‍👩‍👧‍👦", color: "from-emerald-500 to-green-500" }
        ]
    },
    {
        id: 2,
        question: "How much adrenaline do you crave?",
        options: [
            { text: "Extreme! No Fear.", type: "high", icon: <Zap size={28} />, color: "from-red-500 to-orange-600" },
            { text: "Excited but Safe.", type: "med", icon: "😬", color: "from-blue-500 to-indigo-600" },
            { text: "Chill Vibes Only.", type: "low", icon: <Coffee size={28} />, color: "from-teal-400 to-emerald-500" }
        ]
    }
];

const TripQuiz = ({ onBookClick }) => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);

    const handleAnswer = (option) => {
        const newAnswers = [...answers, option];
        setAnswers(newAnswers);

        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            setIsCalculating(true);
            setTimeout(() => {
                setIsCalculating(false);
                setShowResult(true);
            }, 1500); // 1.5s Fake Calculation Delay
        }
    };

    const resetQuiz = () => {
        setStep(0);
        setAnswers([]);
        setShowResult(false);
        setIsCalculating(false);
    };

    const getRecommendation = () => {
        const type = answers[0]?.type;
        const mood = answers[1]?.type;

        if (mood === 'high') return {
            title: "The Adrenaline Junkie Pack",
            desc: "For the brave hearts! Includes Long Paragliding Flight + Bungee Jumping.",
            price: "₹4,500",
            icon: <Zap size={48} className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />,
            bg: "from-orange-600 to-red-900"
        };
        if (type === 'couple') return {
            title: "Romantic Sunset Escape",
            desc: "A magical sunset flight for two + Candlelight Dinner at Landing Site.",
            price: "₹5,500",
            icon: <Heart size={48} className="text-pink-400 drop-shadow-[0_0_15px_rgba(244,114,182,0.5)]" />,
            bg: "from-pink-800 to-purple-900"
        };
        return {
            title: "The Chill Traveler",
            desc: "15-min Soothing Flight + Monastery Tour + Cafe Hopping Guide.",
            price: "₹3,000",
            icon: <Coffee size={48} className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />,
            bg: "from-teal-800 to-emerald-900"
        };
    };

    return (
        <section className="py-28 bg-[#0B1120] relative overflow-hidden font-sans">

            {/* Background Grid & Glows */}
            <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sky-600/30 rounded-full blur-[120px]" />

            <div className="max-w-4xl mx-auto px-4 relative z-10">

                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-block py-1 px-4 rounded-full bg-white/10 border border-white/20 text-sky-400 text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-md"
                    >
                        AI Trip Planner
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-white"
                    >
                        Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-400 to-pink-400 animate-gradient-x">Perfect Vibe</span>
                    </motion.h2>
                </div>

                <div className="relative min-h-[500px]">
                    <AnimatePresence mode='wait'>

                        {/* 1. QUIZ QUESTIONS */}
                        {!showResult && !isCalculating && (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                className="w-full max-w-2xl mx-auto"
                            >
                                {/* Progress Bar */}
                                <div className="w-full h-2 bg-white/10 rounded-full mb-10 overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-sky-500 to-purple-500"
                                        initial={{ width: `${(step / questions.length) * 100}%` }}
                                        animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>

                                <h3 className="text-2xl md:text-4xl font-bold text-white text-center mb-12 leading-tight">
                                    {questions[step].question}
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {questions[step].options.map((option, idx) => (
                                        <motion.button
                                            key={idx}
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleAnswer(option)}
                                            className="group relative overflow-hidden p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-left transition-all duration-300"
                                        >
                                            {/* Hover Gradient Background */}
                                            <div className={`absolute inset-0 bg-gradient-to-r ${option.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

                                            <div className="relative z-10 flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${option.color} flex items-center justify-center text-white shadow-lg text-xl`}>
                                                    {option.icon}
                                                </div>
                                                <span className="text-lg font-bold text-slate-200 group-hover:text-white">{option.text}</span>
                                            </div>

                                            {/* Glow Effect */}
                                            <div className={`absolute -right-4 -bottom-4 w-20 h-20 bg-gradient-to-br ${option.color} rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* 2. CALCULATING STATE (Loading) */}
                        {isCalculating && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center text-center"
                            >
                                <div className="w-20 h-20 border-4 border-white/10 border-t-sky-500 rounded-full animate-spin mb-6" />
                                <h3 className="text-2xl font-bold text-white mb-2">Analyzing your vibe...</h3>
                                <p className="text-slate-400">Finding the best match for you</p>
                            </motion.div>
                        )}

                        {/* 3. RESULT CARD */}
                        {showResult && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="relative w-full max-w-lg mx-auto"
                            >
                                {/* Glowing Background Card */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${getRecommendation().bg} opacity-50 blur-3xl rounded-full`} />

                                <div className="relative bg-[#1e293b]/80 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] text-center shadow-2xl">

                                    {/* Icon */}
                                    <div className="w-24 h-24 bg-[#0f172a] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-white/5">
                                        {getRecommendation().icon}
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <p className="text-sky-400 font-bold uppercase tracking-widest text-xs mb-3">Best Match Found</p>
                                        <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                                            {getRecommendation().title}
                                        </h3>
                                        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                                            {getRecommendation().desc}
                                        </p>

                                        <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl mb-8">
                                            <span className="text-slate-400 text-sm font-medium">Starting at</span>
                                            <span className="text-2xl font-bold text-white">{getRecommendation().price}</span>
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            <button
                                                onClick={onBookClick}
                                                className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 transition-all transform hover:scale-[1.02]"
                                            >
                                                Book This Package <ArrowRight size={20} />
                                            </button>
                                            <button
                                                onClick={resetQuiz}
                                                className="text-slate-500 hover:text-white font-medium py-3 text-sm flex items-center justify-center gap-2 transition-colors"
                                            >
                                                <RefreshCcw size={16} /> Retake Quiz
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
};

export default TripQuiz;
