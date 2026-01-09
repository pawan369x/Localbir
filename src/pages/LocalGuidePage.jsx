import React, { useEffect } from 'react';
import LocalGuide from '../components/LocalGuide';

const LocalGuidePage = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-20"> {/* Add padding for fixed navbar */}
            <LocalGuide />
        </div>
    );
};

export default LocalGuidePage;
