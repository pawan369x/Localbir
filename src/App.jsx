import React from 'react';

import Navbar from './components/Navbar';
import './App.css';

// --- Components ---

// --- Main Layout ---
import BannerCarousel from './components/BannerCarousel';
import Packages from './components/Packages';
import WhyChooseUs from './components/WhyChooseUs';
import JourneyRoadmap from './components/JourneyRoadmap';

import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-white min-h-screen font-sans selection:bg-sky-200 selection:text-sky-900 text-gray-900">
      {/* Header Overlay */}
      <Navbar />

      {/* Banner Carousel (Hero Section) */}
      <BannerCarousel />

      {/* Packages Section */}
      <Packages />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Journey Roadmap Section */}
      <JourneyRoadmap />



      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
