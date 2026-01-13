import React, { useEffect } from 'react';
import LocalGuide from '../components/LocalGuide';

import { useOutletContext } from 'react-router-dom';

const GuidePage = () => {
    const { onBookClick } = useOutletContext();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-20">
            <LocalGuide onBookClick={onBookClick} />
        </div>
    );
};

export default GuidePage;
