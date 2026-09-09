import React, { useState, useEffect } from 'react';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { BookingModal } from '@/components/shared/BookingModal';
import { ContactHero } from '../components/ContactHero';
import { ContactInfoStrip } from '../components/ContactInfoStrip';
import { ContactLocationAndForm } from '../components/ContactLocationAndForm';
import { ExperienceDifferenceSection } from '../components/ExperienceDifferenceSection';

export const ContactPage: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    // Scroll to top on page mount
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Contact Us | VV Studio - Luxury Salon & Spa in JP Nagar, Bangalore';
  }, []);

  return (
    <div className="min-h-screen bg-[#FCFCFC] text-[#40363F] flex flex-col antialiased selection:bg-[#D91A8A] selection:text-white">
      {/* Top Header */}
      <Header onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <ContactHero />

        {/* 5 Cards Info Strip */}
        <ContactInfoStrip />

        {/* Location Map & Message Form */}
        <ContactLocationAndForm />

        {/* Studio Ambience & Experience Highlights */}
        <ExperienceDifferenceSection onOpenBooking={() => setIsBookingOpen(true)} />
      </main>

      {/* Signature Dark Plum Footer matching design */}
      <Footer variant="dark" showTaglineCallout={true} />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};
