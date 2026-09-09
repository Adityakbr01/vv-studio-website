import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/ui/Container';
import { Carousel, CarouselControls, type CarouselHandle, type CarouselState } from '@/components/ui/Carousel';
import { ServiceCard } from './ServiceCard';
import { SERVICES_DATA, type ServiceItem } from '@/data/salonData';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
}) => {
  const navigate = useNavigate();
  const carouselRef = useRef<CarouselHandle>(null);
  const [carouselState, setCarouselState] = useState<CarouselState>({
    canPrev: false,
    canNext: false,
    page: 0,
    pages: 1,
  });

  return (
    <section id="services" className="py-10 sm:py-14 bg-[#FCFCFC] relative">
      <Container>
        <SectionHeading
          eyebrow="OUR SERVICES"
          title="Beauty Services for Every You"
          subtitle="From everyday care to special occasions, we offer a complete range of beauty treatments."
          actionText="View All Services"
          onActionClick={() => navigate('/services')}
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

        {/* Services carousel: 2 / 3 / 6 per view — matches design */}
        <Carousel
          ref={carouselRef}
          ariaLabel="Beauty services carousel"
          autoplay
          autoplayDelay={4000}
          onStateChange={setCarouselState}
          trackClassName="gap-3 sm:gap-4 pb-1"
          slideClassName="basis-[calc(50%-6px)] sm:basis-[calc(33.3333%-10.6667px)] lg:basis-[calc(16.6667%-13.3333px)]"
        >
          {SERVICES_DATA.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelect={onSelectService}
            />
          ))}
        </Carousel>
      </Container>
    </section>
  );
};
