import React, { useEffect } from 'react';
import TripCalculator from '../components/TripCalculator';
import TripQuiz from '../components/TripQuiz';
import { useOutletContext } from 'react-router-dom';

const TripPlannerPage = () => {
    const { onBookClick } = useOutletContext();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-20">
            <TripCalculator onBookClick={onBookClick} />
            <TripQuiz onBookClick={onBookClick} />
        </div>
    );
};

export default TripPlannerPage;
