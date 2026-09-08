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
    <section className="py-10 sm:py-14 bg-[#FCFCFC] relative">
      <Container>
        <SectionHeading
          eyebrow="TESTIMONIALS"
          title="What Our Clients Say"
          actionText="View More Reviews"
          onActionClick={onOpenBooking}
        />

        {/* 3 quotes row — matches design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {TESTIMONIALS_DATA.map((item) => (
            <TestimonialCard key={item.id} testimonial={item} />
          ))}
        </div>
      </Container>
    </section>
  );
};
