import React, { useRef, useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/ui/Container';
import { Carousel, CarouselControls, type CarouselHandle, type CarouselState } from '@/components/ui/Carousel';
import { TestimonialCard } from './TestimonialCard';
import { TESTIMONIALS_DATA } from '@/data/salonData';

interface TestimonialsSectionProps {
  onOpenBooking: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onOpenBooking }) => {
  const carouselRef = useRef<CarouselHandle>(null);
  const [carouselState, setCarouselState] = useState<CarouselState>({
    canPrev: false,
    canNext: false,
    page: 0,
    pages: 1,
  });

  return (
    <section className="py-10 sm:py-14 bg-[#FCFCFC] relative">
      <Container>
        <SectionHeading
          eyebrow="TESTIMONIALS"
          title="What Our Clients Say"
          actionText="View More Reviews"
          onActionClick={onOpenBooking}
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

        {/* Testimonials carousel with autoplay: 1 / 2 / 3 per view — matches design */}
        <Carousel
          ref={carouselRef}
          ariaLabel="Client testimonials carousel"
          autoplay
          autoplayDelay={4000}
          onStateChange={setCarouselState}
          trackClassName="gap-6 md:gap-10 pb-1"
          slideClassName="basis-[85%] sm:basis-[calc(50%-12px)] md:basis-[calc(33.3333%-26.6667px)]"
        >
          {TESTIMONIALS_DATA.map((item) => (
            <TestimonialCard key={item.id} testimonial={item} />
          ))}
        </Carousel>
      </Container>
    </section>
  );
};
