import React, { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import BookingModal from './components/BookingModal';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// --- Pages ---
import Home from './pages/Home';
import PackagesPage from './pages/PackagesPage';
import TripPlannerPage from './pages/TripPlannerPage';
import GuidePage from './pages/GuidePage';
import AboutPage from './pages/AboutPage'; // Or however you want to expose WhyChooseUs/Roadmap
import StaysPage from './pages/StaysPage';
import BlogPage from './pages/BlogPage';
import BlogPost from './pages/BlogPost';

const Layout = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-sky-200 selection:text-sky-900 text-gray-900 flex flex-col">
      {/* Header Overlay */}
      <Navbar onBookClick={() => setIsBookingOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-grow">
        <Outlet context={{ onBookClick: () => setIsBookingOpen(true) }} />
      </main>

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

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="packages" element={<PackagesPage />} />
        <Route path="adventures" element={<PackagesPage />} /> {/* Alias */}
        <Route path="plan-trip" element={<TripPlannerPage />} />
        <Route path="stays" element={<StaysPage />} />

        <Route path="guide" element={<GuidePage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:id" element={<BlogPost />} />
        <Route path="about" element={<AboutPage />} />
        {/* Fallback route */}
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
