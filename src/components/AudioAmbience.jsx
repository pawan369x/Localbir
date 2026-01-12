import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const AudioAmbience = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        // Initialize audio instance once
        audioRef.current = new Audio('/ambience.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.4;

        return () => {
            // Cleanup on unmount
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const toggleAudio = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    console.error("Audio play failed:", e);
                    // Reset state if play fails (e.g. browser policy)
                    setIsPlaying(false);
                });
            }
        }
        setIsPlaying(!isPlaying);
    };

    return (
        // CHANGE: 'absolute' -> 'fixed' (Taaki scroll karne par bhi dikhe)
        <div className="fixed bottom-6 right-6 z-50">
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleAudio}
                className={`p-4 rounded-full shadow-2xl backdrop-blur-md border border-white/20 transition-all ${isPlaying
                    ? 'bg-sky-500 text-white shadow-sky-500/50'
                    : 'bg-white/10 text-slate-800 border-slate-200 hover:bg-white hover:text-slate-900' // Text color dark kiya for visibility
                    }`}
            >
                {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </motion.button>

            {/* Tooltip Hint */}
            {!isPlaying && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2 }}
                    className="absolute right-16 top-2 w-40 bg-white p-2 rounded-xl shadow-xl text-xs font-bold text-slate-600 text-center"
                >
                    🔊 Feel the Vibe?
                    <div className="absolute -right-1 top-3 w-3 h-3 bg-white transform rotate-45"></div>
                </motion.div>
            )}
        </div>
    );
};

export default AudioAmbience;