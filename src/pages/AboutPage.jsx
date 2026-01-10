import React, { useEffect } from 'react';
import WhyChooseUs from '../components/WhyChooseUs';
import JourneyRoadmap from '../components/JourneyRoadmap';
import FAQ from '../components/FAQ';

const AboutPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-20">
            <WhyChooseUs />
            <JourneyRoadmap />
            <FAQ />
        </div>
    );
};

export default AboutPage;
