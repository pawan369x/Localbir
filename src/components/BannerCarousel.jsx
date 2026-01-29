import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        id: 1,
        image: "/banner-paragliding.jpg",
        subtitle: "Welcome to Bir Billing",
        title: "Touch the Sky at 8,000ft",
        desc: "Experience the thrill of the World's 2nd Highest Paragliding Site."
    },
    {
        id: 2,
        image: "/banner-hills.jpg",
        subtitle: "Peace & Bonfires",
        title: "Sleep Under a Billion Stars",
        desc: "Premium camping experiences in the heart of the Himalayas."
    },
    {
        id: 3,
        image: "/hero-mist.jpg",
        subtitle: "Hidden Gems",
        title: "Explore the Unseen Trails",
        desc: "Guided treks to secret waterfalls and sunset points."
    }
];

const BannerCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-Slide Logic (Har 5 second mein change hoga)
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    return (
        <div className="relative w-full h-[650px] overflow-hidden bg-slate-900">

            <AnimatePresence mode='wait'>
                {slides.map((slide, index) => (
                    index === currentIndex && (
                        <motion.div
                            key={slide.id}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.7 }}
                            className="absolute inset-0 w-full h-full"
                        >
                            {/* Background Image */}
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />

                            {/* Black Overlay (Gradient for text readability) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                            {/* Text Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                                <motion.span
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="inline-block py-1 px-3 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs md:text-sm font-bold uppercase tracking-widest mb-4 backdrop-blur-sm"
                                >
                                    {slide.subtitle}
                                </motion.span>

                                <motion.h1
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 drop-shadow-lg leading-tight"
                                >
                                    {slide.title}
                                </motion.h1>

                                <motion.p
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="text-slate-200 text-lg md:text-xl max-w-2xl font-light"
                                >
                                    {slide.desc}
                                </motion.p>
                            </div>
                        </motion.div>
                    )
                ))}
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/20 hover:bg-black/50 text-white rounded-full backdrop-blur-sm transition-all border border-white/10 z-10"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/20 hover:bg-black/50 text-white rounded-full backdrop-blur-sm transition-all border border-white/10 z-10"
            >
                <ChevronRight size={24} />
            </button>

            {/* Dots Navigation (Bottom) */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                            ? "bg-sky-500 w-8"
                            : "bg-white/50 hover:bg-white"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default BannerCarousel;