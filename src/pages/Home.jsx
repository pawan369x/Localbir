import React, { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import BannerCarousel from '../components/BannerCarousel';
import WhyChooseUs from '../components/WhyChooseUs';
import JourneyRoadmap from '../components/JourneyRoadmap';
import FlightDashboard from '../components/FlightDashboard';
import Testimonials from '../components/Testimonials';
import MysteryGift from '../components/MysteryGift';
import FAQ from '../components/FAQ';
import { useOutletContext } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';

const Home = () => {
    const { onBookClick } = useOutletContext();
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
            <SEO
                title="Best Paragliding & Adventure Booking in Bir Billing"
                description="Book the safest Paragliding in Bir Billing starting @₹2500. We offer Bungee Jumping, Sky Cycling, Trekking, and Local Stays with 100% Safety Record."
                keywords="Paragliding in Bir Billing, Bir Billing Paragliding Cost, Bungee Jumping Bir, Sky Cycling Himachal, Bir Billing Hotels, Adventure Sports India"
                url="https://localbir.com/"
            />
            <BannerCarousel />
            <FlightDashboard onBookClick={onBookClick} />
            <WhyChooseUs />
            <JourneyRoadmap />
            <Testimonials />
            <AnimatePresence>
                {showMysteryGift && <MysteryGift onClose={() => setShowMysteryGift(false)} />}
            </AnimatePresence>
            <FAQ />
            {/* You can add teasers for Packages or Guide here if needed */}
        </>
    );
};

export default Home;
