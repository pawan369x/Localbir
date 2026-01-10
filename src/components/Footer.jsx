import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Youtube, Twitter, MapPin, Phone, Mail, ArrowUp, Send } from 'lucide-react';

const Footer = ({ onBookClick }) => {

    // Scroll to Top Function
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        // CHANGE 1: Added 'mt-32' here. Isse footer neeche khisak jayega aur floating card ko jagah milegi.
        <footer className="bg-[#0b0f19] relative pt-48 pb-10 font-sans mt-32 border-t border-slate-800/50">

            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            {/* 1. ADVANCED FLOATING CTA CARD (Overlapping Fixed) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 -translate-y-1/2 z-30">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/20"
                >
                    {/* Animated Colorful Background - Updated to Sky Blue like Nav Button */}
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-600" />

                    {/* Glossy Overlay */}
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />

                    {/* Decorative Circle */}
                    <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 p-8 md:p-30 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight drop-shadow-md">
                                Ready to touch the sky? ☁️
                            </h2>
                            <p className="text-sky-100 text-lg opacity-95 font-medium">
                                Slots are filling fast for this weekend.
                            </p>
                        </div>

                        <motion.button
                            onClick={onBookClick}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-blue-700 hover:text-blue-800 hover:bg-sky-50 py-4 px-10 rounded-full font-bold text-lg shadow-xl shadow-blue-900/40 flex items-center gap-2 group transition-all"
                        >
                            Book Your Slot <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* 2. MAIN FOOTER CONTENT */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20 border-b border-slate-800/50 pb-16">

                    {/* BRAND SECTION (Col Span 5) */}
                    <div className="lg:col-span-5 space-y-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-3xl font-black text-white tracking-tighter">
                                    Local<span className="text-sky-500">Bir.</span>
                                </span>
                                {/* Live Status Badge */}
                                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    Status: Flying ON
                                </span>
                            </div>
                            <p className="text-slate-400 leading-relaxed max-w-sm">
                                Your trusted local guide for Paragliding, Camping, and hidden adventures in Bir Billing. We make sure you fly safe and land happy.
                            </p>
                        </div>

                        {/* Newsletter Input */}
                        <div className="max-w-sm">
                            <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wide">Join our Community</h4>
                            <div className="relative group">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-slate-900/50 border border-slate-700 text-white pl-4 pr-12 py-3.5 rounded-xl focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600"
                                />
                                <button className="absolute right-2 top-2 p-1.5 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors shadow-lg">
                                    <ArrowUp size={18} className="rotate-45" />
                                </button>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            <SocialIcon icon={<Instagram size={20} />} href="#" color="hover:bg-pink-600 hover:shadow-[0_0_20px_rgba(219,39,119,0.5)]" />
                            <SocialIcon icon={<Youtube size={20} />} href="#" color="hover:bg-red-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]" />
                            <SocialIcon icon={<Facebook size={20} />} href="#" color="hover:bg-blue-600 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]" />
                            <SocialIcon icon={<Twitter size={20} />} href="#" color="hover:bg-sky-500 hover:shadow-[0_0_20px_rgba(14,165,233,0.5)]" />
                        </div>
                    </div>

                    {/* LINKS SECTION (Col Span 7) */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {/* Quick Links */}
                        <div>
                            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                                Explore <span className="h-1 w-1 rounded-full bg-sky-500"></span>
                            </h3>
                            <ul className="space-y-4">
                                <FooterLink text="Home" to="/" />
                                <FooterLink text="Paragliding" to="/adventures" />
                                <FooterLink text="Camping" to="/adventures" />
                                <FooterLink text="About Us" to="/about" />
                                <FooterLink text="Plan Trip" to="/plan-trip" />
                            </ul>
                        </div>

                        {/* Activities */}
                        <div>
                            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                                Activities <span className="h-1 w-1 rounded-full bg-orange-500"></span>
                            </h3>
                            <ul className="space-y-4">
                                <FooterLink text="Bungee Jumping" to="/adventures" />
                                <FooterLink text="Sky Cycling" to="/adventures" />
                                <FooterLink text="Waterfall Trek" to="/adventures" />
                                <FooterLink text="Rajgundha Trek" to="/adventures" />
                                <FooterLink text="Monastery" to="/guide" />
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                                Contact <span className="h-1 w-1 rounded-full bg-emerald-500"></span>
                            </h3>
                            <ul className="space-y-6">
                                <ContactItem
                                    icon={<MapPin size={18} />}
                                    text="Tibetan Colony, Bir, Himachal Pradesh, 176077"
                                />
                                <ContactItem
                                    icon={<Phone size={18} />}
                                    text="+91 62300 44384"
                                    href="tel:+916230044384"
                                />
                                <ContactItem
                                    icon={<Mail size={18} />}
                                    text="hello@localbir.com"
                                    href="mailto:hello@localbir.com"
                                />
                            </ul>
                        </div>
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm font-medium">
                    <p>© 2024 Local Bir. Created by <span className="text-sky-500 font-bold">AtlasMedia</span>.</p>

                    <div className="flex items-center gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>

                        {/* Scroll to Top Button */}
                        <motion.button
                            whileHover={{ y: -3 }}
                            onClick={scrollToTop}
                            className="p-3 bg-slate-800 text-white rounded-xl hover:bg-sky-500 transition-all shadow-lg border border-slate-700 hover:border-sky-400"
                        >
                            <ArrowUp size={20} />
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* GIANT CREATIVE TEXT BACKGROUND */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full overflow-hidden pointer-events-none opacity-[0.02]">
                <h1 className="text-[18vw] font-black text-white leading-none whitespace-nowrap text-center select-none">
                    BIR BILLING
                </h1>
            </div>
        </footer>
    );
};

// --- Helper Components ---

const SocialIcon = ({ icon, href, color }) => (
    <a
        href={href}
        className={`w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center transition-all duration-300 ${color} hover:text-white hover:border-transparent`}
    >
        {icon}
    </a>
);

const FooterLink = ({ text, to = "#" }) => (
    <li>
        <Link to={to} className="text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-2 group text-[15px]">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-sky-500 transition-colors"></span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">{text}</span>
        </Link>
    </li>
);

const ContactItem = ({ icon, text, href }) => (
    <li className="flex items-start gap-4 text-slate-400 group">
        <div className="mt-1 p-2 rounded-lg bg-slate-900 border border-slate-800 text-sky-500 group-hover:border-sky-500/50 group-hover:bg-sky-500/10 transition-colors">
            {icon}
        </div>
        {href ? (
            <a href={href} className="hover:text-white transition-colors leading-relaxed pt-1">
                {text}
            </a>
        ) : (
            <span className="leading-relaxed pt-1">{text}</span>
        )}
    </li>
);

export default Footer;