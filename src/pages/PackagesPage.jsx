import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import Packages from '../components/Packages';
import AdventuresGrid from '../components/AdventuresGrid';
import MoreAdventures from '../components/MoreAdventures';
import MysteryGift from '../components/MysteryGift';
import { useOutletContext } from 'react-router-dom';

const PackagesPage = () => {
    const { onBookClick } = useOutletContext();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-20">
            <SEO
                title="Top Adventure Sports in Bir Billing"
                description="Explore Bungee Jumping, Sky Cycling, Waterfall Treks and Paragliding. Check prices and book instant slots in Bir Billing."
                keywords="Things to do in Bir, Bungee Jumping Price, Sky Cycling Cost, Hidden Waterfalls Bir, Trekking Guides"
                url="https://localbir.com/adventures"
            />
            <Packages onBookClick={onBookClick} />
            <MoreAdventures />
            <AdventuresGrid onBookClick={onBookClick} />
            <MysteryGift />
        </div>
    );
};

export default PackagesPage;
