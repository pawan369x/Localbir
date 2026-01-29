import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import WhyChooseUs from '../components/WhyChooseUs';
import JourneyRoadmap from '../components/JourneyRoadmap';
import FAQ from '../components/FAQ';

const AboutPage = () => {
    const { onBookClick } = useOutletContext();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-20">
            <WhyChooseUs />
            <JourneyRoadmap onBookClick={onBookClick} />
            <FAQ />
        </div>
    );
};

export default AboutPage;
