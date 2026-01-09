import React, { useState } from 'react';
import BookingModal from './components/BookingModal';

import Navbar from './components/Navbar';
import './App.css';

// --- Components ---

// --- Main Layout ---
import BannerCarousel from './components/BannerCarousel';
import Packages from './components/Packages';
import TripCalculator from './components/TripCalculator';
import LocalGuide from './components/LocalGuide';
import WhyChooseUs from './components/WhyChooseUs';
import JourneyRoadmap from './components/JourneyRoadmap';

import FAQ from './components/FAQ';
import Footer from './components/Footer';

const App = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-sky-200 selection:text-sky-900 text-gray-900">
      {/* Header Overlay */}
      <Navbar onBookClick={() => setIsBookingOpen(true)} />

      {/* Banner Carousel (Hero Section) */}
      <BannerCarousel />

      {/* Packages Section */}
      <Packages onBookClick={() => setIsBookingOpen(true)} />

      {/* Trip Calculator Section */}
      <TripCalculator onBookClick={() => setIsBookingOpen(true)} />

      {/* Local Guide Section */}
      <LocalGuide />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Journey Roadmap Section */}
      <JourneyRoadmap />



      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <Footer onBookClick={() => setIsBookingOpen(true)} />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default App;
