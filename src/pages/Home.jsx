import React, { useEffect, useState } from 'react';
import BannerCarousel from '../components/BannerCarousel';
import WhyChooseUs from '../components/WhyChooseUs';
import JourneyRoadmap from '../components/JourneyRoadmap';
import MysteryGift from '../components/MysteryGift';
import FAQ from '../components/FAQ';
// import { useOutletContext } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';

const Home = () => {
    // const { onBookClick } = useOutletContext();
    const [showMysteryGift, setShowMysteryGift] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Trigger Mystery Gift Popup after 2 seconds
        const timer = setTimeout(() => {
            setShowMysteryGift(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <BannerCarousel />
            <WhyChooseUs />
            <JourneyRoadmap />
            <AnimatePresence>
                {showMysteryGift && <MysteryGift onClose={() => setShowMysteryGift(false)} />}
            </AnimatePresence>
            <FAQ />
            {/* You can add teasers for Packages or Guide here if needed */}
        </>
    );
};

export default Home;
