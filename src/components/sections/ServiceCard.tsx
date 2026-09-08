import React from 'react';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import type { ServiceItem } from '@/data/salonData';

interface ServiceCardProps {
  service: ServiceItem;
  onSelect: (service: ServiceItem) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
  return (
    <article
      onClick={() => onSelect(service)}
      className="group bg-white rounded-2xl border border-[#E8DCE5] overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Card Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF7F9]">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />

          {/* Category Pill Tag */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#A80086] text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-xs">
            {service.category}
          </div>

          {/* Starting Price Pill */}
          {service.startingPrice && (
            <div className="absolute bottom-3 right-3 bg-[#3D003D]/90 backdrop-blur-xs text-[#F8C1DE] text-xs font-bold px-2.5 py-1 rounded-full">
              From {service.startingPrice}
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-1.5 text-xs text-[#D91A8A] font-medium mb-1.5">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span className="italic">{service.tagline}</span>
          </div>

          <h3 className="text-xl font-display font-medium text-[#2C182A] group-hover:text-[#85006F] transition-colors mb-2">
            {service.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#766A73] leading-relaxed line-clamp-3 mb-4">
            {service.description}
          </p>
        </div>
      </div>

      {/* Footer / Quick Booking Trigger */}
      <div className="px-5 sm:px-6 pb-5 pt-0 flex items-center justify-between border-t border-[#E8DCE5]/60 mt-auto pt-3">
        {service.duration && (
          <span className="inline-flex items-center gap-1 text-[11px] text-[#766A73]">
            <Clock className="w-3 h-3 text-[#A80086]" />
            {service.duration}
          </span>
        )}

        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#D91A8A] group-hover:text-[#A80086] group-hover:translate-x-0.5 transition-all">
          Book Service <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </article>
  );
};
