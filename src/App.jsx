import React, { useState, Suspense, lazy } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import DirectDialer from './components/DirectDialer';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// --- Lazy Load Pages & Components ---
const Home = lazy(() => import('./pages/Home'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const PackagesPage = lazy(() => import('./pages/PackagesPage'));
const TripPlannerPage = lazy(() => import('./pages/TripPlannerPage'));
const GuidePage = lazy(() => import('./pages/GuidePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const StaysPage = lazy(() => import('./pages/StaysPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const BookingModal = lazy(() => import('./components/BookingModal'));

// Loading Fallback
const PageLoader = () => (
  <div className="flex h-[70vh] w-full items-center justify-center">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-green-500"></div>
  </div>
);

const Layout = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState(null);

  const handleBookClick = (data = null) => {
    setBookingInitialData(data);
    setIsBookingOpen(true);
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-sky-200 selection:text-sky-900 text-gray-900 flex flex-col">
      {/* Header Overlay */}
      <Navbar onBookClick={() => handleBookClick()} />

      {/* Main Content Area */}
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Outlet context={{ onBookClick: handleBookClick }} />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer onBookClick={() => handleBookClick()} />

      {/* Booking Modal */}
      <Suspense fallback={null}>
        {isBookingOpen && (
          <BookingModal
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            initialData={bookingInitialData}
          />
        )}
      </Suspense>

      {/* Direct One Tap Dialer */}
      <DirectDialer />
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="packages" element={<PackagesPage />} />
        <Route path="adventures" element={<PackagesPage />} /> {/* Alias */}
        <Route path="plan-trip" element={<TripPlannerPage />} />
        <Route path="stays" element={<StaysPage />} />

        <Route path="guide" element={<GuidePage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="about" element={<AboutPage />} />
        {/* Fallback route */}
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
