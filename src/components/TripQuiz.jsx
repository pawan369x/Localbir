import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Heart, Coffee, RefreshCcw, ArrowRight, User, Users, Plane, Star } from 'lucide-react';

const questions = [
    {
        id: 1,
        question: "Who are you traveling with?",
        options: [
            { text: "Solo Traveler", type: "solo", icon: <User size={24} />, color: "bg-blue-100 text-blue-600" },
            { text: "Couple / Partner", type: "couple", icon: <Heart size={24} />, color: "bg-pink-100 text-pink-600" },
            { text: "Squad / Friends", type: "group", icon: <Users size={24} />, color: "bg-orange-100 text-orange-600" },
            { text: "Family", type: "family", icon: "👨‍👩‍👧‍👦", color: "bg-emerald-100 text-emerald-600" }
        ]
    },
    {
        id: 2,
        question: "What's your adrenaline level?",
        options: [
            { text: "Max! I want thrill.", type: "high", icon: <Zap size={24} />, color: "bg-red-100 text-red-600" },
            { text: "Excited but Safe.", type: "med", icon: "😬", color: "bg-indigo-100 text-indigo-600" },
            { text: "Just Chill Vibes.", type: "low", icon: <Coffee size={24} />, color: "bg-teal-100 text-teal-600" }
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
            }, 1200);
        }
    };

    const resetQuiz = () => {
        setStep(0);
        setAnswers([]);
        setShowResult(false);
        setIsCalculating(false);
    };

    // Logic for Suggestion (Without Price)
    const getRecommendation = () => {
        const type = answers[0]?.type;
        const mood = answers[1]?.type;

        if (mood === 'high') return {
            title: "The Sky High Thrill",
            desc: "You are a true adventurer! We recommend the complete Paragliding + GoPro package with high-altitude flying.",
            tags: ["High Altitude", "GoPro Video", "Acrobatics"],
            icon: <Zap size={48} className="text-yellow-500" />,
            gradient: "from-orange-400 to-red-500"
        };
        if (type === 'couple') return {
            title: "Romantic Sunset Flight",
            desc: "Perfect for you two! A smooth sunset flight followed by a cafe hop plan. The most magical experience in Bir.",
            tags: ["Sunset View", "Smooth Flight", "Couple Photos"],
            icon: <Heart size={48} className="text-pink-500" />,
            gradient: "from-pink-400 to-rose-500"
        };
        return {
            title: "The Peaceful Explorer",
            desc: "Soak in the vibes. A relaxing 15-min flight and a guide to the best monasteries and nature trails.",
            tags: ["Relaxed Flying", "Monastery Visit", "Nature Walk"],
            icon: <Coffee size={48} className="text-emerald-500" />,
            gradient: "from-teal-400 to-emerald-500"
        };
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden font-sans">

            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-50 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

            <div className="max-w-3xl mx-auto px-4 relative z-10">

                <div className="text-center mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-block py-1 px-4 rounded-full bg-sky-50 border border-sky-100 text-sky-600 text-xs font-bold tracking-widest uppercase mb-4"
                    >
                        AI Trip Matcher
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-slate-900"
                    >
                        Not Sure What To Book? <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-purple-600">Let Us Help.</span>
                    </motion.h2>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-sky-100 border border-slate-100 p-8 md:p-12 min-h-[450px] flex flex-col justify-center items-center relative overflow-hidden">

                    <AnimatePresence mode='wait'>

                        {/* 1. QUESTIONS */}
                        {!showResult && !isCalculating && (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="w-full max-w-lg"
                            >
                                {/* Progress Bar */}
                                <div className="w-full flex gap-2 mb-8">
                                    {questions.map((_, idx) => (
                                        <div key={idx} className={`h-1.5 rounded-full flex-1 transition-all duration-500 ${idx <= step ? 'bg-sky-500' : 'bg-slate-100'}`} />
                                    ))}
                                </div>

                                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 text-center mb-10">
                                    {questions[step].question}
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {questions[step].options.map((option, idx) => (
                                        <motion.button
                                            key={idx}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleAnswer(option)}
                                            className="flex items-center gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-sky-200 hover:shadow-lg hover:shadow-sky-50 transition-all text-left group"
                                        >
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-transform group-hover:scale-110 ${option.color}`}>
                                                {option.icon}
                                            </div>
                                            <span className="font-bold text-slate-700 group-hover:text-sky-600">{option.text}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* 2. CALCULATING ANIMATION */}
                        {isCalculating && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center"
                            >
                                <div className="relative w-24 h-24 mx-auto mb-6">
                                    <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-sky-500 rounded-full border-t-transparent animate-spin"></div>
                                    <Plane className="absolute inset-0 m-auto text-sky-500 animate-pulse" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800">Curating your experience...</h3>
                            </motion.div>
                        )}

                        {/* 3. RESULT CARD (No Price, Direct Booking) */}
                        {showResult && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center w-full max-w-md"
                            >
                                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl bg-gradient-to-br ${getRecommendation().gradient} text-white`}>
                                    {getRecommendation().icon}
                                </div>

                                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">We Recommend</p>
                                <h3 className="text-3xl font-black text-slate-900 mb-4">
                                    {getRecommendation().title}
                                </h3>
                                <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                                    {getRecommendation().desc}
                                </p>

                                {/* Features Tags instead of Price */}
                                <div className="flex flex-wrap justify-center gap-2 mb-8">
                                    {getRecommendation().tags.map((tag, i) => (
                                        <span key={i} className="px-3 py-1 bg-sky-50 text-sky-600 rounded-full text-xs font-bold border border-sky-100 flex items-center gap-1">
                                            <Star size={10} fill="currentColor" /> {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={onBookClick}
                                        className={`w-full bg-gradient-to-r ${getRecommendation().gradient} text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]`}
                                    >
                                        Plan This Trip Now <ArrowRight size={20} />
                                    </button>

                                    <button
                                        onClick={resetQuiz}
                                        className="text-slate-400 hover:text-slate-600 font-medium py-2 text-sm flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <RefreshCcw size={14} /> Start Over
                                    </button>
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