import React, { useEffect } from 'react';
import BannerCarousel from '../components/BannerCarousel';
import Packages from '../components/Packages';
import TripCalculator from '../components/TripCalculator';
import WhyChooseUs from '../components/WhyChooseUs';
import JourneyRoadmap from '../components/JourneyRoadmap';
import FAQ from '../components/FAQ';
import { useOutletContext } from 'react-router-dom';

const Home = () => {
    const { onBookClick } = useOutletContext(); // Access context provided by Layout

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <BannerCarousel />
            <div id="paragliding">
                <Packages onBookClick={onBookClick} />
            </div>
            <TripCalculator onBookClick={onBookClick} />
            <WhyChooseUs />
            <JourneyRoadmap />
            <FAQ />
        </>
    );
};

export default Home;
