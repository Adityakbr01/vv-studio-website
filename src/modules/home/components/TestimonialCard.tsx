import React from 'react';
import { Star, Quote } from 'lucide-react';
import type { TestimonialItem } from '@/data/salonData';

interface TestimonialCardProps {
  testimonial: TestimonialItem;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E8DCE5] p-6 sm:p-7 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between h-full relative group">
      <div>
        {/* Pink Quote Mark Icon from Screenshot */}
        <div className="w-10 h-10 rounded-full bg-[#FDEAF4] flex items-center justify-center text-[#D91A8A] mb-4 group-hover:scale-105 transition-transform">
          <Quote className="w-5 h-5 fill-[#D91A8A]" />
        </div>

        {/* Quote Content */}
        <p className="text-sm sm:text-base text-[#40363F] font-light leading-relaxed italic mb-6">
          "{testimonial.quote}"
        </p>
      </div>

      {/* Customer Info & 5 Gold Stars */}
      <div className="pt-4 border-t border-[#E8DCE5]/70 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-10 h-10 rounded-full object-cover border border-[#F8C1DE]"
          />
          <div>
            <h4 className="text-sm font-semibold text-[#2C182A]">
              {testimonial.name}
            </h4>
            <p className="text-[11px] text-[#766A73]">
              {testimonial.treatment}
            </p>
          </div>
        </div>

        {/* 5 Rating Stars */}
        <div className="flex items-center gap-0.5 text-[#F59E0B]">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
          ))}
        </div>
      </div>
    </div>
  );
};
