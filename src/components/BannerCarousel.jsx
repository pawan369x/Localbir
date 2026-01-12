import React from 'react';
import AudioAmbience from './AudioAmbience';

const BannerCarousel = () => {
    return (
        <div className="relative w-full h-[650px] overflow-hidden bg-slate-900">
            {/* Simple Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
            >
                <source src="/video.mp4" type="video/mp4" />
            </video>

            {/* Audio Control */}
            <AudioAmbience />

            {/* Optional Overlay for better integration if needed, but keeping it clean as requested */}
            {/* <div className="absolute inset-0 bg-black/20" /> */}
        </div>
    );
};

export default BannerCarousel;