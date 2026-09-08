import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/ui/Container';
import { GALLERY_DATA } from '@/data/salonData';

interface GallerySectionProps {
  onOpenBooking: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="gallery" className="py-16 sm:py-20 lg:py-24 bg-[#FAF7F9] relative">
      <Container>
        <SectionHeading
          eyebrow="OUR GALLERY"
          title="Moments of Beauty"
          subtitle="A glimpse into the artistry, transformations, and rejuvenating experiences crafted at VV Studio."
          actionText="View Full Gallery"
          onActionClick={onOpenBooking}
        />

        {/* 6 Gallery Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
          {GALLERY_DATA.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-card border border-[#E8DCE5] bg-white cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />

              {/* Gradient Backdrop on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B002B]/90 via-[#3D003D]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#F8C1DE] mb-0.5">
                  {item.category}
                </span>
                <h3 className="text-xs sm:text-sm font-display font-medium text-white leading-tight">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
