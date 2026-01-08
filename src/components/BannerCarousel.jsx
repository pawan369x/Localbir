import React, { useState, useEffect } from 'react';
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