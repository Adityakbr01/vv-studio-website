import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/ui/Container';
import { TestimonialCard } from './TestimonialCard';
import { TESTIMONIALS_DATA } from '@/data/salonData';

interface TestimonialsSectionProps {
  onOpenBooking: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative">
      <Container>
        <SectionHeading
          eyebrow="TESTIMONIALS"
          title="What Our Clients Say"
          subtitle="Real experiences from women who trust VV Studio for their everyday pampering and special milestone moments."
          actionText="View More Reviews"
          onActionClick={onOpenBooking}
        />

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS_DATA.map((item) => (
            <TestimonialCard key={item.id} testimonial={item} />
          ))}
        </div>
      </Container>
    </section>
  );
};
