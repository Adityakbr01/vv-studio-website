import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/ui/Container';
import { ServiceCard } from './ServiceCard';
import { SERVICES_DATA, type ServiceItem } from '@/data/salonData';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenBooking: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onOpenBooking,
}) => {
  return (
    <section id="services" className="py-10 sm:py-14 bg-[#FCFCFC] relative">
      <Container>
        <SectionHeading
          eyebrow="OUR SERVICES"
          title="Beauty Services for Every You"
          subtitle="From everyday care to special occasions, we offer a complete range of beauty treatments."
          actionText="View All Services"
          onActionClick={onOpenBooking}
        />

        {/* 6 boxed service cards — matches reference */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {SERVICES_DATA.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelect={onSelectService}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
