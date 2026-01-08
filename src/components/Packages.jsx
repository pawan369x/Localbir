import React from 'react';
import { motion } from 'framer-motion';
import { Tent, Wind, Sparkles, Check, Info, Utensils } from 'lucide-react';

const packages = [
    {
        id: 1,
        title: 'Sky High',
        subtitle: 'Paragliding Only',
        price: '₹3,000',
        duration: '2-3 Hours',
        icon: <Wind className="w-6 h-6 text-indigo-500" />,
        features: [
            '15-20 Mins Flight',
            'Transport to Takeoff Included',
            'Certified Pilot & Gear',
            'GoPro Video (Add-on)',
            'Instant Video Transfer'
        ],
        isPopular: false,
        image: 'https://images.unsplash.com/photo-1495574341103-67c4cb033877?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 2,
        title: 'The Weekend Escape',
        subtitle: 'Complete Package (Customizable)',
        price: 'Best Value', // Display text instead of fixed price
        duration: '1 Night / 2 Days',
        icon: <Sparkles className="w-6 h-6 text-white" />,
        // New Data Structure for Bill Breakdown
        billItems: [
            { name: 'Paragliding (Transport Inc.)', price: '₹3,000' },
            { name: 'Camping (Food Included)', price: '₹2,500' },
            { name: 'Bonfire Night', price: '₹500' },
        ],
        note: 'Dinner & Breakfast menu depends on client preference.',
        isPopular: true, // This enables the "Most Popular" design
        image: 'https://images.unsplash.com/photo-1624300603538-1207400f4116?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 3,
        title: 'Nature Retreat',
        subtitle: 'Camping Only',
        price: '₹2,500',
        duration: 'Overnight Stay',
        icon: <Tent className="w-6 h-6 text-emerald-500" />,
        features: [
            'Luxury Dome Tents',
            'Dinner & Breakfast Included',
            'Bonfire with Music',
            'Nature Walk',
            'Clean Washrooms'
        ],
        isPopular: false,
        image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=800'
    }
];

const Packages = () => {
    return (
        <section id="packages" className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background Blobs (Clean Style) */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" />
                <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-wide mb-4"
                    >
                        Transparent Pricing
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-slate-900 mb-4"
                    >
                        Pay For What You <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Experience</span>
                    </motion.h2>
                    <p className="text-lg text-slate-600">
                        No hidden charges. Clear breakdown for students and groups.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={pkg.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative group rounded-3xl bg-white flex flex-col transition-all duration-300
                                ${pkg.isPopular
                                    ? 'shadow-2xl shadow-sky-200 ring-4 ring-sky-500/20 md:-mt-8 md:mb-8 z-10'
                                    : 'shadow-xl hover:shadow-2xl hover:-translate-y-2 border border-slate-100'
                                }
                            `}
                        >
                            {/* "Most Popular" Badge */}
                            {pkg.isPopular && (
                                <div className="absolute -top-5 inset-x-0 flex justify-center z-20">
                                    <span className="bg-sky-500 text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg flex items-center gap-2">
                                        <Sparkles size={16} /> Most Popular
                                    </span>
                                </div>
                            )}

                            {/* Image Header */}
                            <div className="h-48 overflow-hidden rounded-t-3xl relative">
                                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors z-10" />
                                <img
                                    src={pkg.image}
                                    alt={pkg.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-slate-800">
                                    {pkg.duration}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={`p-2 rounded-lg ${pkg.isPopular ? 'bg-sky-100 text-sky-600' : 'bg-slate-100 text-slate-600'}`}>
                                            {pkg.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800">{pkg.title}</h3>
                                    </div>
                                    <p className="text-slate-500 text-sm font-medium">{pkg.subtitle}</p>
                                </div>

                                {/* Dynamic Content Rendering */}
                                {pkg.isPopular ? (
                                    /* === BILL BREAKDOWN LAYOUT (For Middle Card) === */
                                    <div className="flex-1">
                                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-4">
                                            <div className="space-y-3">
                                                {pkg.billItems.map((item, i) => (
                                                    <div key={i} className="flex justify-between items-center text-sm border-b border-dashed border-slate-200 pb-2 last:border-0 last:pb-0">
                                                        <span className="text-slate-600 font-medium flex items-center gap-2">
                                                            <Check size={14} className="text-sky-500" />
                                                            {item.name}
                                                        </span>
                                                        <span className="font-bold text-slate-800">{item.price}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Client Note */}
                                        <div className="flex items-start gap-2 text-xs text-amber-600 bg-amber-50 p-3 rounded-lg mb-6">
                                            <Utensils size={14} className="mt-0.5 shrink-0" />
                                            {pkg.note}
                                        </div>
                                    </div>
                                ) : (
                                    /* === STANDARD LAYOUT (For Left/Right Cards) === */
                                    <>
                                        <div className="mb-6 flex items-baseline gap-1">
                                            <span className="text-4xl font-black text-slate-900">{pkg.price}</span>
                                            {pkg.price !== 'Best Value' && <span className="text-slate-400 font-medium">/ person</span>}
                                        </div>

                                        <div className="w-full h-px bg-slate-100 mb-6" />

                                        <ul className="space-y-3 mb-8 flex-1">
                                            {pkg.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                                                    <div className="mt-0.5 rounded-full bg-slate-100 p-0.5 text-slate-500">
                                                        <Check size={12} strokeWidth={3} />
                                                    </div>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                                {/* Action Button */}
                                <button
                                    className={`w-full py-4 rounded-xl font-bold transition-all transform active:scale-95
                                        ${pkg.isPopular
                                            ? 'bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-500/30'
                                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                                        }
                                    `}
                                >
                                    {pkg.isPopular ? 'Customize Plan' : 'Book Now'}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Packages;