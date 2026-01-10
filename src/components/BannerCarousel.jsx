import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, MapPin } from 'lucide-react';

const slides = [
    {
        id: 1,
        video: "/video.mp4"
    },
    {
        id: 2,
        video: "/video.mp4"
    },
    {
        id: 3,
        video: "/video.mp4"
    }
];

const BannerCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    // Agar future mein aur slides add karni hon toh ye logic kaam karega
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const slide = slides[currentSlide];

    return (
        <div className="relative h-screen w-full overflow-hidden flex items-center justify-center font-sans">

            <AnimatePresence mode="wait">
                <motion.div
                    key={slide.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 w-full h-full"
                >
                    {/* Background Video with Visual Enhancement */}
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute w-full h-full object-cover z-0 contrast-110 saturate-110"
                    >
                        <source src={`${slide.video}?v=${new Date().getTime()}`} type="video/mp4" />
                    </video>

                    {/* Subtle Overlay to manage Opacity/Cinematic look */}
                    <div className="absolute inset-0 bg-black/20 z-10" />
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows (Hidden if only 1 slide) */}
            {
                slides.length > 1 && (
                    <>
                        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 hover:bg-sky-500 hover:text-white backdrop-blur-sm text-white/70 transition-all">
                            <ChevronLeft size={32} />
                        </button>
                        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 hover:bg-sky-500 hover:text-white backdrop-blur-sm text-white/70 transition-all">
                            <ChevronRight size={32} />
                        </button>
                    </>
                )
            }
        </div >
    );
};

export default BannerCarousel;