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
        <div className="relative w-full h-[650px] overflow-hidden bg-transparent">

            <AnimatePresence mode='wait'>
                {slides.map((slide, index) => (
                    index === currentIndex && (
                        <motion.div
                            key={slide.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="absolute inset-0 w-full h-full"
                        >
                            {/* Background Image - Clean No Overlay */}
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />

                            {/* Text Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                                <motion.span
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="inline-block py-1 px-3 rounded-full bg-white/20 border border-white/30 text-white text-xs md:text-sm font-bold uppercase tracking-widest mb-4 backdrop-blur-sm"
                                >
                                    {slide.subtitle}
                                </motion.span>

                                <motion.h1
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 drop-shadow-2xl leading-tight"
                                >
                                    {slide.title}
                                </motion.h1>

                                <motion.p
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="text-white text-lg md:text-xl max-w-2xl font-bold drop-shadow-md"
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
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/30 text-white rounded-full backdrop-blur-md transition-all border border-white/20 z-10"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/30 text-white rounded-full backdrop-blur-md transition-all border border-white/20 z-10"
            >
                <ChevronRight size={24} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                            ? "bg-white w-8"
                            : "bg-white/40 hover:bg-white/70"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default BannerCarousel;