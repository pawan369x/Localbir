import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, User, MessageCircle, ChevronRight } from 'lucide-react';

const DirectDialer = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Yahan apne numbers daal de bhai
    const contacts = [
        {
            name: "Abhi (Owner)",
            role: "Direct Owner",
            number: "+916230044384", // <--- Apna Number Laga
            type: "call"
        },
        {
            name: "Booking Desk",
            role: "Enquiry",
            number: "+916230044384", // <--- Dusra Number Laga
            type: "call"
        },
        {
            name: "WhatsApp Chat",
            role: "Instant Reply",
            number: "+916230044384",
            type: "whatsapp"
        }
    ];

    const handleAction = (contact) => {
        if (contact.type === 'whatsapp') {
            window.open(`https://wa.me/${contact.number}?text=Hi, I need info regarding Bir Billing trip.`, '_blank');
        } else {
            window.location.href = `tel:${contact.number}`;
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">

            {/* DROP DOWN MENU (List) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 min-w-[220px] mb-2 overflow-hidden"
                    >
                        <div className="bg-slate-100 px-4 py-2 rounded-t-xl mb-1">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Contact Us</p>
                        </div>

                        <div className="flex flex-col gap-1">
                            {contacts.map((contact, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAction(contact)}
                                    className="flex items-center gap-3 p-3 hover:bg-green-50 rounded-xl transition-colors text-left w-full group"
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md ${contact.type === 'whatsapp' ? 'bg-[#25D366]' : 'bg-green-500'}`}>
                                        {contact.type === 'whatsapp' ? <MessageCircle size={18} /> : <Phone size={18} />}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-slate-800 font-bold text-sm group-hover:text-green-600 transition-colors">
                                            {contact.name}
                                        </h4>
                                        <p className="text-slate-400 text-[10px] font-medium">{contact.role}</p>
                                    </div>
                                    <ChevronRight size={14} className="text-slate-300 group-hover:text-green-500" />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MAIN FLOATING BUTTON */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`relative w-14 h-14 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)] flex items-center justify-center text-white transition-all duration-300 ${isOpen ? 'bg-slate-800 rotate-90' : 'bg-gradient-to-tr from-green-500 to-emerald-600 animate-bounce-subtle'}`}
            >
                {/* Ping Animation Ring */}
                {!isOpen && (
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                )}

                {isOpen ? <X size={24} /> : <Phone size={24} fill="currentColor" />}
            </motion.button>

        </div>
    );
};

export default DirectDialer;
