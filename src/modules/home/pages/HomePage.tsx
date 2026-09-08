import React, { useState } from 'react';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { BookingModal } from '@/components/shared/BookingModal';
import { Hero } from '../components/Hero';
import { CategoryNav } from '../components/CategoryNav';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { CTABanner } from '../components/CTABanner';
import { GallerySection } from '../components/GallerySection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { BlogSection } from '../components/BlogSection';
import { SpecialOffersSection } from '../components/SpecialOffersSection';
import type { ServiceItem } from '@/data/salonData';

export const HomePage: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('skin-facials');

  const handleOpenBooking = (service?: ServiceItem) => {
    if (service) {
      setSelectedService(service);
    }
    setIsBookingOpen(true);
  };

  const handleExploreServices = () => {
    const el = document.getElementById('services');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F9] text-[#40363F] flex flex-col antialiased selection:bg-[#D91A8A] selection:text-white">
      {/* Top Header */}
      <Header onOpenBooking={() => handleOpenBooking()} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExploreServices={handleExploreServices}
        />

        {/* Category Ribbon */}
        <CategoryNav
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* About Section */}
        <AboutSection onOpenBooking={() => handleOpenBooking()} />

        {/* Services Section */}
        <ServicesSection
          onSelectService={(service) => handleOpenBooking(service)}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Mid-page Promotional CTA Banner */}
        <CTABanner onOpenBooking={() => handleOpenBooking()} />

        {/* Gallery Section */}
        <GallerySection onOpenBooking={() => handleOpenBooking()} />

        {/* Testimonials Section */}
        <TestimonialsSection onOpenBooking={() => handleOpenBooking()} />

        {/* Blog Section */}
        <BlogSection onOpenBooking={() => handleOpenBooking()} />

        {/* Special Offers Banner */}
        <SpecialOffersSection onOpenBooking={() => handleOpenBooking()} />
      </main>

      {/* Dark Plum Footer */}
      <Footer />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
};
