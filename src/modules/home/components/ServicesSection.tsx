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
    <section id="services" className="py-16 bg-white relative">
      <Container>
        <SectionHeading
          eyebrow="OUR SERVICES"
          title="Beauty Services for Every You"
          subtitle="From everyday care to special occasions, we offer a complete range of beauty treatments."
          actionText="View All Services"
          onActionClick={onOpenBooking}
        />

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
