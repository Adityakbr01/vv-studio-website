import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/ui/Container';
import { GALLERY_DATA } from '@/data/salonData';

interface GallerySectionProps {
  onOpenBooking: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="gallery" className="py-10 sm:py-14 bg-white relative">
      <Container>
        <SectionHeading
          eyebrow="OUR GALLERY"
          title="Moments of Beauty"
          actionText="View Full Gallery"
          onActionClick={onOpenBooking}
        />

        {/* 6 rounded thumbnails in one row — matches design */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5">
          {GALLERY_DATA.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[3/4] rounded-[12px] overflow-hidden bg-[#FAF0F6] cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
