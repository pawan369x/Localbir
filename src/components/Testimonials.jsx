import React, { useState } from 'react';
import { Star, Quote } from 'lucide-react';

const reviews = [
    { name: "Rahul Sharma", loc: "Delhi", text: "Best experience of my life! The pilot was so professional.", rating: 5, img: "https://randomuser.me/api/portraits/men/1.jpg" },
    { name: "Priya Singh", loc: "Mumbai", text: "I was scared, but the team made me feel safe. Sunset flight is a must!", rating: 5, img: "https://randomuser.me/api/portraits/women/2.jpg" },
    { name: "Amit & Neha", loc: "Bangalore", text: "The GoPro video quality is insane. Worth every penny.", rating: 5, img: "https://randomuser.me/api/portraits/men/3.jpg" },
    { name: "David M.", loc: "UK", text: "Flown in Swiss, but Bir is something else. Great hospitality.", rating: 5, img: "https://randomuser.me/api/portraits/men/4.jpg" },
    { name: "Sanya K.", loc: "Chandigarh", text: "The Jeep ride itself was an adventure. Loved the vibe!", rating: 4, img: "https://randomuser.me/api/portraits/women/5.jpg" },
    { name: "Vikram R.", loc: "Pune", text: "Smooth booking process. No hidden charges as promised.", rating: 5, img: "https://randomuser.me/api/portraits/men/6.jpg" }
];

const Testimonials = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">

            <div className="text-center mb-16 relative z-10 px-4">
                <span className="text-sky-500 font-bold tracking-widest uppercase text-sm">Wall of Love</span>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-2">
                    Stories from the <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-purple-600">Sky.</span>
                </h2>
            </div>

            {/* Gradient Masks for Fade Effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

            <div className="flex flex-col gap-8">
                {/* Row 1: Moves Left (Slower Speed: 60s) */}
                <Marquee direction="left" speed={60}>
                    {reviews.map((review, i) => (
                        <ReviewCard key={i} review={review} />
                    ))}
                </Marquee>

                {/* Row 2: Moves Right (Slower Speed: 60s) */}
                <Marquee direction="right" speed={60}>
                    {reviews.map((review, i) => (
                        <ReviewCard key={i + 10} review={review} />
                    ))}
                </Marquee>
            </div>

        </section>
    );
};

// --- Updated Marquee Component with Pause Logic ---
const Marquee = ({ children, direction, speed }) => {
    const [isPaused, setIsPaused] = useState(false);

    return (
        <div
            className="flex overflow-hidden group"
            onMouseEnter={() => setIsPaused(true)}  // Desktop Hover
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}  // Mobile Tap/Hold
            onTouchEnd={() => setIsPaused(false)}
        >
            <div
                className="flex gap-6 min-w-max"
                style={{
                    animation: `marquee-${direction} ${speed}s linear infinite`,
                    animationPlayState: isPaused ? 'paused' : 'running', // Magic Logic
                }}
            >
                {/* Inline Styles for Keyframes (to make it self-contained) */}
                <style>{`
                    @keyframes marquee-left {
                        0% { transform: translateX(0%); }
                        100% { transform: translateX(-50%); }
                    }
                    @keyframes marquee-right {
                        0% { transform: translateX(-50%); }
                        100% { transform: translateX(0%); }
                    }
                `}</style>

                {children}
                {children} {/* Duplicate for seamless loop */}
            </div>
        </div>
    );
};

// Individual Card
const ReviewCard = ({ review }) => {
    return (
        <div className="w-80 md:w-96 bg-slate-50 p-6 rounded-3xl border border-slate-100 flex-shrink-0 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer select-none">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <img src={review.img} alt={review.name} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                    <div>
                        <h4 className="font-bold text-slate-900 text-sm">{review.name}</h4>
                        <p className="text-xs text-slate-400">{review.loc}</p>
                    </div>
                </div>
                <Quote size={20} className="text-sky-200 fill-sky-100" />
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-4">"{review.text}"</p>

            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={`${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                ))}
            </div>
        </div>
    );
};

export default Testimonials;