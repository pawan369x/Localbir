import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const slides = [
    {
        id: 1,
        // Yahan humne path change kar diya hai. 
        // Public folder ki file ko access karne ke liye seedha "/" use karte hain.
        video: "/video.mp4",
        title: "Don't Just Visit Bir.",
        subtitle: "Live It Like a Local.",
        description: "Local Guides. Secret Spots. Zero Commission Agents.",
        highlightColor: "text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600",
        buttonColor: "bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)]",
        overlay: "bg-black/40"
    }
    // Future slides can be added here
];

const BannerCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        if (slides.length > 1) {
            const timer = setInterval(nextSlide, 5000);
            return () => clearInterval(timer);
        }
    }, []);

    const slide = slides[currentSlide];

    const navigate = useNavigate();

    return (
        <div className="relative h-screen w-full overflow-hidden flex items-center justify-center font-sans">
            {/* Background Video/Image */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={slide.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 w-full h-full"
                >
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute w-full h-full object-cover z-0"
                    >
                        <source src={slide.video} type="video/mp4" />
                    </video>

                    {/* Dark Overlay */}
                    <div className={`absolute inset-0 ${slide.overlay} z-10`} />

                    {/* Content */}
                    <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto mt-16">
                        <motion.span
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm font-bold tracking-widest uppercase mb-4"
                        >
                            Welcome to Bir Billing
                        </motion.span>

                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight tracking-tight"
                        >
                            {slide.title}
                            <br />
                            <span className={slide.highlightColor}>{slide.subtitle}</span>
                        </motion.h1>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="text-lg md:text-2xl text-slate-200 mb-10 max-w-2xl font-medium"
                        >
                            {slide.description}
                        </motion.p>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.1 }}
                            onClick={() => navigate('/plan-trip')}
                            className={`${slide.buttonColor} text-white font-bold py-4 px-10 rounded-full text-lg flex items-center gap-2 transition-all hover:brightness-110`}
                        >
                            Plan My Trip <ChevronRight size={20} />
                        </motion.button>
                    </div>
                </motion.div>
            </AnimatePresence>


            {/* Navigation Controls (Only show if multiple slides) */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all"
                    >
                        <ChevronLeft size={40} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all"
                    >
                        <ChevronRight size={40} />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default BannerCarousel;