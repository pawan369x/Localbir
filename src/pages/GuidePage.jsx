import React, { useEffect } from 'react';
import LocalGuide from '../components/LocalGuide';

const GuidePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-20">
            <LocalGuide />
        </div>
    );
};

export default GuidePage;
