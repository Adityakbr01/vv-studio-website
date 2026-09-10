import React, { useRef, useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/ui/Container';
import { Carousel, CarouselControls, type CarouselHandle, type CarouselState } from '@/components/ui/Carousel';
import { GalleryLightbox } from './GalleryLightbox';
import { GALLERY_DATA, GALLERY_SEO, GALLERY_DIMS } from '@/data/salonData';

export const GallerySection: React.FC = () => {
  const carouselRef = useRef<CarouselHandle>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [carouselState, setCarouselState] = useState<CarouselState>({
    canPrev: false,
    canNext: false,
    page: 0,
    pages: 1,
  });

  return (
    <section id="gallery" className="py-10 sm:py-14 bg-[#FCFCFC] relative">
      <Container>
        <SectionHeading
          eyebrow="OUR GALLERY"
          title="Moments of Beauty"
          actionText="View Full Gallery"
          actionHref="/gallery"
          controls={
            carouselState.pages > 1 ? (
              <CarouselControls
                onPrev={() => carouselRef.current?.scrollPrev()}
                onNext={() => carouselRef.current?.scrollNext()}
                canPrev={carouselState.canPrev}
                canNext={carouselState.canNext}
              />
            ) : undefined
          }
        />

        {/* Gallery carousel: 3 / 6 per view — matches design */}
        <Carousel
          ref={carouselRef}
          ariaLabel="Gallery carousel"
          autoplay
          autoplayDelay={4000}
          onStateChange={setCarouselState}
          trackClassName="gap-2.5 sm:gap-3.5 pb-1"
          slideClassName="basis-[calc(33.3333%-6.6667px)] sm:basis-[calc(33.3333%-9.3333px)] lg:basis-[calc(16.6667%-11.6667px)]"
        >
          {GALLERY_DATA.map((item, i) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(i)}
              className="group relative aspect-[3/4] rounded-[12px] overflow-hidden bg-[#FAF0F6] border border-[#F1E4EE] shadow-[0_2px_14px_rgba(90,20,80,0.08)] hover:shadow-[0_10px_28px_rgba(90,20,80,0.14)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <img
                src={item.image}
                alt={GALLERY_SEO[item.id]?.alt ?? `${item.title} at VV Studio`}
                title={GALLERY_SEO[item.id]?.title ?? `VV Studio ${item.title}`}
                width={GALLERY_DIMS[item.id]?.width}
                height={GALLERY_DIMS[item.id]?.height}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
              />
            </div>
          ))}
        </Carousel>
      </Container>

      {lightboxIndex !== null && (
        <GalleryLightbox
          items={GALLERY_DATA}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
};
