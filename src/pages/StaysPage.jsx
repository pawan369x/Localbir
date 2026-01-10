import React, { useEffect } from 'react';
import Stays from '../components/Stays';
import { useOutletContext } from 'react-router-dom';

const StaysPage = () => {
    const { onBookClick } = useOutletContext();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-20">
            <Stays onBookClick={onBookClick} />
        </div>
    );
};

export default StaysPage;
