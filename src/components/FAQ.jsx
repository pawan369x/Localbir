import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MessageCircle, PhoneCall, HelpCircle, ChevronRight } from 'lucide-react';

const faqs = [
    {
        id: 1,
        question: "Is Paragliding safe for beginners?",
        answer: "Absolutely! You will be flying with a government-certified pilot who controls everything. You just need to sit back and enjoy the view. We have a 100% safety record."
    },
    {
        id: 2,
        question: "What is the weight limit?",
        answer: "The weight limit is generally between 15kg to 95kg. However, it depends on wind conditions. If you are above 95kg, please inform us in advance so we can arrange a heavy-duty glider."
    },
    {
        id: 3,
        question: "Can I carry my phone/camera?",
        answer: "We recommend not holding phones as they can slip. We provide GoPro recording (hands-free) so you can enjoy the flight. If you drop your phone, it's gone forever in the forest!"
    },
    {
        id: 4,
        question: "How do I reach Bir Billing?",
        answer: "You can take a Volvo bus from Delhi to Bir (overnight journey). Alternatively, fly to Dharamshala (Gaggal Airport) and take a 2-hour taxi to Bir."
    },
    {
        id: 5,
        question: "What if the weather is bad?",
        answer: "Safety is priority #1. If it rains or winds are too strong, we postpone the flight. Your booking remains valid for the next slot, or we provide a full refund."
    }
];

const FAQ = () => {
    const [activeId, setActiveId] = useState(1);

    return (
        <section className="py-24 bg-white relative overflow-hidden">

            {/* Background Decor (Sky Blue Theme) */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-40 left-10 w-96 h-96 bg-sky-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob" />
                <div className="absolute bottom-40 right-10 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* LEFT SIDE: Sticky Support Card (Navbar Theme Match) */}
                    <div className="lg:col-span-4 lg:sticky lg:top-24">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <span className="p-2 bg-sky-100 rounded-lg text-sky-600">
                                    <HelpCircle size={24} />
                                </span>
                                <span className="text-sky-600 font-bold tracking-wider uppercase text-sm">
                                    Support Center
                                </span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                                Have Questions? <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">We have Answers.</span>
                            </h2>

                            {/* PREMIUM CONTACT CARD */}
                            <div className="relative rounded-3xl p-8 shadow-2xl overflow-hidden group">
                                {/* Gradient Background matching Navbar Button */}
                                <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-blue-600" />

                                {/* Decor Circles */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-black opacity-10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold text-white mb-2">Still need help?</h3>
                                    <p className="text-sky-100 mb-8 text-sm">Our local pilots are available 24/7 to guide you.</p>

                                    <div className="space-y-4">
                                        {/* Phone Button (White Glass for contrast) */}
                                        <a href="tel:+916230044384" className="w-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white text-white hover:text-blue-600 py-4 px-6 rounded-xl font-bold flex items-center justify-between group/btn transition-all duration-300">
                                            <div className="flex items-center gap-3">
                                                <PhoneCall size={20} />
                                                <span>+91 62300 44384</span>
                                            </div>
                                            <ChevronRight size={18} className="opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                                        </a>

                                        {/* WhatsApp Button (Original Brand Color - As requested) */}
                                        <a href="https://wa.me/916230044384" target="_blank" rel="noopener noreferrer" className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 px-6 rounded-xl font-bold flex items-center justify-between group/btn transition-all shadow-lg shadow-green-900/20">
                                            <div className="flex items-center gap-3">
                                                <MessageCircle size={20} />
                                                <span>WhatsApp Us</span>
                                            </div>
                                            <ChevronRight size={18} className="opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT SIDE: Accordion Questions */}
                    <div className="lg:col-span-8">
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={faq.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`group border rounded-2xl transition-all duration-300 overflow-hidden ${activeId === faq.id
                                        ? 'border-sky-500 bg-sky-50/30 shadow-lg shadow-sky-100' // Active State: Sky Blue
                                        : 'border-slate-100 bg-white hover:border-sky-200 hover:shadow-md'
                                        }`}
                                >
                                    <button
                                        onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
                                        className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                                    >
                                        <span className={`text-lg font-bold pr-8 transition-colors ${activeId === faq.id ? 'text-sky-600' : 'text-slate-800 group-hover:text-sky-600'
                                            }`}>
                                            {faq.question}
                                        </span>
                                        <span className={`flex-shrink-0 p-2 rounded-full transition-all duration-300 ${activeId === faq.id
                                            ? 'bg-sky-500 text-white rotate-180'
                                            : 'bg-slate-100 text-slate-500 group-hover:bg-sky-100 group-hover:text-sky-500'
                                            }`}>
                                            {activeId === faq.id ? <Minus size={20} /> : <Plus size={20} />}
                                        </span>
                                    </button>

                                    <AnimatePresence>
                                        {activeId === faq.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <div className="px-6 pb-6 pt-0">
                                                    <div className="h-px w-full bg-sky-100 mb-4" /> {/* Sky Divider */}
                                                    <p className="text-slate-600 leading-relaxed text-base">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FAQ;