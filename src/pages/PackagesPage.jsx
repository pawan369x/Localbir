import React, { useEffect } from 'react';
import Packages from '../components/Packages';
import MoreAdventures from '../components/MoreAdventures';
import { useOutletContext } from 'react-router-dom';

const PackagesPage = () => {
    const { onBookClick } = useOutletContext();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-20">
            <Packages onBookClick={onBookClick} />
            <MoreAdventures />
        </div>
    );
};

export default PackagesPage;
