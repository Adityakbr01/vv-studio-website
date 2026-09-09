import React, { useState, useEffect } from 'react';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { BookingModal } from '@/components/shared/BookingModal';
import { AboutHero } from '../components/AboutHero';
import { AboutStory } from '../components/AboutStory';
import { AboutHighlights } from '../components/AboutHighlights';
import { AboutStatsBand } from '../components/AboutStatsBand';
import { AboutCTA } from '../components/AboutCTA';

export const AboutPage: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    // Scroll to top on page mount
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'About Us | VV Studio - Beauty With A Deeper Purpose, JP Nagar Bangalore';
  }, []);

  const handleOpenBooking = () => setIsBookingOpen(true);

  return (
    <div className="min-h-screen bg-[#FCFCFC] text-[#40363F] flex flex-col antialiased selection:bg-[#D91A8A] selection:text-white">
      {/* Top Header */}
      <Header onOpenBooking={handleOpenBooking} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <AboutHero />

        {/* Story: More Than Just a Salon + image collage */}
        <AboutStory onOpenBooking={handleOpenBooking} />

        {/* 4 Highlights with dividers */}
        <AboutHighlights />

        {/* Stats band */}
        <AboutStatsBand />

        {/* Closing CTA */}
        <AboutCTA onOpenBooking={handleOpenBooking} />
      </main>

      {/* Signature Footer */}
      <Footer />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};
