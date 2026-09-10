import React from 'react';
import { Star } from 'lucide-react';
import type { TestimonialItem } from '@/data/salonData';

interface TestimonialCardProps {
  testimonial: TestimonialItem;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="flex flex-col h-full bg-white rounded-[14px] border border-[#F1E4EE] shadow-[0_2px_14px_rgba(90,20,80,0.08)] hover:shadow-[0_10px_28px_rgba(90,20,80,0.14)] hover:-translate-y-1 transition-all duration-300 p-5 sm:p-6">
      {/* Large serif quote mark — matches design */}
      <span
        aria-hidden="true"
        className="font-display text-[44px] leading-[0.8] text-[#D91A8A] mb-2 select-none"
      >
        &ldquo;
      </span>

      {/* Quote text */}
      <p className="text-[13px] sm:text-sm text-[#4A3A48] leading-relaxed italic mb-4">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Customer + stars */}
      <div className="mt-auto pt-4 border-t border-[#F5EAF2] flex items-center gap-2.5">
        <img
          src={testimonial.avatar}
          alt={`VV Studio client after ${testimonial.treatment}`}
          title="VV Studio client testimonial photo"
          width={72}
          height={72}
          className="w-9 h-9 rounded-full object-cover"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
        <div className="min-w-0">
          <h4 className="text-[13px] font-bold text-[#2D0A2E] leading-tight truncate">
            {testimonial.name}
          </h4>
          <div className="flex items-center gap-0.5 mt-0.5">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-[#F5A623] text-[#F5A623]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
